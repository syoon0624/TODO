import { option, todoList } from '../components';
import { getList, state } from '../utils';
import swapList from './swapList';
import syncState from './syncState';
import todoListTool from './todoListTool';

// 요소 렌더링
export default async () => {
  const { pathname } = location;
  const list = await getList();
  syncState(list);
  switch (pathname) {
    case '/done':
      todoList('.done-list-wrapper', state.doneList);
      break;
    case '/notdone':
      todoList('.not-done-list-wrapper', state.notDoneList);
      break;
    default:
      todoList('.done-list-wrapper', state.doneList);
      todoList('.not-done-list-wrapper', state.notDoneList);
      break;
  }

  const editList = document.querySelectorAll('.todo-li');
  todoListTool(editList);

  const ulEl = document.querySelectorAll('.todo-ul');

  ulEl.forEach((ele) => {
    swapList(ele, editList);
  });

  // 옵션 렌더링
  option('.option-wrap');

  const optionEl = document.querySelector('.option-wrap');
  optionEl.addEventListener('click', () => {
    const optionUlEl = document.querySelector('.option-ul');
    state.optionToggle
      ? optionUlEl.classList.remove('hidden')
      : optionUlEl.classList.add('hidden');
    state.optionToggle = !state.optionToggle;
  });
};
