const cards = [
  'apple', 'apple', 'banana', 'banana', 'orange', 'orange',
  'grape', 'grape', 'watermelon', 'watermelon', 'cherry', 'cherry'
];

// Shuffle the cards array randomly
cards.sort(() => Math.random() - 0.5);

let firstCard, secondCard;
let score = 0;

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.textContent = card;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  const card = this;
  const index = card.dataset.index;
  card.classList.add('flipped');

  if (!firstCard) {
    firstCard = { index, value: cards[index] };
  } else {
    secondCard = { index, value: cards[index] };
    if (firstCard.value === secondCard.value) {
      document.getElementById('message').textContent = 'Match!';
      card.classList.add('matched');
      firstCard.cardElement.classList.add('matched');
      score++;
      if (score === cards.length / 2) {
        document.getElementById('message').textContent = 'You win!';
      }
    } else {
      document.getElementById('message').textContent = 'Try again!';
      setTimeout(() => {
        card.classList.remove('flipped');
        firstCard.cardElement.classList.remove('flipped');
      }, 1000);
    }
    firstCard = null;
    secondCard = null;
  }

  firstCard.cardElement = card;
}

createBoard();
