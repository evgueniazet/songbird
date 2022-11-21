import { birdsData } from './data.js';

const tabs = [...document.querySelectorAll('.question')];
// let answerButtons = [...document.querySelectorAll('.answer')];
// const answers = document.querySelector('.answers');
// const answersClone = answers.cloneNode(true);
// let answerButtons = [...document.querySelectorAll('.answer')];
// const answerText = [...document.querySelectorAll('.answer-text')];
const descriptionDefault = document.querySelector('.description-default');
const descriptionCard = document.querySelector('.description-card');
const descriptionTitle = document.querySelector('.description-title');
const descriptionEnglishTitle = document.querySelector('.description-english-title');
const descriptionText = document.querySelector('.description-text');
const descriptionImg = document.querySelector('.description-img');
const descriptionAudio = document.querySelector('.description-audio');
const currentImg = document.querySelector('.current-question-img');
const currentTitle = document.querySelector('.current-question-title');
const currentAudio = document.querySelector('.current-question-audio');
const audioCorrect = new Audio('sound/sucsess-sound.mp3');
const audioWrong = new Audio('sound/pole_letter_wrong.mp3');
const nextLevelButton = document.querySelector('.next-level');
const scoreGame = document.querySelector('.score');

let activeTabIndex = 0;
let correctAnswerFinded = false;
let scoreWrighth = 0;


const updateTabs = (activeTab) => {
  tabs.forEach((tab, index) => {
    if (activeTab === index) {
      tab.classList.add('question-active');
    } else {
      tab.classList.remove('question-active');
    }
  })
};

const saveResult = (scoreWrighth) => {
  localStorage.setItem('Result', scoreWrighth);
};

const countScore = () => {  
  const answerWrong = [...document.querySelectorAll('.answer-wrong')];
  let score = 5 - answerWrong.length; 
  scoreWrighth = scoreWrighth + score;  
  scoreGame.innerText = 'Score : ' + scoreWrighth;
  return scoreWrighth;
};

const updateDescription = (descriptionItem, isDefaultHidden) => {
  if (isDefaultHidden) {
    descriptionDefault.style.display = 'none';
    descriptionCard.style.display = 'block';
    descriptionTitle.innerText = descriptionItem.name;
    descriptionEnglishTitle.innerText = descriptionItem.species;
    descriptionText.innerText = descriptionItem.description;
    descriptionImg.src = descriptionItem.image;
    descriptionAudio.src = descriptionItem.audio;
  } else {
    descriptionDefault.style.display = 'block';
    descriptionCard.style.display = 'none';
  }
};

const updateAnswers = (activeTab, correctAnswer, data) => {
  const answers = document.querySelector('.answers');
  const answersClone = answers.cloneNode(true);
  answers.parentNode.replaceChild(answersClone, answers);
  const answerButtons = [...answersClone.querySelectorAll('.answer')];

  answerButtons.forEach((answer, idx) => {
    const answerText = answer.querySelector('.answer-text');

    answer.classList.remove('answer-correct');
    answer.classList.remove('answer-wrong');

    answerText.innerText = data[activeTab][idx].name;

    answer.addEventListener('click', (event) => {
      updateDescription(birdsData[activeTab][idx], true);
      const text = event.currentTarget.querySelector('span').innerText;
      console.log('text', text, correctAnswer.name);
      console.log('correctAnswerFinded', correctAnswerFinded);

      if (text !== correctAnswer.name) {
        if (!correctAnswerFinded) {
          answer.classList.add('answer-wrong');
          audioWrong.play();
        }
      } else {
        correctAnswerFinded = true;

        nextLevelButton.disabled = false;
        nextLevelButton.classList.add('next-level-active');

        answer.classList.add('answer-correct');
        // answer.classList.remove('answer-wrong');

        currentImg.src = birdsData[activeTab][idx].image;
        currentTitle.innerText = birdsData[activeTab][idx].name;
        audioCorrect.play();
        currentAudio.pause();


        countScore();
        saveResult(scoreWrighth);

      }
    })
  })
};

const resetCurrentQuestion = (correctAnswerAudio) => {
  currentImg.src = 'img/bird.jpg';
  currentTitle.innerText = '******';
  currentAudio.src = correctAnswerAudio;
};

const createAnswer = (data, activeTabIndex) => {
  const birdsArray = data[activeTabIndex];
  const randomIndex = Math.floor(Math.random() * (birdsArray.length - 1));
  const correctAnswer = birdsArray[randomIndex];

  return correctAnswer;
};

const randomCorrectAnswer = createAnswer(birdsData, activeTabIndex);
nextLevelButton.disabled = true;
console.log('randomCorrectAnswer', randomCorrectAnswer.name);

updateTabs(activeTabIndex);
updateDescription(null, false);
updateAnswers(activeTabIndex, randomCorrectAnswer, birdsData);
resetCurrentQuestion(randomCorrectAnswer.audio);





nextLevelButton.addEventListener('click', () => {
  nextLevelButton.classList.remove('next-level-active');
  nextLevelButton.disabled = true;
  correctAnswerFinded = false;

 


  if (activeTabIndex < 5) {
    activeTabIndex = activeTabIndex + 1;
  } else {
    window.location.href = '../ResultsPage/results.html';
  }


  // tabs[indexNextButton].click();
  // activeTabIndex = activeTabIndex + 1;

  updateTabs(activeTabIndex);
  const randomCorrectAnswer = createAnswer(birdsData, activeTabIndex);
  console.log('randomCorrectAnswer', randomCorrectAnswer.name);
  updateAnswers(activeTabIndex, randomCorrectAnswer, birdsData);
  updateDescription(null, false);
  resetCurrentQuestion(randomCorrectAnswer.audio);
});


// localStorage.setItem('user', user);

// localStorage.setItem('user', JSON.stringify(user));