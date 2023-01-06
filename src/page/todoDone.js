import { renderList, renderOption } from '../features';
import { Loaders, store } from '../utils';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    <div class="option-wrap">
      <strong>Option</strong>
    </div>
    <div class="list-wrap">
      <p>완료 TODO</p>
      <div class="done-list-wrapper"></div>
    </div>
  `;

  const loader = new Loaders({
    el: '.loading',
  });
  loader.start();
  // TO-DO list 불러오기 및 렌더링
  await renderList();

  // Option 기능
  renderOption('.done-list-wrapper', store.getState().doneList);
  loader.stop();
  return;
};
