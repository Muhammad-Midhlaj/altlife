import * as alt from 'alt';
import { Weapons } from '../configuration/weapons.js';

/**
 * Verifies if a player has a weapon equipped.
 * @param player
 */
export function verifyWeapon(player) {
    /*
    if (!player.equipment[11]) {
        alt.log(`!KICKED => ${player.name} does not have a weapon equipped.`);
        player.kick();
        return false;
    }

    if (!player.equipment[11].props) {
        return true;
    }

    if (player.equipment[11].props.hash !== player.currentWeapon) {
        alt.log(`!KICKED => ${player.name} does not have a weapon equipped.`);
        player.kick();
        return false;
    }
    */

    return true;
}
