import { DATA } from '../data/Data.js';
import * as DOM from '../elements/Elements.js';

export class CardsFactory {
    constructor(numCards) {
        this.cardsList = new CardsList(numCards);

        this.cardsList.addCards()
        this.cardsList.shuffle()
        this.cardsList.render()
        this.cardsList.addElements()
        this.cardsList.hideCards(1000)
        setTimeout(() => {
            this.cardsList.addClickListener()
        }, 1000)
    }
}

class CardsList {
    constructor(numCards) {
        this.id = 0;
        this.idCouple = 0;

        this.list = [];
        this.elements = [];
        this.numCards = numCards;

        this.allFound = false;
        this.getAllFound = () => this.allFound;
        this.cardsFound = 0;
    }
    shuffle() {
        var currentIndex = this.list.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.list[currentIndex];
            this.list[currentIndex] = this.list[randomIndex];
            this.list[randomIndex] = temporaryValue;
        }
        return this.list;
    }
    hideCards(time) {
        setTimeout(() => {
            this.list.forEach(item => console.log(item.getElement().classList.add('hidden')))
        }, time)
    }
    addCard(id, idCouple, element, background) {
        this.list.push(new Card(id, idCouple, element, background));
        this.id++;
        this.idCouple++;
    }
    addCards() {
        for (let i = 0; i < 2; i++) {
            for (let i = 0; i < this.numCards; i++) {
                this.addCard(this.id, this.idCouple, this.elements[i], DATA.BG_IMAGES[i]);
            }
            this.idCouple = 0;
        }
    }
    addElements() {
        this.elements.forEach((item, number) => this.list[number].updElement(item))
    }
    addClickListener() {
        let selectedEl = [];
        let selectedID = [];

        const handlerClick = (item) => {
            const removeClass = (element) => element.classList.remove('hidden');
            const addClass = (element) => element.classList.add('hidden');
            if ((selectedEl.length < 2) && (item.getElement().getAttribute('data-found') == 'false')) {
                removeClass(item.getElement());
                selectedEl.push(item.getElement())
                selectedID.push(item.idCouple);

                if (selectedEl.length === 2 && selectedID.length === 2) {
                    if (selectedEl[0] === selectedEl[1]) {
                        //console.log('Kliknąłes dwa razy w tę samą kartę.')
                        addClass(item.getElement());
                    }
                    if ((selectedID[0] === selectedID[1]) && !(selectedEl[0] === selectedEl[1])) {
                        //console.log('Znalazłeś parę.')
                        this.cardsFound++;
                        this.handlerAllFound()
                        console.log(this.allFound)
                        selectedEl.forEach(item => item.classList.add('found'))
                        selectedEl.forEach(item => item.setAttribute('data-found', 'true'))
                    }
                    if (!(selectedID[0] === selectedID[1]) && !(selectedEl[0] === selectedEl[1])) {
                        //console.log('Nie znalazłeś pary.')
                        let index0 = selectedEl[0];
                        let index1 = selectedEl[1];
                        setTimeout(() => {
                            addClass(index0);
                            addClass(index1);
                        }, 250)
                    }
                    setTimeout(() => {
                        selectedEl = []
                        selectedID = []
                    }, 250)
                }
            }
        }
        this.list.forEach(item => item.getElement().addEventListener('click', () => handlerClick(item)));
    }
    handlerAllFound() {
        if (this.cardsFound >= this.numCards)
            return this.allFound = true
        return this.allFound = false
    }
    render() {
        for (let i = 0; i < this.list.length; i++) {
            const gameDiv = DOM.GAME_DIV;
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-found', 'false')
            // card.style.backgroundColor = this.list[i].getColor();
            card.style.backgroundImage = this.list[i].getBg();
            gameDiv.appendChild(card);
            this.elements.push(card);
        }
    }
}

class Card {
    constructor(id, idCouple, element, background) {
        this.id = id;
        this.idCouple = idCouple;
        let _element = element;
        this.getElement = () => _element;
        this.updElement = (value) => _element = value;
        let _background = background;
        this.getBg = () => _background;
    }
}