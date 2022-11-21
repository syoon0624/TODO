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
  list.forEach((ele) => {
    ele.addEventListener('dragstart', () => {
      ele.classList.add('dragging');
    });

    ele.addEventListener('dragend', () => {
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
