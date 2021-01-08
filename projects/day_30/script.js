const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const highestScoreBoard = document.querySelector('.high-score');
let lastHole;
let timeUp = false;
let score = 0;
let highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
highestScoreBoard.textContent = highScore

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Same Hole!');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  }, time);
};

function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true
  }, 7000)
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++
  scoreBoard.textContent = score;
  this.parentElement.classList.remove('up');
  if (score > highScore) {
    highScore = score
    highestScoreBoard.textContent = highScore
    localStorage.setItem('highScore', JSON.stringify(highScore))
  }
}

moles.forEach(mole => mole.addEventListener('click', bonk))