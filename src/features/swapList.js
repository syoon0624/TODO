import { editTodo, setStateDo } from '../utils';
import { formatDate } from './formatDate';
import { reorderList } from './reorderList';

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

const swapList = (ul, list) => {
  const doneListWrapperEl = document.querySelector('.done-list-wrapper');
  const notDoneListWrapperEl = document.querySelector('.not-done-list-wrapper');

  list.forEach((ele) => {
    ele.addEventListener('dragstart', () => {
      ele.classList.add('dragging');
    });

    ele.addEventListener('dragend', (e) => {
      const title = ele.querySelector('.edit').value;
      const buttonEl = ele.querySelector('.done-button');
      const titleWrapEl = ele.querySelector('.title-wrap');

      // 완료 영역으로 드롭 시 상태 변화
      if (doneListWrapperEl && doneListWrapperEl.contains(ele)) {
        const ulWrapEl = doneListWrapperEl.firstElementChild;
        // 중복 방지(무분별한 API 호출 방지)
        if (!buttonEl.classList.contains('done')) {
          buttonEl.classList.add('done');
          titleWrapEl.classList.add('done');
          ulWrapEl.insertBefore(ele, ulWrapEl.firstChild);

          // state값 갱신
          setStateDo(ele.id, formatDate(), true);
          // 날짜 갱신
          titleWrapEl.querySelector('.date > p > span').textContent = formatDate();

          // 실제 서버상의 값 갱신
          editTodo(ele.id, title, true);
        }
      }

      // 미완료 영역으로 드롭 시 상태 변화
      if (notDoneListWrapperEl && notDoneListWrapperEl.contains(ele)) {
        const ulWrapEl = notDoneListWrapperEl.firstElementChild;
        // 중복 방지(무분별한 API 호출 방지)
        if (buttonEl.classList.contains('done')) {
          buttonEl.classList.remove('done');
          titleWrapEl.classList.remove('done');
          ulWrapEl.insertBefore(ele, ulWrapEl.firstChild);

          // state값 갱신
          setStateDo(ele.id, formatDate(), false);
          // 날짜 갱신
          titleWrapEl.querySelector('.date > p > span').textContent = formatDate();
          // 실제 서버상의 값 갱신
          editTodo(ele.id, title, false);
        }
      }

      ele.classList.remove('dragging');
    });
  });

  // 모든 drag & drop이 종료 시, 아이템 이동
  ul.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(ul, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement === undefined) {
      ul.appendChild(draggable);
    } else {
      ul.insertBefore(draggable, afterElement);
    }
    reorderList();
  });
};

export { swapList };
