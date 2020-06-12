import * as alt from 'alt';
import { Items } from '../configuration/items.js';
import * as chat from '../chat/chat.js';
import { actionMessage } from '../chat/chat.js';
import { appendToMdc } from './mdc.js';
import { addBoundWeapon } from './inventory.js';
import { getLevel } from './xp.js';
import { FruitStand } from '../configuration/fruitstands.js';

export let doorStates = {
    '{"x":461.8065185546875,"y":-994.4085693359375,"z":25.06442642211914}': {
        pos: {
            x: 461.8065185546875,
            y: -994.4085693359375,
            z: 25.06442642211914
        },
        type: 631614199,
        heading: 0,
        locked: true
    },
    '{"x":461.8064880371094,"y":-997.6583251953125,"z":25.06442642211914}': {
        pos: {
            x: 461.8064880371094,
            y: -997.6583251953125,
            z: 25.06442642211914
        },
        type: 631614199,
        heading: 0,
        locked: true
    },
    '{"x":461.8065185546875,"y":-1001.301513671875,"z":25.06442642211914}': {
        pos: {
            x: 461.8065185546875,
            y: -1001.301513671875,
            z: 25.06442642211914
        },
        type: 631614199,
        heading: 0,
        locked: true
    }
};

export function sodaMachine(player) {
    if (!Items.soda) return;

    if (!player.subCash(5)) {
        player.send(`You don't have enough money for a soda. {FFFF00}$5.00`);
        return;
    }

    player.addItem('soda', 1, Items.soda.props);
    chat.actionMessage(
        player,
        'Inserts money into the machine; and it spits out a soda.'
    );

    player.playAudio3D(player, 'vending');
}

export function coffeeMachine(player) {
    if (!Items.soda) return;
    if (!player.subCash(5)) {
        player.send(`You don't have enough money for some coffee. {FFFF00}$5.00`);
        return;
    }

    player.addItem('coffee', 1, Items.coffee.props);
    chat.actionMessage(
        player,
        'Inserts money into the machine; and it spits out a canned coffee.'
    );

    player.playAudio3D(player, 'vending');
}

export function payPhone(player) {
    player.send('The tone is silent.');
}

export function metroTicketMachine(player) {
    player.send('The machine spits out some tickets.');
}

export function postalBox(player) {
    player.send('You have no mail to send today.');
}

export function hideDumpster(player) {
    player.send(`The dumpster won't open.`);
}

export function leaveDumpster(player) {
    player.send(`You leave the dumpster.`);
}

export function searchDumpster(player) {
    player.send('You find nobody inside.');
}

export function hospitalBed(player, coords) {
    coords = {
        x: coords.x,
        y: coords.y,
        z: coords.z + 0.5
    };

    player.pos = coords;
}

export function exitLabs(player) {
    player.pos = { x: 3626.514404296875, y: 3752.325439453125, z: 28.515737533569336 };
}

export function cuffPlayerFreely(arrester, data) {
    const arrestee = data.player;
    if (!arrester || !arrestee) return;
    if (arrester.cuffedPlayer) {
        arrester.send('You already have a player cuffed.');
        return;
    }

    const cuffCount = arrester.hasQuantityOfItem('cuffs', 1);
    const ropeCount = arrester.hasQuantityOfItem('rope', 1);

    if (!cuffCount && !ropeCount) {
        arrester.send('You cannot bind this player without rope or cuffs.');
        return;
    }

    if (cuffCount) {
        arrestee.cuffTime = Date.now() + 60000 * 10;
        arrester.send('You use your cuffs.');
    } else {
        arrestee.cuffTime = Date.now() + 60000 * 5;
        arrester.subItem('rope', 1);
        arrester.send('You use a bundle of rope.');
    }

    arrester.cuffedPlayer = arrestee;
    console.log(arrestee);
    console.log(arrester.cuffedPlayer.data.name);
    arrestee.isArrested = true;
    arrestee.unequipItem(11);
    alt.emitClient(arrestee, 'arrest:Tazed', -1);
    arrestee.setSyncedMeta('arrested', arrester);
    arrestee.setSyncedMeta('arrestedFreely', true);
    arrestee.emitMeta('arrest', arrester);
    actionMessage(
        arrester,
        `Forces ${arrestee.data.name.replace(
            '_',
            ' '
        )}'s hands behind their back and binds them.`
    );
}

export function friskPlayer(arrester, data) {
    const arrestee = data.player;
    const isOfficer =
        arrester.job && arrester.job.name.includes('Officer') ? true : false;
    const results = arrestee.searchItems();

    if (!results.hasDrugs && !results.hasWeapons) {
        const msg = `Frisks ${arrestee.data.name.replace('_', ' ')} and finds nothing.`;
        actionMessage(arrester, msg);
    }

    if (results.hasDrugs) {
        const msg = `Frisks ${arrestee.data.name.replace('_', ' ')} and finds drugs.`;
        actionMessage(arrester, msg);

        if (isOfficer) {
            appendToMdc('None - Frisked', arrestee, 'Drugs');
        }
    }

    if (results.hasWeapons) {
        const msg = `Frisks ${arrestee.data.name.replace('_', ' ')} and finds weapons.`;
        actionMessage(arrester, msg);

        if (isOfficer) {
            appendToMdc('None - Frisked', arrestee, 'Weapons');
        }
    }

    if (isOfficer) {
        cuffPlayer(arrester, arrestee);
    }
}

