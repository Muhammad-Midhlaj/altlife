import * as alt from 'alt';
import * as chat from '../chat/chat.js';
import fs from 'fs';
import { Job, Objectives, ObjectiveFlags } from '../systems/job2.js';

// Development sandbox commands
const sandboxhelp = [
    '/b, /me, /do',
    '/anim (dict) (name) (duration) (flag)',
    '/players, /clearchat',
    '/taxi',
    '/cancel',
    '/quitjob, /getsector',
    '/phonenumber',
    '/t, /call, /addcontact, /removecontact, /hangup',
    '/d20 /flipcoin, /sf'
];

chat.registerCmd('help', player => {
    sandboxhelp.forEach(helper => {
        player.send(`${helper}`);
    });
});

chat.registerCmd('anim', (player, args) => {
    if (args === undefined || args.length < 2) {
        player.send('Usage: /anim (dict) (name) (duration) (flag)');
        return;
    }

    const dur = args[2] ? args[2] : 2500;
    const flag = args[3] ? args[3] : 33;
    player.playAnimation(args[0], args[1], dur, flag);
});

chat.registerCmd('players', player => {
    alt.Player.all.forEach(t => {
        if (!t.data) return;
        player.send(`${t.data.name}`);
    });
});

chat.registerCmd('pos', player => {
    player.send(`${JSON.stringify(player.pos)}`);
    console.log(player.pos);
});

chat.registerCmd('sector', player => {
    player.send(`Current Sector -> X: ${player.sector.x}, Y: ${player.sector.y}`);
});

// /tryparticle core ent_dst_gen_gobstop 5000 1 0 0 0
// /tryparticle core ent_dst_rocks 20 1 0 1.2 -1
chat.registerCmd('tryparticle', (player, args) => {
    const _dict = args[0];
    const _name = args[1];
    const _duration = args[2];
    const _scale = args[3];
    const _x = parseFloat(args[4]);
    const _y = parseFloat(args[5]);
    const _z = parseFloat(args[6]);

    if (args.length < 6) {
        player.send(`/tryparticle dict name duration scale x y z`);
        return;
    }

    alt.emitClient(
        player,
        'tryParticle',
        _dict,
        _name,
        parseFloat(_duration),
        parseFloat(_scale),
        _x,
        _y,
        _z
    );
});

// /tryprop prop_tool_mallet 57005 0.10 0.1 0 80 0 180
chat.registerCmd('tryprop', (player, args) => {
    const _prop = args[0];
    const _bone = args[1];
    const _x = parseFloat(args[2]);
    const _y = parseFloat(args[3]);
    const _z = parseFloat(args[4]);
    const _pitch = parseFloat(args[5]);
    const _roll = parseFloat(args[6]);
    const _yaw = parseFloat(args[7]);
    if (args.length < 7) {
        player.send(`/tryprop prop bone x y z pitch roll yaw`);
        return;
    }

    alt.emitClient(player, 'tryprop', _prop, _bone, _x, _y, _z, _pitch, _roll, _yaw);
});

let trackPoints = [];

chat.registerCmd('track', (player, args) => {
    trackPoints.push(player.pos);
});

chat.registerCmd('trackclear', () => {
    trackPoints = [];
});

chat.registerCmd('trackdone', () => {
    fs.writeFileSync(`trackpoints.json`, JSON.stringify(trackPoints, null, '\t'));
    trackPoints = [];
});

chat.registerCmd('createobj', (player, args) => {
    const name = args[0];
    alt.emitClient(player, 'create:Object', name);
});

chat.registerCmd('tempdoor', (player, args) => {
    if (!player.isEditingDoor) {
        player.isEditingDoor = true;
        alt.emitClient(player, 'editingDoor', true);
    } else {
        player.isEditingDoor = false;
        alt.emitClient(player, 'editingDoor', false);
    }
});

chat.registerCmd('testjob', player => {
    const objectives = [];
    const testObjective = new Objectives.MiniGame(
        { x: -1881.7315673828125, y: 2164.57421875, z: 115.81851196289062 },
        2,
        1,
        { r: 255, g: 255, b: 255, a: 100 },
        'GrabTheLeaves'
    );
    objectives.push(testObjective);
    const jobInstance = new Job(player, 'test', [...objectives]);
});

chat.registerCmd('startjob', player => {
    player.job.start();
});
