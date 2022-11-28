import { todoList } from '../components';
import { renderList } from '../features';
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

  const optionEl = document.querySelectorAll('.option-li');
  optionEl.forEach((ele) => {
    ele.addEventListener('click', () => {
      switch (ele.id) {
        case 'default':
          todoList('.list-wrap', state.list);
          break;
        case 'newest':
          // 깊은 복사
          state.sortedList = JSON.parse(JSON.stringify(state.list));
          state.sortedList.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            if (a.updatedAt === b.updatedAt) return 0;
          });
          todoList('.list-wrap', state.sortedList);
          break;
        case 'oldest':
          // 깊은 복사
          state.sortedList = JSON.parse(JSON.stringify(state.list));
          state.sortedList.sort((a, b) => {
            if (b.updatedAt < a.updatedAt) return 1;
            if (b.updatedAt > a.updatedAt) return -1;
            if (b.updatedAt === a.updatedAt) return 0;
          });
          todoList('.list-wrap', state.sortedList);
          break;
        case 'filter':
          const listEl = document.querySelector('.list-wrap');
          listEl.innerHTML = /* html */ `
            <p>미완료 TODO</p>
              <div class="not-done-list-wrapper"></div>
              <p>완료 TODO</p>
            <div class="done-list-wrapper"></div>
          `;
          todoList('.done-list-wrapper', state.doneList);
          todoList('.not-done-list-wrapper', state.notDoneList);
          break;
        default:
          break;
      }
    });
  });

  return;
};
