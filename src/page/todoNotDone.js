import { renderList } from '../features';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    <div class="list-wrap">
      <p>미완료 TODO</p>
      <div class="not-done-list-wrapper"></div>
    </div>
  `;

  // TO-DO list 불러오기 및 렌더링
  renderList();

  return;
};
