import { getWord } from './api';
import { baseURL, Words } from './types';

/** Показ карточки в случае верного ответа */
export const renderCorrectWordCard = async (word: Words) => {
  const divCard = document.createElement('div');
  divCard.className = 'card-wrapper';
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'img-card';
  const img = document.createElement('img');
  img.src = `${baseURL}/${(await getWord(word.id)).data.image}`;
  img.className = 'word-img';
  imgWrapper.append(img);

  const audio = new Audio();
  audio.src = `${baseURL}/${(await getWord(word.id)).data.audio}`;
  audio.currentTime = 0;
  const audioButton = document.createElement('button');
  audioButton.className = 'audio-button-card';
  audioButton.innerHTML = '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';

  audioButton.addEventListener('click', () => audio.play());

  const rightWord = document.createElement('p');
  rightWord.textContent = `${(await getWord(word.id)).data.word}`;
  const translate = document.createElement('p');
  translate.textContent = `${(await getWord(word.id)).data.wordTranslate}`;

  // const transcription = document.createElement('p');
  // transcription.textContent = `Транскрипция - ${(await getWord(word.id)).data.transcription}`;
  divCard.append(imgWrapper, audioButton, rightWord, translate);
  return divCard;
};
