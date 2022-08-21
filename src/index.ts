import { AxiosResponse } from 'axios';
import './index.html';
import './index.scss';
import { renderPage } from './modules/renderPage';
import {
  getWords,
  getWord,
} from './modules/api';
import { Words } from './modules/types';
import './img/audio.svg';

document.body.innerHTML = renderPage();

const wrapper: HTMLElement | null = document.querySelector('.wrapper');
const selection = document.querySelector('.selection');
const audioWrapper: HTMLElement | null = document.querySelector('.audio-wrapper');
const audioTitle: HTMLElement | null = document.querySelector('.audio__title');

/** Получить рандомную страницу при выборе сложности */
const getRandomPage = () => Math.floor(Math.random() * 30);

/** Перемешать массив с ответами */
const shuffle = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
/** Скрыть элемент */
const hideElem = (elem: HTMLElement) => {
  let opacity = +getComputedStyle(elem).getPropertyValue('opacity');

  const animation = () => {
    opacity -= 0.05;
    elem.style.opacity = String(opacity);

    if (opacity > 0) {
      requestAnimationFrame(animation);
    } else {
      elem.style.display = 'none';
      // if (cb) cb();
    }
  };

  requestAnimationFrame(animation);
};

/** Показать элемент */
// const showElem = (elem: HTMLElement) => {
//   let opacity = 0;
//   elem.style.opacity = String(opacity);
//   elem.style.display = '';

//   const animation = () => {
//     opacity += 0.05;
//     elem.style.opacity = String(opacity);

//     if (opacity < 1) {
//       requestAnimationFrame(animation);
//     }
//   };
//   requestAnimationFrame(animation);
// };

/** Показ карточки в случае верного ответа */
const renderWordCard = async (word: Words) => {
  const divCard = document.createElement('div');
  divCard.className = 'card-wrapper';
  const imgWrapper = document.createElement('div');
  imgWrapper.className = 'img-card';
  const img = document.createElement('img');
  img.src = `http://localhost:27017/${(await getWord(word.id)).data.image}`;
  imgWrapper.append(img);

  const audio = new Audio();
  audio.src = `http://localhost:27017/${(await getWord(word.id)).data.audio}`;
  audio.currentTime = 0;
  const audioButton = document.createElement('button');
  audioButton.className = 'audio-button-card';
  audioButton.innerHTML = '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';

  audioButton.addEventListener('click', () => audio.play());

  const rightWord = document.createElement('p');
  rightWord.textContent = `Слово - ${(await getWord(word.id)).data.word}`;
  const translate = document.createElement('p');
  translate.textContent = `Перевод - ${(await getWord(word.id)).data.wordTranslate}`;

  const transcription = document.createElement('p');
  transcription.textContent = `Транскрипция - ${(await getWord(word.id)).data.transcription}`;
  divCard.append(imgWrapper, audioButton, rightWord, translate, transcription);
  return divCard;
};

/** Массив с 600 словами из выбранной сложности */
const allWords: string[] = [];
// eslint-disable-next-line max-len
const getRandomTranslate = () => allWords[Math.floor(Math.random() * allWords.length)];

