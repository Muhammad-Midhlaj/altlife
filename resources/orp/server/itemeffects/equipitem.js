import * as alt from 'alt';
import { BaseItems } from '../configuration/items.js';

alt.on('itemeffects:EquipItem', (player, item, hash) => {
    const inventoryIndex = player.inventory.findIndex(i => {
        if (i && i.hash === hash) return i;
    });

    if (!BaseItems[item.base]) {
        console.log(`Base Item does not exist for EquipItem ${item}`);
        return;
    }

    player.equipItem(inventoryIndex, BaseItems[item.base].slot);
});
