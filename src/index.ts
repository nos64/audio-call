// import { AxiosResponse } from 'axios';
import './index.html';
import './index.scss';
import { renderPage } from './modules/renderPage';
import { initGame } from './modules/game';

document.body.innerHTML = renderPage();
initGame();
