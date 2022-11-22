import './scss/main.scss';
import main from './page/main.js';
import todoDone from './page/todoDone';
import todoNotDone from './page/todoNotDone';

// 랜더 함수
const renderPage = () => {
  const { pathname } = window.location;
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
    default:
      alert('잘못된 주소 링크입니다!');
      window.history.pushState(undefined, '메인', '/');
      location.reload();
  }
};

// 초기 실행
(() => {
  window.addEventListener('popstate', () => {
    renderPage();
  });
  renderPage();
})();
