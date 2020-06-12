import * as alt from 'alt';
import * as native from 'natives';
import { View } from '/client/utility/view.js';
import { Vehicles } from '/client/gamedata/vehicles.js';
import { Camera } from '/client/utility/camera.js';
import { showCursor } from '/client/utility/cursor.js';

const url = 'http://resource/client/html/vehiclevendor/index.html';
let webview;
let camera;
let currentVehicle;
let currentVehicles = [];
let type = '';
let vehiclePos = {
    x: -43.35280990600586,
    y: -1095.1534423828125,
    z: 26.42232894897461
};
let camPos = { x: -45.453521728515625, y: -1100.82958984375, z: 27.42232894897461 };

export function showDialogue(vehPos, cPos, vehicleClassType = 'Sedans') {
    if (!webview) {
        webview = new View();
    }

    if (alt.Player.local.getMeta('viewOpen')) return;
    if (alt.Player.local.getSyncedMeta('dead')) return;
    if (alt.Player.local.getMeta('arrest')) return;

    vehiclePos = vehPos;
    camPos = cPos;

    // Setup Webview
    webview.open(url, true);
    webview.on('vehvendor:Ready', ready);
    webview.on('vehvendor:ChangeIndex', changeIndex);
    webview.on('vehvendor:Purchase', purchase);
    webview.on('vehvendor:Exit', exit);
    webview.on('vehvendor:ChangeRotation', rotate);
    type = vehicleClassType;
    camera = new Camera(camPos, 70);
}

function ready() {
    if (!webview) return;
    showCursor(true);
    webview.emit('vehiclevendor:SetVehicleClassType', type);
    alt.emitServer('fetch:VehiclePrices');

    const filteredVehicles = Vehicles.filter(x => {
        if (x.sell && x.class.toLowerCase() === type.toLowerCase()) return x;
    });

    currentVehicles = filteredVehicles;
    currentVehicles.forEach(vehicle => {
        webview.emit('vehiclevendor:SetVehicleData', vehicle);
    });
}

function rotate(value) {
    if (!webview) return;
    if (!currentVehicle) return;
    native.setEntityHeading(currentVehicle, value);
}

function changeIndex(index, heading = 0) {
    if (!webview) return;
    if (!currentVehicles[index]) return;
    if (currentVehicle) {
        native.deleteEntity(currentVehicle);
    }

    const hash = native.getHashKey(currentVehicles[index].name);
    native.requestModel(hash);
    alt.loadModel(hash);

    currentVehicle = native.createVehicle(
        hash,
        vehiclePos.x,
        vehiclePos.y,
        vehiclePos.z,
        0,
        false,
        false,
        false
    );

    alt.nextTick(() => {
        native.setEntityHeading(currentVehicle, heading);
        native.setVehicleEngineOn(currentVehicle, true, false, false);
        camera.pointAtEntity(currentVehicle, 0, 0, 0);
    });
}

function purchase(name) {
    if (!webview) return;
    if (currentVehicle) {
        native.deleteEntity(currentVehicle);
        currentVehicle = undefined;
        currentVehicles = [];
    }

    if (camera) {
        camera.destroy();
        camera = undefined;
    }

    webview.close();
    alt.emitServer('vehiclevendor:Purchase', name);
}

function exit() {
    if (!webview) return;
    webview.close();
    showCursor(false);

    if (currentVehicle) {
        native.deleteEntity(currentVehicle);
        currentVehicle = undefined;
        currentVehicles = [];
    }

    if (camera) {
        camera.destroy();
        camera = undefined;
    }
}

alt.onServer('return:VehiclePrices', prices => {
    if (!webview) return;
    webview.emit('vehiclevendor:SetVehiclePrices', prices);
});
