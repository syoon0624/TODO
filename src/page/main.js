import { editTodo, deleteTodo, getList } from '../utils';
import { todoList } from '../components';

export const todoListTool = (list) => {
  list.forEach((ele) => {
    // 각 list 마다 글 수정하기, 완료하기, 삭제하기 버튼 활성화
    [...ele.children].forEach((e) => {
      switch (e.className) {
        // 완료하기 버튼
        case 'done-wrap':
          const buttonEl = e.firstElementChild;
          buttonEl.addEventListener('click', () => {
            const titleEl = document.querySelector(`#${ele.id} > p`);
            if (buttonEl.textContent === '완료하기') {
              buttonEl.textContent = '취소하기';
              buttonEl.classList.remove('done');
              editTodo(ele.id, titleEl.textContent, true);
            } else {
              buttonEl.textContent = '완료하기';
              buttonEl.classList.add('done');
              editTodo(ele.id, titleEl.textContent, false);
            }
          });
          break;

        // 수정하기 버튼
        case 'edit-button':
          e.addEventListener('click', () => {
            // 수정할 input, button을 담은 form
            const editFormEl = e.nextElementSibling;
            const form = editFormEl.firstElementChild;

            // 수정하기 버튼 <-> 닫기 버튼 Toggle
            if (e.textContent === '닫기') {
              e.textContent = '수정하기';
              editFormEl.classList.add('hidden');
            } else {
              e.textContent = '닫기';
              // console.log('수정하기 버튼', ele.id);

              editFormEl.classList.remove('hidden');
              form.addEventListener('submit', (event) => {
                event.preventDefault();
                // 수정할 input 태그의 value값
                const { value } = form.firstElementChild;

                // TODO 글 수정하기
                if (value !== '') {
                  editTodo(ele.id, value, false);
                  ele.firstElementChild.textContent = value;
                  form.firstElementChild.value = '';
                }
              });
            }
          });
          break;

        // 삭제하기 버튼
        case 'delete-item':
          e.addEventListener('click', () => {
            // console.log('삭제하기 버튼');
            deleteTodo(ele.id);
            ele.remove();
          });
          break;

        default:
          break;
      }
    });
  });
  return true;
};

export default async () => {
  const mainEl = document.querySelector('main');
  mainEl.innerHTML += `
    This is main
  `;
  const listWrapperEl = document.createElement('div');
  listWrapperEl.classList.add('list-wrap');
  mainEl.append(listWrapperEl);

  // TO-DO list 불러오기 및 렌더링
  const data = await getList();
  todoList('.list-wrap', data);

  // To-do list에서 TODO 기능 사용하기
  const list = document.querySelectorAll('.todo-li');
  todoListTool(list);

  return;
};
