// card.js
export default class Card {
    constructor(id, symbol, clickCallback) {
      this.id = id;
      this.symbol = symbol;
      this.clickCallback = clickCallback;
      this.element = this.createCardElement();
      this.element.addEventListener('click', this.handleClick.bind(this));
      this.element.classList.add('card');
    }
  
    createCardElement() {
      const cardElement = document.createElement('div');
      cardElement.dataset.id = this.id;
      cardElement.textContent = this.symbol;
      return cardElement;
    }
  
    handleClick() {
      this.clickCallback(this);
    }
  
    flip() {
      this.element.classList.add('flip');
    }
  
    unflip() {
      this.element.classList.remove('flip');
    }
  
    disable() {
      this.element.removeEventListener('click', this.handleClick.bind(this));
    }
  }
  