export function cuffPlayer(arrester, data) {
    const arrestee = data.player;
    if (!arrester || !arrestee) return;
    if (arrester.cuffedPlayer) {
        arrester.send('You already have a player cuffed.');
        return;
    }

    const cuffCount = arrester.hasQuantityOfItem('cuffs', 1);
    const ropeCount = arrester.hasQuantityOfItem('rope', 1);

    if (!cuffCount && !ropeCount) {
        arrester.send('You cannot bind this player without rope or cuffs.');
        return;
    }

    if (cuffCount) {
        arrestee.cuffTime = Date.now() + 60000 * 10;
        arrester.send('You use your cuffs.');
    } else {
        arrestee.cuffTime = Date.now() + 60000 * 5;
        arrester.subItem('rope', 1);
        arrester.send('You use a bundle of rope.');
    }

    arrester.cuffedPlayer = arrestee;
    arrestee.isArrested = true;
    arrestee.unequipItem(11);
    alt.emitClient(arrestee, 'arrest:Tazed', -1);
    arrestee.setSyncedMeta('arrested', arrester);
    arrestee.setSyncedMeta('arrestedFreely', false);
    arrestee.emitMeta('arrest', arrester);
    actionMessage(
        arrester,
        `Forces ${arrestee.data.name.replace(
            '_',
            ' '
        )}'s hands behind their back and binds them.`
    );
}

export function uncuffPlayer(arrester, data) {
    const arrestee = data.player;
    if (!arrester || !arrestee) return;
    arrester.cuffedPlayer = null;
    arrestee.isArrested = false;
    arrestee.cuffTime = 0;
    arrestee.setSyncedMeta('arrested', undefined);
    arrestee.emitMeta('arrest', undefined);
    actionMessage(
        arrester,
        `Uses their keys to uncuff ${arrestee.data.name.replace('_', ' ')}.`
    );
}

export function breakCuffs(player) {
    if (!player.cuffTime) return;
    if (Date.now() > player.cuffTime) {
        player.setSyncedMeta('arrested', undefined);
        player.emitMeta('arrest', undefined);
        actionMessage(player, `Breaks free from their binding.`);
    } else {
        const timeRemaining = Math.abs((Date.now() - player.cuffTime) / 1000);
        player.send(`Cuffs are breakable in ${timeRemaining} seconds.`);
        actionMessage(player, `Tries fiddling with their bindings.`);
    }
}

export function toggleDoor(player, data) {
    if (data.type === 631614199) {
        if (!player.job) return;
        if (!player.job.name.includes('Officer')) return;
    }

    if (data.locked) {
        data.locked = false;
        doorStates[`${JSON.stringify(data.pos)}`] = data;
        alt.emitClient(null, 'door:Unlock', data.type, data.pos, data.heading);
    } else {
        data.locked = true;
        doorStates[`${JSON.stringify(data.pos)}`] = data;
        alt.emitClient(null, 'door:Lock', data.type, data.pos, data.heading);
    }
}

export function fireExtinguisher(player) {
    const index = player.inventory.findIndex(x => x && x.name.includes('Extinguisher'));
    if (index > -1) {
        player.send('You already have one of those.');
        return;
    }

    addBoundWeapon(player, 'FireExtinguisher');
    player.send('You pick up the fire extinguisher.');
}

export function useDynamicDoor(player, data) {
    alt.emit('door:UseDynamicDoor', player, data);
}

export function exitDynamicDoor(player, id) {
    alt.emit('door:ExitDynamicDoor', player, id);
}

export function lockDynamicDoor(player, data) {
    alt.emit('door:LockDynamicDoor', player, data);
}

export function purchaseDynamicDoor(player, data) {
    alt.emit('door:PurchaseDynamicDoor', player, data);
}

export function candyDispenser(player) {
    if (!Items.candy) return;

    if (!player.subCash(2)) {
        player.send(`You don't have enough money for some candy. {FFFF00}$2.00`);
        return;
    }

    player.addItem('candy', 1, Items.candy.props);
    chat.actionMessage(
        player,
        'Inserts money into the candy machine; and it spits out a candy bar.'
    );

    player.playAudio3D(player, 'gumball');
}

export function hotdogDispenser(player) {
    if (!Items.hotdog) return;

    if (!player.subCash(4)) {
        player.send(`You don't have enough money for a hotdog. {FFFF00}$4.00`);
        return;
    }

    player.addItem('hotdog', 1, Items.hotdog.props);
    chat.actionMessage(player, 'Hands over some cash and recieves a hotdog.');
    player.playAudio3D(player, 'cook');
}

export function burgerDispenser(player) {
    if (!Items.burger) return;

    if (!player.subCash(4)) {
        player.send(`You don't have enough money for a burger. {FFFF00}$4.00`);
        return;
    }

    player.addItem('burger', 1, Items.burger.props);
    chat.actionMessage(player, 'Hands over some cash and recieves a burger.');
    player.playAudio3D(player, 'cook');
}

export function waterDispenser(player, data) {
    if (!data) return;
    if (data.hashes.length <= 0) return;

    for (let i = 0; i < data.hashes.length; i++) {
        if (player.subItemByHash(data.hashes[i])) {
            player.addItem('waterjug', 1, {});
        }
    }

    chat.actionMessage(player, 'Fills their empty jugs with water.');
    player.playAudio3D(player, 'fillwater');
}

export function fruitDispenser(player, data) {
    const choice = data.type;
    if (!FruitStand.includes(choice.toLowerCase())) {
        return;
    }

    if (!player.subCash(5)) {
        player.send(`You don't have enough money for a ${choice}. {FFFF00}$5.00`);
        return;
    }

    const properName = choice.charAt(0).toUpperCase() + choice.slice(1);
    player.addItem(
        'ingredient',
        1,
        {},
        false,
        false,
        properName,
        choice,
        properName.toLowerCase()
    );
    player.playAudio('buy');
}
