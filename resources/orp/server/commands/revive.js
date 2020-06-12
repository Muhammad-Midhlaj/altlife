import * as chat from '../chat/chat.js';
import { Config } from '../configuration/config.js';

chat.registerCmd('revive', player => {
    if (!player.data.dead) return;

    if (player.reviving) {
        player.notify(
            `You will revive in ${(player.reviveTime - Date.now()) / 1000} seconds.`
        );
        return;
    }

    player.reviveTime = Date.now() + Config.defaultPlayerReviveTime;
    player.reviving = true;
    player.notify('Please wait; you will be revived within 20 to 30 seconds.');
});

chat.registerCmd('cancelrevive', player => {
    if (!player.data.dead) return;
    if (!player.revive) return;

    player.reviving = false;
    player.reviveTime = undefined;
    player.notify('You have cancelled your revive time.');
});
