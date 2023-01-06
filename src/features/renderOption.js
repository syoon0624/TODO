import { option, todoList } from '../components';
import { deleteTodo, Loaders, store, deleteState } from '../utils';
import { swapSetting } from './renderList';

let optionToggle = true;

// option 항목 보여주기/숨기기
const rendering = () => {
  option('.option-wrap');
  const optionEl = document.querySelector('.option-wrap');
  optionEl.onclick = () => {
    const optionUlEl = document.querySelector('.option-ul');
    optionToggle ? optionUlEl.classList.remove('hidden') : optionUlEl.classList.add('hidden');
    optionToggle = !optionToggle;
  };
};

// 옵션별 기능
const renderOption = (className, list) => {
  rendering();
  const optionEl = document.querySelectorAll('.option-li');
  optionEl.forEach((ele) => {
    ele.onclick = async () => {
      switch (ele.id) {
        // 기본 보여주기
        case 'default':
          todoList(className, list);
          break;
        // 최신 순으로 정렬
        case 'newest':
          // 깊은 복사
          const sortedList = JSON.parse(JSON.stringify(list));
          sortedList.sort((a, b) => {
            if (a.updatedAt < b.updatedAt) return 1;
            if (a.updatedAt > b.updatedAt) return -1;
            if (a.updatedAt === b.updatedAt) return 0;
          });
          todoList(className, sortedList);
          swapSetting();
          break;
        // 오래된 순으로 정렬
        case 'oldest':
          // 깊은 복사
          try {
            const sortedList = JSON.parse(JSON.stringify(list));
            sortedList.sort((a, b) => {
              if (b.updatedAt < a.updatedAt) return 1;
              if (b.updatedAt > a.updatedAt) return -1;
              if (b.updatedAt === a.updatedAt) return 0;
            });
            todoList(className, sortedList);
            swapSetting();
            break;
          } catch {
            break;
          }
        // 완료/미완료 구분
        case 'filter':
          const listEl = document.querySelector('.list-wrap');
          listEl.innerHTML = /* html */ `
          <p>미완료 TODO</p>
            <div class="not-done-list-wrapper"></div>
            <p>완료 TODO</p>
          <div class="done-list-wrapper"></div>
        `;
          todoList('.done-list-wrapper', store.getState().doneList);
          todoList('.not-done-list-wrapper', store.getState().notDoneList);
          swapSetting();
          break;
        // 휴지통 비우기
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
    };
  });
};

export { renderOption };
