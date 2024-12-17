'use strict';

const score1 = document.getElementById('score--0'); //an ID
const score2 = document.getElementById('score--1'); //an ID
const diceL = document.querySelector('.dice'); //a class

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const curntScore0 = document.querySelector('#current--0');
const curntScore1 = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore = 0;
const scoreArr = [0, 0];
let activePlayer = 0; //this is used to select active player 1 or 2
let isPlaying = true;

score1.textContent = 0;
score2.textContent = 0;
diceL.classList.add('hidden');

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // if activeplayer = 0 then assign activplayer to 1 and if it's 1 assign it to 0
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate random dice from 1 to 6
    const diceID = Math.trunc(Math.random() * 6) + 1;
    // display
    diceL.classList.remove('hidden');
    diceL.src = `dice-${diceID}.png`;
    if (diceID !== 1) {
      currentScore += diceID;
      // console.log(`current player ${activePlayer} : ${currentScore} `);
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // console.log(`current player ${activePlayer} : ${currentScore} `);
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scoreArr[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoreArr[activePlayer];

    if (scoreArr[activePlayer] >= 20) {
      isPlaying = false;
      diceL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  curntScore0.textContent = 0;
  curntScore1.textContent = 0;
  diceL.classList.add('hidden');
  isPlaying = true;
  score1.textContent = 0;
  score2.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
