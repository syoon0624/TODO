import { todoList, trashList } from '../components';
import { store } from '../utils';
import { swapList } from './swapList';
import { todoListTool } from './todoListTool';

// 리스트 swap 시 요소들 세팅
const swapSetting = () => {
  const editList = document.querySelectorAll('.todo-li');
  todoListTool(editList);

  const ulEl = document.querySelectorAll('.todo-ul');

  ulEl.forEach((ele) => {
    swapList(ele, editList);
  });
};

// 요소 렌더링
const renderList = async () => {
  const { pathname } = location;
  switch (pathname) {
    case '/done':
      todoList('.done-list-wrapper', store.getState().doneList);
      break;
    case '/notdone':
      todoList('.not-done-list-wrapper', store.getState().notDoneList);
      break;
    case '/trash':
      trashList('.list-wrap', store.getState().trashList);
      break;
    default:
      todoList('.list-wrap', store.getState().list);
      break;
  }

  swapSetting();
};

export { swapSetting, renderList };
