export class Settings {
    constructor() {
        let _level;
        this.getLevel = () => _level;
        this.updLevel = (value) => _level = value;

        let _numCards;
        this.getNumCards = () => _numCards;
        this.updNumCards = (value) => _numCards = value;

        let _countdown;
        this.getCountdown = () => _countdown;
        this.updCountdown = (value) => _countdown = value;
    }
    set() {
        switch (this.getLevel()) {
            case "easy":
                this.updNumCards(6);
                this.updCountdown(10);
                break;
            case "middle":
                this.updNumCards(8);
                this.updCountdown(15);
                break;
            case "hard":
                this.updNumCards(10);
                this.updCountdown(20);
                break;
        }
    }
}