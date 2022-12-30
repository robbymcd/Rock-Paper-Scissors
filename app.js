let userWins = 0;
let compWins = 0;
const playRoundUserCall = {};
const optionsElements = {
  rock: document.querySelector('#rock'),
  paper: document.querySelector('#paper'),
  scissors: document.querySelector('#scissors'),
};
const options = Object.keys(optionsElements);
const result = document.querySelector('#results');
const score = document.querySelector('#score');
const userScore = document.querySelector('.user-score');
const compScore = document.querySelector('.comp-score');
const userRock = document.querySelector('.user-rock');
const userPaper = document.querySelector('.user-paper');
const userScissors = document.querySelector('.user-scissors');
const compRock = document.querySelector('.comp-rock');
const compPaper = document.querySelector('.comp-paper');
const compScissors = document.querySelector('.comp-scissors');
const playAgain = document.querySelector('#play-again');

function getComputerChoice() {
  return options[Math.floor(Math.random() * options.length)];
}

function removeEventListeners() {
  options.forEach((option) => {
    optionsElements[option].removeEventListener('click', playRoundUserCall[option]);
  });
}

function playRound(playerSelection) {
  const computerSelection = getComputerChoice(options);
  if (playerSelection.localeCompare(computerSelection) === 0) {
    result.textContent = 'Tie!';
  } else if ((playerSelection === 'rock' && computerSelection === 'scissors') || (playerSelection === 'paper' && computerSelection === 'rock') || (playerSelection === 'scissors' && computerSelection === 'paper')) {
    result.textContent = `+1 Player! ${playerSelection} beats ${computerSelection}`;
    userWins += 1;
  } else {
    result.textContent = `+1 Computer! ${computerSelection} beats ${playerSelection}`;
    compWins += 1;
  }
  userScore.textContent = `Score: ${userWins}`;
  compScore.textContent = `Score: ${compWins}`;
  if (playerSelection === 'rock') {
    userRock.classList.add('correct');
    userPaper.classList.remove('correct');
    userScissors.classList.remove('correct');
  } else if (playerSelection === 'paper') {
    userPaper.classList.add('correct');
    userRock.classList.remove('correct');
    userScissors.classList.remove('correct');
  } else if (playerSelection === 'scissors') {
    userScissors.classList.add('correct');
    userRock.classList.remove('correct');
    userPaper.classList.remove('correct');
  }
  if (computerSelection === 'rock') {
    compRock.classList.add('correct');
    compPaper.classList.remove('correct');
    compScissors.classList.remove('correct');
  } else if (computerSelection === 'paper') {
    compPaper.classList.add('correct');
    compRock.classList.remove('correct');
    compScissors.classList.remove('correct');
  } else if (computerSelection === 'scissors') {
    compScissors.classList.add('correct');
    compRock.classList.remove('correct');
    compPaper.classList.remove('correct');
  }
  if (userWins === 5) {
    score.textContent = 'You won! :)';
    removeEventListeners();
    playAgain.style.display = 'block';
  } else if (compWins === 5) {
    score.textContent = 'You lost! :(';
    removeEventListeners();
    playAgain.style.display = 'block';
  }
}

function game() {
  playAgain.style.display = 'none';
  userWins = 0;
  compWins = 0;
  userScore.textContent = 'Score: 0';
  compScore.textContent = 'Score: 0';
  result.textContent = 'First Person to 5 Wins!\nGood Luck!';
  score.textContent = '';
  userRock.classList.remove('correct');
  userPaper.classList.remove('correct');
  userScissors.classList.remove('correct');
  compRock.classList.remove('correct');
  compPaper.classList.remove('correct');
  compScissors.classList.remove('correct');
  const playRoundGenerator = (playerSelection) => () => playRound(playerSelection);
  options.forEach((option) => {
    playRoundUserCall[option] = playRoundGenerator(option);
    optionsElements[option].addEventListener('click', playRoundUserCall[option]);
  });
}

playAgain.addEventListener('click', game);

game();
