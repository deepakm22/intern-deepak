// game.js
import Card from './card.js';

export default class MemoryGame {
  constructor(cardsData, containerSelector) {
    this.cardsData = cardsData;
    this.container = document.querySelector(containerSelector);
    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
    this.matches = 0;
  }

  initialize() {
    this.createBoard();
  }

  createBoard() {
    this.shuffleCards();
    this.cardsData.forEach(cardData => {
      const card = new Card(cardData.id, cardData.symbol, this.handleCardClick.bind(this));
      this.cards.push(card);
      this.container.appendChild(card.element);
    });
  }

  shuffleCards() {
    for (let i = this.cardsData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cardsData[i], this.cardsData[j]] = [this.cardsData[j], this.cardsData[i]];
    }
  }

  handleCardClick(clickedCard) {
    if (this.lockBoard || clickedCard === this.firstCard) return;

    clickedCard.flip();

    if (!this.firstCard) {
      this.firstCard = clickedCard;
    } else {
      this.secondCard = clickedCard;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    if (this.firstCard.id === this.secondCard.id) {
      this.disableCards();
      this.matches++;
      if (this.matches === this.cards.length / 2) {
        this.endGame();
      }
    } else {
      this.unflipCards();
    }
  }

  disableCards() {
    this.firstCard.disable();
    this.secondCard.disable();
    this.resetBoard();
  }

  unflipCards() {
    this.lockBoard = true;

    setTimeout(() => {
      this.firstCard.unflip();
      this.secondCard.unflip();
      this.resetBoard();
    }, 1000);
  }

  resetBoard() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockBoard = false;
  }

  endGame() {
    setTimeout(() => {
      alert('Congratulations! You have won the game!');
    }, 500); // Delay alert for smoother visual feedback
  }
}
