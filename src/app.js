import './scss/main.scss';
import main from './page/main.js';
import todoDone from './page/todoDone';
import todoNotDone from './page/todoNotDone';
import { header } from './components';
import trash from './page/trash';
import { initialState, store, actionCreator } from './utils';

// 랜더 함수
const renderPage = () => {
  header();
  const { pathname } = window.location;
  console.log(pathname);
  switch (pathname) {
    case '/':
      main();
      break;
    case '/done':
      todoDone();
      break;
    case '/notdone':
      todoNotDone();
      break;
    case '/trash':
      trash();
      break;
    default:
      alert('잘못된 주소 링크입니다!');
      window.history.pushState(undefined, '메인', '/');
      location.reload();
  }
};

// 초기 실행
(async () => {
  const data = await initialState();
  console.log(data);
  store.dispatch(actionCreator('INIT', data));
  window.addEventListener('popstate', () => {
    renderPage();
  });
  renderPage();
})();
