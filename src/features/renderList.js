import { todoList } from '../components';
import { getList, state } from '../utils';
import swapList from './swapList';
import syncState from './syncState';
import todoListTool from './todoListTool';

// Post 후 재 렌더링
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
};
