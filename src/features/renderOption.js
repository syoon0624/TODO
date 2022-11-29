import { option, todoList } from '../components';
import { deleteTodo, Loaders, state } from '../utils';
import { swapSetting } from './renderList';
import { deleteState } from './syncState';

const rendering = () => {
  option('.option-wrap');

  const optionEl = document.querySelector('.option-wrap');
  optionEl.addEventListener('click', () => {
    console.log('클릭');
    const optionUlEl = document.querySelector('.option-ul');
    state.optionToggle
      ? optionUlEl.classList.remove('hidden')
      : optionUlEl.classList.add('hidden');
    state.optionToggle = !state.optionToggle;
  });
};

export default (className, list) => {
  rendering();
  const optionEl = document.querySelectorAll('.option-li');
  optionEl.forEach((ele) => {
    ele.addEventListener('click', async () => {
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
        case 'delete-all':
          const trashEls = document.querySelectorAll('.todo-li');
          const trashUl = document.querySelector('.todo-ul');
          const loader = new Loaders({
            el: '.loading',
          });
          loader.start();
          // 비동기 처리(순차 처리)를 위해 forEach 대신 for of 사용
          for (let ele of trashEls) {
            await deleteTodo(ele.id);
            deleteState(ele.id);
            ele.remove();
          }
          loader.stop();
          trashUl.remove();
          break;
        default:
          break;
      }
    });
  });
};
