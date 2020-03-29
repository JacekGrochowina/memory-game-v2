import * as DOM from '../elements/Elements.js';
import * as fnc from '../functions/Functions.js';
import { CardsFactory } from './CardsFactory.js';
import { Countdown } from './Countdown.js';

export class Game {
    constructor(level, numCards, countdown) {
        let _level = level;
        this.getLevel = () => _level;

        let _numCards = numCards;
        this.getNumCards = () => _numCards;

        let _countdown = countdown;
        this.getCountdown = () => _countdown;
    }

    start = () => {
        DOM.GAME_DIV.innerHTML = null;

        const cards = new CardsFactory(this.getNumCards());
        const countdown = new Countdown(this.getCountdown());
        countdown.init();

        const interval = setInterval(() => {
            if (countdown.getTimeEnd() && !cards.cardsList.getAllFound()) {
                this.end('Przegrałeś ...', 'lose', interval)

            }
            else if (!countdown.getTimeEnd() && cards.cardsList.getAllFound()) {
                this.end('Wygrałeś !', 'win', interval)
                countdown.clearInterval()
            }
        }, 10)
    }
    end = (message, result, interval) => {
        clearInterval(interval)
        fnc.removeCards();
        fnc.removeProgressBar();
        fnc.enableSettings();
        switch (result) {
            case 'lose':
                DOM.GAME_DIV.innerHTML = `<h1 class="result lose">${message}</h1>`;
                break;
            case 'win':
                DOM.GAME_DIV.innerHTML = `<h1 class="result win">${message}</h1>`;
                break;
        }
    }
}