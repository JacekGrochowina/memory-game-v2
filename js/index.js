import * as DOM from './elements/Elements.js';
import * as fnc from './functions/Functions.js';
import { Settings } from './classes/Settings.js';
import { Game } from './classes/Game.js';

DOM.BTN_START.addEventListener('click', () => {

    const settings = new Settings();
    settings.updLevel(fnc.takeDifficulty());
    settings.set()
    fnc.disableSettings()

    const game = new Game(
        settings.getLevel(),
        settings.getNumCards(),
        settings.getCountdown()
    )
    game.start();

})

