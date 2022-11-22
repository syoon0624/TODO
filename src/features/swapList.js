import { editTodo } from '../utils';
import reorderList from './reorderList';

const getDragAfterElement = (ul, y) => {
  const draggableElements = [...ul.querySelectorAll('.todo-li:not(.dragging)')];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

export default (ul, list) => {
  const doneListWrapperEl = document.querySelector('.done-list-wrapper');
  const notDoneListWrapperEl = document.querySelector('.not-done-list-wrapper');

  list.forEach((ele) => {
    ele.addEventListener('dragstart', () => {
      ele.classList.add('dragging');
    });

    ele.addEventListener('dragend', (e) => {
      const title = ele.firstElementChild.firstElementChild.textContent;

      const buttonEl = ele.lastElementChild.firstElementChild.firstElementChild;
      const titleWrapEl = ele.firstElementChild;

      // 완료 영역으로 드롭 시 상태 변화
      if (doneListWrapperEl && doneListWrapperEl.contains(ele)) {
        // 중복 방지(무분별한 API 호출 방지)
        if (buttonEl.textContent === '완료하기') {
          buttonEl.textContent = '취소하기';
          titleWrapEl.classList.add('done');
          doneListWrapperEl.insertBefore(ele, doneListWrapperEl.firstChild);
          editTodo(ele.id, title, true);
        }
      }

      // 미완료 영역으로 드롭 시 상태 변화
      if (notDoneListWrapperEl && notDoneListWrapperEl.contains(ele)) {
        // 중복 방지(무분별한 API 호출 방지)
        if (buttonEl.textContent === '취소하기') {
          buttonEl.textContent = '완료하기';
          titleWrapEl.classList.remove('done');
          notDoneListWrapperEl.insertBefore(
            ele,
            notDoneListWrapperEl.firstChild
          );
          editTodo(ele.id, title, false);
        }
      }

      ele.classList.remove('dragging');
    });
  });

  ul.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(ul, e.clientY);
    //console.log(afterElement);
    const draggable = document.querySelector('.dragging');
    if (afterElement === undefined) {
      ul.appendChild(draggable);
    } else {
      ul.insertBefore(draggable, afterElement);
    }
    reorderList();
  });
};
