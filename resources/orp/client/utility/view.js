import * as alt from 'alt';
import * as native from 'natives';
import { showCursor } from '/client/utility/cursor.js';

alt.log('Loaded: client->utility->view.js');

export let currentView;

alt.on('view:ForceClose', () => {
    if (!currentView) return;
    currentView.close();
});

alt.on('view:DestroyAll', () => {
    if (currentView && currentView.view) {
        currentView.view.destroy();
    }
});

export class View {
    constructor() {
        if (alt.Player.local.getMeta('chat')) return;
        if (currentView === undefined) {
            currentView = this;
        }
        return currentView;
    }

    open(url, killControls = true) {
        if (!currentView.view) {
            currentView.view = new alt.WebView(url);
            currentView.events = [];
        } else {
            showCursor(false);
        }

        alt.Player.local.setMeta('viewOpen', true);
        alt.emit('chat:Toggle');

        currentView.on('close', currentView.close);
        currentView.view.url = url;
        currentView.view.isVisible = true;
        currentView.view.focus();
        currentView.ready = true;
        native.displayRadar(false);
        if (killControls) {
            currentView.gameControls = this.toggleGameControls.bind(this);
            currentView.interval = alt.setInterval(currentView.gameControls, 0);
        }
    }

    // Close view and hide.
    close() {
        currentView.ready = false;

        currentView.events.forEach(event => {
            currentView.view.off(event.name, event.func);
        });

        currentView.view.off('close', currentView.close);
        currentView.view.url = 'http://resource/client/html/empty/index.html';
        currentView.view.unfocus();
        currentView.events = [];

        for (let i = 0; i < 5; i++) {
            native.triggerScreenblurFadeOut(0);
        }

        showCursor(false);
        native.displayRadar(true);
        alt.Player.local.setMeta('viewOpen', false);
        alt.emit('chat:Toggle');
        if (currentView.interval !== undefined) {
            alt.clearInterval(currentView.interval);
            currentView.interval = undefined;
        }
    }

    // Bind on events, but don't turn off.
    on(name, func) {
        if (currentView.view === undefined) return;
        if (currentView.events.includes(event => event.name === name)) return;
        const event = {
            name,
            func
        };
        currentView.events.push(event);
        currentView.view.on(name, func);
    }

    emit(name, ...args) {
        if (!currentView.view) return;
        currentView.view.emit(name, ...args);
    }

    toggleGameControls() {
        native.disableAllControlActions(0);
        native.disableAllControlActions(1);
    }
}
