import * as alt from 'alt';
import * as native from 'natives';
import * as panelsInventory from '/client/panels/inventory.js';
import * as panelsChat from '/client/panels/chat.js';
import * as panelsHelp from '/client/panels/help.js';
import * as panelsFactions from '/client/panels/factions.js';
import * as systemsVehicles from '/client/systems/vehicles.js';
import * as systemsContext from '/client/systems/context.js';
import * as utilityGameInfo from '/client/utility/gameinfo.js';
// import * as chat from 'chat';

alt.log('Loaded: client->events->keybinds.js');

let keybinds = {
    // Shift + F - Keep Engine Running
    70: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: systemsVehicles.keepEngineRunning
    },
    // Shift + G - Toggle Engine
    71: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: systemsVehicles.toggleEngine
    },
    // Shift + H - Toggle Vehicle Lock
    72: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: systemsVehicles.toggleLock
    },
    // I - Inventory
    73: {
        altModifier: false,
        shiftModifier: false,
        onKeyUp: panelsInventory.showDialogue
    },
    // T - Chat
    84: {
        altModifier: false,
        shiftModifier: false,
        onKeyUp: panelsChat.toggleDialogue
    },
    // U - Faction Panel
    85: {
        altModifier: false,
        shiftModifier: false,
        onKeyUp: panelsFactions.showDialogue
    },
    // Shift + F2 - Get Location Info
    113: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: utilityGameInfo.printLocation
    },
    // Shift + F3 - Get Interior Info
    114: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: utilityGameInfo.printInteriorInfo
    },
    // Shift + F7 - Hide Chat
    118: {
        altModifier: false,
        shiftModifier: true,
        onKeyUp: panelsChat.toggleHide
    },
    // Tab - Hold for Context Cursor
    9: {
        altModifier: false,
        shiftModifier: false,
        onKeyDown: systemsContext.showContext,
        onKeyUp: systemsContext.hideContext
    },
    // F1 - Help
    /*
    112: {
        altModifier: false,
        shiftModifier: false,
        onKeyUp: panelsHelp.toggleHelp
    }
    */
};

let cooldown = false;
let shiftModified = false;
let altModified = false;

alt.on('meta:Changed', loadInterval);

// Only starts the interval after the player has logged in.
function loadInterval(key) {
    if (key !== 'loggedin') return;
    alt.off('meta:Changed', loadInterval);
    alt.on('keyup', keyup);
    alt.on('keydown', keydown);
}

function keyup(key) {
    if (key === 16) shiftModified = false;
    if (key === 18) altModified = false;

    if (alt.Player.local.getMeta('viewOpen')) return;
    if (!alt.Player.local.getMeta('loggedin')) return;
    if (alt.Player.local.getMeta('chat')) return;
    if (alt.Player.local.getMeta('job:KeyPressEvent')) return;

    if (cooldown) return;
    if (keybinds[key] !== undefined) {
        cooldown = true;
        alt.setTimeout(() => {
            cooldown = false;
        }, 200);

        // Shift Modified Keys
        if (keybinds[key].shiftModifier) {
            if (!shiftModified) return;
            keybinds[key].onKeyUp();
            return;
        }

        // Alt Modified Keys
        if (keybinds[key].altModifier) {
            if (!altModified) return;
            keybinds[key].onKeyUp();
            return;
        }

        // Normal Keys
        keybinds[key].onKeyUp();
        return;
    }
}

// For Key Modifiers
function keydown(key) {
    if (key === 16) shiftModified = true;
    if (key === 18) altModified = true;

    // Hold TAB for Context Cursor
    if (keybinds[key] && keybinds[key].hasOwnProperty('onKeyDown')) {
        keybinds[key].onKeyDown();
    }
}
