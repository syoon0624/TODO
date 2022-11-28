import { todoList } from '../components';
import { state } from '../utils';
import { swapSetting } from './renderList';

export default (className, list) => {
  const optionEl = document.querySelectorAll('.option-li');
  optionEl.forEach((ele) => {
    ele.addEventListener('click', () => {
      switch (ele.id) {
        case 'default':
          todoList(className, list);
          break;
        case 'newest':
          // 깊은 복사
          state.sortedList = JSON.parse(JSON.stringify(list));
          state.sortedList.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            if (a.updatedAt === b.updatedAt) return 0;
          });
          todoList(className, state.sortedList);
          swapSetting();
          break;
        case 'oldest':
          // 깊은 복사
          state.sortedList = JSON.parse(JSON.stringify(list));
          state.sortedList.sort((a, b) => {
            if (b.updatedAt < a.updatedAt) return 1;
            if (b.updatedAt > a.updatedAt) return -1;
            if (b.updatedAt === a.updatedAt) return 0;
          });
          todoList(className, state.sortedList);
          swapSetting();
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
          swapSetting();
          break;
        default:
          break;
      }
    });
  });
};
