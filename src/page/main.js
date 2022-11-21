import { getList, state } from '../utils';
import { todoList } from '../components';
import { swapList, syncState, todoListTool } from '../features';

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    This is main
    <div class="list-wrap">
      <div class="not-done-list-wrapper">done</div>
      <div class="done-list-wrapper">not-done</div>
    </div>
  `;

  const doneListWrapperEl = document.querySelector('.done-list-wrapper');
  const notDoneListWrapperEl = document.querySelector('.not-done-list-wrapper');
  console.log(doneListWrapperEl);
  console.log(notDoneListWrapperEl);

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
