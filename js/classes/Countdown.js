import * as DOM from '../elements/Elements.js';

export class Countdown {
    constructor(time) {
        let _timeEnd = false;
        this.getTimeEnd = () => _timeEnd;
        this.updTimeEnd = () => _timeEnd = true;

        this.time = time;
        this.countdown;
    }
    init() {
        DOM.PROGRESS_BAR.classList.remove('hidden');
        DOM.PROGRESS_BAR_SPAN.style.width = "100%";

        let counter = 1;

        const difference = 100 / this.time;
        let percent = 100;

        this.interval(counter, percent, difference)
    }
    interval(counter, percent, difference) {
        this.countdown = setInterval(() => {
            if (counter > this.time) {
                this.clearInterval()
                this.updTimeEnd()
                console.log(this.getTimeEnd())
            }
            DOM.PROGRESS_BAR_SPAN.style.width = `${Math.floor(percent -= difference)}%`;
            counter++;
        }, 1000);
    }
    clearInterval() {
        clearInterval(this.countdown)
    }
}