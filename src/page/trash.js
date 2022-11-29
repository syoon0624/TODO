import { renderList, renderOption } from '../features';
import { state } from '../utils';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += /* html */ `
    <div class="option-wrap">
      <strong>Option</strong>
    </div>
    <div class="list-wrap">
    </div>
  `;

  // TO-DO list 불러오기 및 렌더링
  await renderList();

  // Option 기능
  renderOption('.list-wrap', state.trashList);

  return;
};
