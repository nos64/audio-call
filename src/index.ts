import './index.html';
import './index.scss';
import { renderPage } from './modules/renderPage';
import { initGame } from './modules/game';

export const startGame = () => {
  document.body.innerHTML = renderPage();
  initGame();
};

startGame();
