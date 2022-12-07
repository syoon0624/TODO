import { todoList, trashList } from '../components';
import { getList, state } from '../utils';
import swapList from './swapList';
import syncState from './syncState';
import todoListTool from './todoListTool';

export const swapSetting = () => {
  const editList = document.querySelectorAll('.todo-li');
  todoListTool(editList);

  const ulEl = document.querySelectorAll('.todo-ul');

  ulEl.forEach((ele) => {
    swapList(ele, editList);
  });
};

// 요소 렌더링
export default async () => {
  const { pathname } = location;
  const list = await getList();
  // 비동기 처리를 꼭 해주어야 한다.
  await syncState(list);
  switch (pathname) {
    case '/done':
      todoList('.done-list-wrapper', state.doneList);
      break;
    case '/notdone':
      todoList('.not-done-list-wrapper', state.notDoneList);
      break;
    case '/trash':
      trashList('.list-wrap', state.trashList);
      break;
    default:
      todoList('.list-wrap', state.list);
      break;
  }

  swapSetting();
};
