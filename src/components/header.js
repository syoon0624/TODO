import { createTodo, Loaders } from '../utils';
import { todoForm, nav } from '.';
import { renderList } from '../features';

const header = async () => {
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
  const anchorEls = document.querySelectorAll('.nav-li');

  // nav별 글자 색 표시
  anchorEls.forEach((anchorEl) => {
    const href = anchorEl.id;
    const aEl = anchorEl.querySelector('a');
    pathname === href ? (aEl.style.color = 'orange') : (aEl.style.color = 'black');
  });

  // todo Post
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loader = new Loaders({
      el: '.loading',
    });
    loader.start();

    const data = inputEl.value;
    if (data !== '') {
      await createTodo(data);
      inputEl.value = '';
    }

    renderList();
    loader.stop();
  });
};

export { header };
