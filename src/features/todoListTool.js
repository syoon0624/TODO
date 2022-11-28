import { editTodo, deleteTodo, state } from '../utils';
import formatDate from './formatDate';
import { setStateDone, setStateNotDone, setStateTitle } from './syncState';

// 각 list 마다 글 수정하기, 완료하기, 삭제하기 버튼 활성화
export default (list) => {
  const doneListWrapperEl = document.querySelector('.done-list-wrapper > ul');
  const notDoneListWrapperEl = document.querySelector(
    '.not-done-list-wrapper > ul'
  );
  list.forEach((ele) => {
    const toolEl = ele.lastElementChild;
    const titleWrapEl = ele.firstElementChild;
    const titleEl =
      ele.firstElementChild.firstElementChild.firstElementChild
        .firstElementChild;
    const done = ele.firstElementChild.classList.length === 2 ? true : false;
    [...toolEl.children].forEach((e) => {
      switch (e.className) {
        // 완료하기 버튼
        case 'done-wrap':
          let buttonEl = e.firstElementChild;
          buttonEl.addEventListener('click', () => {
            // 완료 여부 확인: 클래스리스트의 개수
            // 미완료시 1개, 완료시 2개
            if (buttonEl.classList.length === 1) {
              buttonEl.classList.add('done');
              titleWrapEl.classList.add('done');

              // state 갱신
              setStateDone(ele.id, formatDate());
              // 날짜 갱신
              titleWrapEl.lastElementChild.firstElementChild.firstElementChild.textContent =
                formatDate();

              editTodo(ele.id, titleEl.value, true);
              if (doneListWrapperEl)
                doneListWrapperEl.insertBefore(
                  ele,
                  doneListWrapperEl.firstChild
                );
              else if (notDoneListWrapperEl) ele.remove();
            } else {
              buttonEl.classList.remove('done');
              titleWrapEl.classList.remove('done');

              // state 갱신
              setStateNotDone(ele.id, formatDate());
              // 날짜 갱신
              titleWrapEl.lastElementChild.firstElementChild.firstElementChild.textContent =
                formatDate();

              editTodo(ele.id, titleEl.value, false);
              if (notDoneListWrapperEl) {
                notDoneListWrapperEl.insertBefore(
                  ele,
                  notDoneListWrapperEl.firstChild
                );
              } else if (doneListWrapperEl) ele.remove();
            }
          });
          break;

        // 수정하기 버튼
        case 'edit-button':
          e.addEventListener('click', () => {
            // 수정할 input, button을 담은 form
            const editFormEl =
              e.parentElement.parentElement.firstElementChild.firstElementChild;
            const form = editFormEl.firstElementChild;
            // 수정하기 버튼 <-> 닫기 버튼 Toggle
            if (e.textContent === '닫기') {
              e.textContent = '수정하기';
              titleEl.classList.add('edit');
              titleEl.disabled = true;

              // 날짜 갱신
              titleWrapEl.lastElementChild.firstElementChild.firstElementChild.textContent =
                formatDate();
              // state 값 갱신
              setStateTitle(ele.id, titleEl.value, formatDate());

              editTodo(ele.id, titleEl.value, done);
            } else {
              e.textContent = '닫기';
              titleEl.disabled = false;
              // console.log('수정하기 버튼', ele.id);
              form.addEventListener('submit', (event) => {
                event.preventDefault();
                const { value } = titleEl;
                // TODO 글 수정하기
                if (value === '') {
                  return;
                } else {
                  e.textContent = '수정하기';
                  titleEl.classList.remove('edit');
                  titleEl.disabled = true;
                  // state 값 갱신
                  setStateTitle(ele.id, value, formatDate());
                  // 날짜 갱신
                  titleWrapEl.lastElementChild.firstElementChild.firstElementChild.textContent =
                    formatDate();

                  editTodo(ele.id, value, done);
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
