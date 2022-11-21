import { getList, createTodo, state } from '../utils';
import { todoForm, todoList } from '../components';
import { syncState, todoListTool } from '../features';

export default async () => {
  const headerEl = document.querySelector('header');

  todoForm('header', 'form-wrapper');

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
