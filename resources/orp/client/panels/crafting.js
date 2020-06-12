import * as alt from 'alt';
import { View } from '/client/utility/view.js';
import { getLevel } from '/client/systems/xp.js';
import { showCursor } from '/client/utility/cursor.js';

alt.log('Loaded: client->panels->info.js');

const url = 'http://resource/client/html/crafting/index.html';
let webview;
let craftType;

export function weaponryCrafting() {
    alt.emitServer('gangs:CheckCraftDialogue', 'weaponry');
}

alt.onServer('gangs:ShowCraftingDialogue', type => {
    craftType = type;
    showDialogue(type);
});

alt.on('crafting:CookingMenu', () => {
    craftType = 'cooking';
    showDialogue('cooking');
});

alt.on('crafting:ToolsMenu', () => {
    craftType = 'tools';
    showDialogue('tools');
});

// Show the webview for the player to type in their roleplay info.
export function showDialogue(type) {
    if (!webview) {
        webview = new View();
    }

    if (alt.Player.local.getMeta('viewOpen')) return;
    if (alt.Player.local.getSyncedMeta('dead')) return;
    if (alt.Player.local.getMeta('arrest')) return;

    // Setup Webview
    webview.open(url, true);
    webview.on('craft:Close', closeDialogue);
    webview.on('craft:CraftItem', craftItem);
    webview.on('craft:Ready', ready);
    alt.emitServer('craft:GetRecipes', type);
}

function closeDialogue() {
    craftType = undefined;
    if (!webview) return;
    webview.close();
}

function ready() {
    if (!webview) return;
    showCursor(true);
}

function craftItem(itemkey) {
    alt.emitServer('craft:CraftItem', craftType, itemkey);
}

// When the player updates their inventory.
alt.on('meta:Changed', (key, value) => {
    if (key !== 'inventory') return;
    if (!webview) return;
    webview.emit('craft:SetInventory', value);
});

alt.onServer('craft:ParseRecipes', recipes => {
    if (!webview) return;
    alt.setTimeout(() => {
        Object.keys(recipes).forEach(key => {
            webview.emit('craft:AddRecipe', key, recipes[key]);
        });

        const skills = JSON.parse(alt.Player.local.getMeta('skills'));
        const craftingLevel = getLevel(skills.crafting.xp);
        const cookingLevel = getLevel(skills.cooking.xp);

        webview.emit('craft:CookingLevel', cookingLevel);
        webview.emit('craft:CraftingLevel', craftingLevel);
        webview.emit('craft:SetInventory', alt.Player.local.getMeta('inventory'));
    }, 1000);
});
