import './scss/main.scss';
import main from './page/main.js';
import header from './page/header.js';

// 랜더 함수
const renderPage = () => {
  const { pathname } = window.location;
  switch (pathname) {
    case '/':
      header();
      main();
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
