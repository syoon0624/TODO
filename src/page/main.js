import { renderList } from '../features';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += /* html */ `
    <div class="option-wrap">
      <strong>Option</strong>
    </div>
    <div class="list-wrap">
      <p>미완료 TODO</p>
      <div class="not-done-list-wrapper"></div>
      <p>완료 TODO</p>
      <div class="done-list-wrapper"></div>
    </div>
  `;

  // TO-DO list 불러오기 및 렌더링
  renderList();

  return;
};
