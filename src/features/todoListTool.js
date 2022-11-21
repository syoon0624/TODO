import { editTodo, deleteTodo } from '../utils';

// 각 list 마다 글 수정하기, 완료하기, 삭제하기 버튼 활성화
export default (list) => {
  list.forEach((ele) => {
    const toolEl = ele.lastElementChild;
    const titleEl = document.querySelector(`#${ele.id} > div > p`);
    let title = titleEl.textContent;

    [...toolEl.children].forEach((e) => {
      switch (e.className) {
        // 완료하기 버튼
        case 'done-wrap':
          const buttonEl = e.firstElementChild;
          buttonEl.addEventListener('click', () => {
            if (buttonEl.textContent === '완료하기') {
              buttonEl.textContent = '취소하기';
              buttonEl.classList.remove('done');
              editTodo(ele.id, title, true);
            } else {
              buttonEl.textContent = '완료하기';
              buttonEl.classList.add('done');
              editTodo(ele.id, title, false);
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
                if (value === '') {
                  return;
                } else {
                  editTodo(ele.id, value, false);
                  ele.firstElementChild.textContent = value;
                  title = value;
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
