import { getList, state } from '../utils';
import { todoList } from '../components';
import { swapList, syncState, todoListTool } from '../features';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    <div class="list-wrap">
      <p>미완료 TODO</p>
      <div class="not-done-list-wrapper"></div>
      <p>완료 TODO</p>
      <div class="done-list-wrapper"></div>
    </div>
  `;

  // TO-DO list 불러오기 및 렌더링
  const data = await getList();
  syncState(data);
  todoList('.done-list-wrapper', state.doneList);
  todoList('.not-done-list-wrapper', state.notDoneList);

  // To-do list에서 TODO 기능 사용하기
  const list = document.querySelectorAll('.todo-li');
  todoListTool(list);

  const ulEl = document.querySelectorAll('.todo-ul');
  ulEl.forEach((ele) => {
    swapList(ele, list);
  });

  return;
};