/** Рендер слова */
const renderWords = (words: AxiosResponse<Words[]>) => {
  if (audioWrapper) hideElem(audioWrapper);
  if (audioTitle) hideElem(audioTitle);

  const wordBox: HTMLDivElement = document.createElement('div');
  wordBox.className = 'word-box';
  wrapper?.append(wordBox);

  /** Счетчик показанных слов */
  let wordsCount = 0;

  /** Счетчики выигрышей / проигрышей */
  const countWin: Words[] = [];
  const countLose: Words[] = [];

  /** Показать результат */
  const showResult = () => {
    const block = document.createElement('div');
    block.className = 'result-wrapper';
    const correctDiv = document.createElement('div');
    correctDiv.textContent = 'Правильные ответы';
    correctDiv.className = 'correct-div';
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
    uncorrectDiv.textContent = 'Не правильные ответы';
    uncorrectDiv.className = 'correct-div';
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

    correctDiv.append(currectUl);
    uncorrectDiv.append(uncorrectUl);
    block.append(correctDiv, uncorrectDiv);
    return wordBox.append(block);
  };

  /** Показ слов */
  const showWord = async () => {
    const word = words.data[wordsCount];
    wordsCount += 1;
    // console.log('word: ', word);

    wordBox.textContent = '';

    /** Заполняем массив сослучайными ответами */
    const answesArray: Set<string> = new Set();
    answesArray.add(word.wordTranslate); // Помещаем правильный ответ
    while (answesArray.size !== 5) {
      answesArray.add(getRandomTranslate());
    }

    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-wrapper';
    questionDiv.dataset.count = `${wordsCount}/${words.data.length}`;

    const audio = new Audio();
    audio.src = `http://localhost:27017/${(await getWord(word.id)).data.audio}`;
    audio.currentTime = 0;
    audio.autoplay = true;
    const audioButton = document.createElement('button');
    audioButton.className = 'audio-button';
    audioButton.innerHTML = '<svg class="mui-svg-icon-root jss163" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path></svg>';

    audioButton.addEventListener('click', () => audio.play());

    const ul = document.createElement('ul');
    ul.className = 'answer-buttons__list';
    shuffle(Array.from(answesArray)).forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'answer-button__item';
      li.dataset.translate = item;
      const btn: HTMLButtonElement = document.createElement('button');
      btn.className = 'answer-button';
      btn.dataset.translate = item;
      btn.textContent = `${index + 1}. ${item}`;

      li.append(btn);
      ul.append(li);
    });
    const mainBtn = document.createElement('button');
    mainBtn.className = 'main-button';
    mainBtn.textContent = 'Не знаю';

    questionDiv.append(audio, audioButton, ul, mainBtn);
    wordBox.append(questionDiv);

    /** Обработка кликов по ответам */
    ul.addEventListener('click', async (e) => {
      if (e.target && e.target instanceof HTMLElement) {
        if (e.target.classList.contains('answer-button')) {
          if (e.target.dataset.translate === word.wordTranslate) {
            questionDiv.append(await renderWordCard(word));
            mainBtn.textContent = '➙';
            countWin.push(word);
          } else {
            mainBtn.textContent = '➙';
            countLose.push(word);
            if (countLose.length === 5) {
              wordBox.textContent = '';
              showResult();
            }
          }
        }
      }
    }, { once: true });
    mainBtn.addEventListener('click', () => {
      if (mainBtn.textContent === 'Не знаю') {
        countLose.push(word);
        if (countLose.length === 5) {
          wordBox.textContent = '';
          showResult();
        }
        mainBtn.textContent = '➙';
      } else if (mainBtn.textContent === '➙') {
        if (wordsCount < words.data.length) {
          showWord();
        } else {
          wordBox.textContent = '';
          showResult();
        }
      }
    });
  };
  /** Показать первый вопрос */
  showWord();
};

selection?.addEventListener('click', async (e) => {
  if (e.target && e.target instanceof HTMLElement) {
    if (e.target.classList.contains('selection__btn') && e.target.textContent) {
      const words = await getWords(+e.target.textContent - 1, getRandomPage());

      const allWordsInGroup: AxiosResponse<Words[]>[] = [];
      for (let i = 0; i <= 29; i++) {
        // eslint-disable-next-line no-await-in-loop
        allWordsInGroup.push(await getWords(+e.target.textContent - 1, i));
      }
      // eslint-disable-next-line max-len
      allWordsInGroup.flat().map((item) => item.data.forEach((i) => allWords.push(i.wordTranslate)));

      renderWords(words);
    }
  }
});

// const saveResult = (result, id) => {
//   localStorage.setItem(id, result);
// };

// const loadResult = id => localStorage.getItem(id)
