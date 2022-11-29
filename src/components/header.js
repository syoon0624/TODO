import { getList, createTodo, state, Loaders } from '../utils';
import { todoForm, todoList, nav } from '.';
import { renderList, swapList, syncState, todoListTool } from '../features';

export default async () => {
  const headerEl = document.querySelector('header');
  headerEl.innerHTML += `
  <div class="head-wraper">
    <div class="logo-wrapper">
      <a href="/">TO-DO App</a>
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

  const { pathname } = location;
  let navEl = document.querySelector('#home > a');
  // 현재 page에 따른 nav 상태 표시
  switch (pathname) {
    case '/':
      navEl.style.color = 'black';
      navEl = document.querySelector('#home > a');
      navEl.style.color = 'orange';
      break;
    case '/done':
      navEl.style.color = 'black';
      navEl = document.querySelector('#done > a');
      navEl.style.color = 'orange';
      break;
    case '/notdone':
      navEl.style.color = 'black';
      navEl = document.querySelector('#notdone > a');
      navEl.style.color = 'orange';
      break;
    case '/trash':
      navEl.style.color = 'black';
      navEl = document.querySelector('#trash > a');
      navEl.style.color = 'orange';
      break;
    default:
      break;
  }

  // todo Post
  await formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loader = new Loaders({
      el: '.loading',
    });
    loader.start();

    const data = inputEl.value;
    await createTodo(data);
    inputEl.value = '';

    renderList();
    loader.stop();
  });
};
