import * as alt from 'alt';
import SQL from '../../../postgres-wrapper/database.js';
import { cacheCharacter } from '../cache/cache.js';
import { distance } from '../utility/vector.js';
import { Config } from '../configuration/config.js';
import { existingCharacter } from '../registration/login.js';

const db = new SQL();

const playerPoint = {
    x: -140.45274353027344,
    y: -646.4044189453125,
    z: 168.813232421875
};

export function setRoleplayInfo(player, name) {
    player.needsRoleplayInfo = false;

    player.saveRoleplayInfo(name);

    if (distance(player.pos, playerPoint) <= 20) {
        player.pos = Config.defaultSpawnPoint;
    }

    cacheCharacter(player.data.id, name);
    player.closeRoleplayInfoDialogue();
}

export function select(player, id) {
    const index = player.characters.findIndex(char => parseInt(char.id) === parseInt(id));
    if (index <= -1) {
        return;
    }

    existingCharacter(player, { ...player.characters[index] });
    delete player.characters;
}

alt.onClient('character:New', newCharacter);
async function newCharacter(player) {
    const currentTime = Date.now();

    // New Character
    const data = {
        guid: player.guid,
        lastposition: JSON.stringify(Config.defaultSpawnPoint),
        model: 'mp_m_freemode_01',
        health: 200,
        cash: Config.defaultPlayerCash,
        creation: currentTime,
        lastlogin: currentTime
    };

    // Update ped flags for new user.
    player.emitMeta('pedflags', undefined);
    const newData = await db.upsertData(data, 'Character');
    existingCharacter(player, newData);
}
