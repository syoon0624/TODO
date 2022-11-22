import { getList, createTodo, state } from '../utils';
import { todoForm, todoList, nav } from '.';
import { syncState, todoListTool } from '../features';

export default async () => {
  const headerEl = document.querySelector('header');
  headerEl.innerHTML += `
  <div class="head-wraper">
    <div class="logo-wrapper">
      <p>TO-DO App</p>
    </div>
    <div class="form-wrapper">
    </div>
    <div class="nav-bar-wrapper">
    </div>
  </div>
  `;

  todoForm('.form-wrapper');
  nav('.nav-bar-wrapper');

  const formEl = document.querySelector('.todo-form');
  const inputEl = document.querySelector('input');

  // todo Post
  await formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = inputEl.value;
    await createTodo(data);
    inputEl.value = '';

    // Post 후 재 렌더링
    const list = await getList();
    syncState(list);
    todoList('.done-list-wrapper', state.doneList);
    todoList('.not-done-list-wrapper', state.notDoneList);
    const editList = document.querySelectorAll('.todo-li');
    todoListTool(editList);
  });
};
