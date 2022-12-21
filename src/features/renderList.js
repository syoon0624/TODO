import { todoList, trashList } from '../components';
import { state } from '../utils';
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

export { swapSetting, renderList };
