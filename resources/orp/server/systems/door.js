import * as alt from 'alt';
import SQL from '../../../postgres-wrapper/database.js';
import { Doors } from '../configuration/doors.js';
import { colshapes } from '../systems/grid.js';
import { distance } from '../utility/vector.js';

const db = new SQL();
const doors = {};

export function getDoor(id) {
    return doors[id];
}

function setDoorState(id, state) {
    if (!doors[id]) return;
    doors[id].lockstate = state;
}

function changeDoorOwnership(door) {
    if (!door.id) return;
    if (!doors[door.id]) return;
    doors[door.id] = door;
    alt.emitClient(null, 'door:UpdateDynamicDoor', door);
    alt.emit('door:CacheDoor', door.id, door);
}

alt.on('door:ExitDynamicDoor', (player, id) => {
    const door = getDoor(id);
    if (!door) return;
    const dist = distance(door.exit.position, player.pos);
    if (dist > 5) return;

    player.emitMeta('door:EnteredInterior', undefined);
    player.dimension = 0;
    player.saveDimension(0);

    if (player.vehicle) {
        player.vehicle.pos = door.enter.position;
        player.vehicle.dimension = 0;
        if (player.vehicle.saveDimension) {
            player.vehicle.saveDimension(0);
        }
    } else {
        player.pos = door.enter.position;
    }

    if (player.preColshape) {
        alt.emit('entityEnterColshape', player.preColshape, player);
    }
});

alt.on('door:UseDynamicDoor', (player, data) => {
    const id = data.id;
    const door = getDoor(id);
    if (!door) return;
    const dist = distance(door.enter.position, player.pos);
    if (dist > 5) return;

    if (door.lockstate) {
        player.notify('The door seems to be locked.');
        return;
    }

    if (player.vehicle && !door.isGarage) {
        player.notify('You cannot enter this interior with a vehicle.');
        return;
    }

    player.preColshape = player.colshape;

    if (player.vehicle) {
        player.vehicle.dimension = door.id;
        player.dimension = door.id;
        player.vehicle.pos = door.exit.position;
        if (player.vehicle.saveDimension) {
            player.vehicle.saveDimension(door.id);
        }
    } else {
        player.dimension = door.id;
        player.pos = door.exit.position;
    }

    player.saveDimension(door.id);
    player.emitMeta('door:EnteredInterior', door);
});

alt.on('door:LockDynamicDoor', (player, data) => {
    const id = data.id;
    const door = getDoor(id);
    if (!door) return;
    const dist = distance(door.enter.position, player.pos);
    if (dist > 5) return;

    if (door.guid !== player.data.id) {
        player.send('You do not have the keys for this door.');
        return;
    }

    const state = door.lockstate === 1 ? 0 : 1;
    door.lockstate = state;

    alt.emit('updateDoorLockState', door.id, state);
    alt.emitClient(null, 'door:SetDoorState', door.id, state);
    alt.emit('door:CacheDoor', door.id, door);
    setDoorState(id, state);

    if (state) {
        player.notify('You have locked the door.');
    } else {
        player.notify('You have unlocked the door.');
    }
});

// Door cache values initially comes from Door configuration
// that is merged in with dynamic values from the DB.
// data is door data from DB.
alt.on('door:CacheDoor', (id, data) => {
    let door = Doors.find(x => x.id === id);

    // Overwrite conf values with DB values
    door.guid = data.guid;
    door.lockstate = data.lockstate;
    door.salePrice = data.salePrice;

    if (!door.sector) {
        let lastDist;
        let currentIndex = -1;
        colshapes.forEach((colshape, index) => {
            const sector = colshape.sector;
            let pos = {
                x: (sector.coords.first.x + sector.coords.second.x) / 2,
                y: (sector.coords.first.y + sector.coords.second.y) / 2,
                z: (sector.coords.first.z + sector.coords.second.z) / 2
            };

            const dist = distance(door.enter.position, pos);
            if (!lastDist) {
                lastDist = dist;
                currentIndex = index;
                return;
            }

            if (dist < lastDist) {
                lastDist = dist;
                currentIndex = index;
            }
        });

        door.sector = currentIndex;
    }

    doors[id] = door;
    alt.emit('parseDoorSector', door);
    alt.log(`Cached door ${door.id} - Owner: ${door.guid}`);
});

alt.on('updateDoorLockState', async (id, state) => {
    await db.updatePartialData(id, { lockstate: state }, 'Door');
});

// Update sectors with door information
alt.on('parseDoorSector', data => {
    const index = colshapes[parseInt(data.sector)].sector.doors.findIndex(door => {
        if (door.id === data.id) return door;
    });

    if (index <= -1) {
        colshapes[parseInt(data.sector)].sector.doors.push(data);
    } else {
        colshapes[parseInt(data.sector)].sector.doors[index] = data;
    }
});

alt.on('door:PurchaseDynamicDoor', async (player, data) => {
    const id = data.id;
    let door = getDoor(id);
    if (!door) {
        return;
    }

    const dist = distance(door.enter.position, player.pos);
    if (dist > 5) {
        return;
    }

    // Server Ownership
    if (door.guid <= -1) {
        if (!player.subCash(door.salePrice)) {
            player.playAudio('error');
            player.notify('You do not have enough cash.');
            return;
        }

        door.guid = player.data.id;
        door.salePrice = -1;
        await db.upsertData(door, 'Door');
        changeDoorOwnership(door);
        return;
    }

    const character = await db.fetchByIds(door.guid, 'Character');
    if (!character) {
        player.notify('User does not exist.');
        return;
    }

    if (!player.subCash(door.salePrice)) {
        player.playAudio('error');
        player.notify('You do not have enough cash.');
        return;
    }

    character.cash += door.salePrice;
    door.guid = player.data.id;
    door.salePrice = -1;
    await db.upsertData(door, 'Door');
    await db.updatePartialData(character.id, { cash: character.cash }, 'Character');
    changeDoorOwnership(door);
});
