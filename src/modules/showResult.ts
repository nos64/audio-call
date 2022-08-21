// import { startGame } from '../index';
import { getWord } from './api';
import { Words } from './types';
import '../img/audio.svg';

/** Показать результат */
export const showResult = (countWin: Words[], countLose: Words[], wordBox: HTMLElement) => {
  const block = document.createElement('div');
  block.className = 'result-wrapper';

  const correctDiv = document.createElement('div');
  correctDiv.className = 'correct-div';

  const correctTitle = document.createElement('h2');
  correctTitle.className = 'correct-result__title';
  correctTitle.textContent = 'Правильные ответы';

  const currectUl = document.createElement('ul');
  countWin.forEach(async (word) => {
    const li = document.createElement('li');
    li.className = 'correct-li';
    const audio = new Audio();
    audio.src = `http://localhost:27017/${(await getWord(word.id)).data.audio}`;
    audio.currentTime = 0;
    const audioButton = document.createElement('button');
    audioButton.className = 'audio-button-card';
    audioButton.innerHTML = '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
    audioButton.addEventListener('click', () => audio.play());

    const rightWord = document.createElement('span');
    rightWord.textContent = `Слово - ${(await getWord(word.id)).data.word}`;
    const translate = document.createElement('span');
    translate.textContent = `Перевод - ${(await getWord(word.id)).data.wordTranslate}`;
    const transcription = document.createElement('span');
    transcription.textContent = `Транскрипция - ${(await getWord(word.id)).data.transcription}`;
    li.append(audioButton, rightWord, translate, transcription);
    currectUl.append(li);
  });

  const uncorrectDiv = document.createElement('div');
  uncorrectDiv.className = 'uncorrect-div';

  const uncorrectTitle = document.createElement('h2');
  uncorrectTitle.className = 'uncorrect-result__title';
  uncorrectTitle.textContent = 'Не правильные ответы';

  const uncorrectUl = document.createElement('ul');
  countLose.forEach(async (word) => {
    const li = document.createElement('li');
    li.className = 'correct-li';
    const audio = new Audio();
    audio.src = `http://localhost:27017/${(await getWord(word.id)).data.audio}`;
    audio.currentTime = 0;
    const audioButton = document.createElement('button');
    audioButton.className = 'audio-button-card';
    audioButton.innerHTML = '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';
    audioButton.addEventListener('click', () => audio.play());

    const rightWord = document.createElement('span');
    rightWord.textContent = `Слово - ${(await getWord(word.id)).data.word}`;
    const translate = document.createElement('span');
    translate.textContent = `Перевод - ${(await getWord(word.id)).data.wordTranslate}`;
    const transcription = document.createElement('span');
    transcription.textContent = `Транскрипция - ${(await getWord(word.id)).data.transcription}`;
    li.append(audioButton, rightWord, translate, transcription);
    uncorrectUl.append(li);
  });
  const btnsDiv = document.createElement('div');
  btnsDiv.className = 'buttons-wrapper';

  const newGameBtn = document.createElement('button');
  newGameBtn.className = 'new-game-btn';
  newGameBtn.textContent = 'Новая игра';

  const inTextbookBtn = document.createElement('button');
  inTextbookBtn.className = 'in-textbook-btn';
  inTextbookBtn.textContent = 'К учебнику';

  correctDiv.append(correctTitle, currectUl);
  uncorrectDiv.append(uncorrectTitle, uncorrectUl);
  btnsDiv.append(newGameBtn, inTextbookBtn);
  block.append(correctDiv, uncorrectDiv, btnsDiv);
  return wordBox.append(block);
};
