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
                this.end('Przegrałeś', interval)

            }
            else if (!countdown.getTimeEnd() && cards.cardsList.getAllFound()) {
                this.end('Wygrałeś', interval)
                countdown.clearInterval()
            }
        }, 100)
    }
    end = (message, interval) => {
        clearInterval(interval)
        fnc.removeCards();
        fnc.removeProgressBar();
        fnc.enableSettings();
        DOM.GAME_DIV.innerHTML = `<h1>${message}</h1>`;
    }
}