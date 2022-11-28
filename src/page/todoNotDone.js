import { renderList, renderOption } from '../features';
import { state } from '../utils';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    <div class="option-wrap">
      <strong>Option</strong>
    </div>
    <div class="list-wrap">
      <p>미완료 TODO</p>
      <div class="not-done-list-wrapper"></div>
    </div>
  `;

  // TO-DO list 불러오기 및 렌더링
  await renderList();

  // Option
  renderOption('.not-done-list-wrapper', state.notDoneList);
  return;
};
