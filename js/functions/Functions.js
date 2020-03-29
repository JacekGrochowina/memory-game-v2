import * as DOM from '../elements/Elements.js';

export function takeDifficulty() {
    for (let i = 0; i < DOM.RADIO_SETTINGS.length; i++)
        if (DOM.RADIO_SETTINGS[i].checked)
            return DOM.RADIO_SETTINGS[i].value;
}

export function disableSettings() {
    DOM.RADIO_SETTINGS.forEach(item => item.disabled = true);
    DOM.BTN_START.disabled = true;
    DOM.SETTINGS_DASHBOARD.classList.add('disable');
}

export function enableSettings() {
    DOM.RADIO_SETTINGS.forEach(item => item.disabled = false);
    DOM.BTN_START.disabled = false;
    DOM.SETTINGS_DASHBOARD.classList.remove('disable');
}

export function removeCards() {
    DOM.GAME_DIV.innerHTML = null;
}

export function removeProgressBar() {
    DOM.PROGRESS_BAR.classList.add('hidden');
}