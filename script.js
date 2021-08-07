const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// this doesn't set to localstorage
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//this will set to localstorage
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  //let us reduce the time from 10s to less by 1sec difference
  time--;
  //updating the timeEl(which is actually time to above time)
  timeEl.innerHTML = time + 's';
  if (time === 0) {
    //stops at 0s
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
addWordToDom();

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//Event Listeners
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDom();
    updateScore();
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem('difficulty', difficulty);
});
