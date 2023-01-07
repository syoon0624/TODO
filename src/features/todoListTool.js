import { editTodo, deleteTodo, deleteState, restoreState, setStateDo, setStateTitle, setStateTrash } from '../utils';
import { formatDate } from './formatDate';

// 완료하기-미완료하기 토글 버튼 핸들링
const doneButtonHandle = (event) => {
  const doneListWrapperEl = document.querySelector('.done-list-wrapper > ul');
  const notDoneListWrapperEl = document.querySelector('.not-done-list-wrapper > ul');
  const targetEl = event.target;
  const liWrap = targetEl.closest('.todo-li');
  const titleWrap = liWrap.querySelector('.title-wrap');
  const { value } = liWrap.querySelector('.edit-form > .edit');

  // 완료 여부 확인
  const isDone = targetEl.classList.contains('done');
  if (!isDone) {
    // 미완료 -> 완료
    // 영역간 이동
    if (doneListWrapperEl !== null) doneListWrapperEl.insertBefore(liWrap, doneListWrapperEl.firstChild);
    else if (notDoneListWrapperEl !== null) liWrap.remove();

    targetEl.classList.add('done');
    titleWrap.classList.add('done');
  } else {
    // 완료 -> 미완료
    // 영역간 이동
    if (notDoneListWrapperEl !== null) notDoneListWrapperEl.insertBefore(liWrap, notDoneListWrapperEl.firstChild);
    else if (doneListWrapperEl !== null) {
      liWrap.remove();
    }

    targetEl.classList.remove('done');
    titleWrap.classList.remove('done');
  }
  // state 갱신
  setStateDo(liWrap.id, formatDate(), isDone);
  // 날짜 갱신
  liWrap.querySelector('.date > p > span').textContent = formatDate();

  // 서버로 데이터 전송
  editTodo(liWrap.id, value, !isDone);
};

// 수정하기 버튼 핸들링
const editButtonHandle = (event) => {
  const targetEl = event.target;
  const liWrapEl = event.target.closest('.todo-li');
  const done = liWrapEl.querySelector('.title-wrap').classList.contains('done');
  const titleEl = liWrapEl.querySelector('.edit-form > .edit');

  // 수정하기 버튼 <-> 닫기 버튼 Toggle
  if (targetEl.textContent === '닫기') {
    targetEl.textContent = '수정하기';
    titleEl.classList.add('edit');
    titleEl.disabled = true;
    console.log(titleEl.value);

    // 날짜 갱신
    liWrapEl.querySelector('.date > p > span').textContent = formatDate();
    // state 값 갱신
    setStateTitle(liWrapEl.id, titleEl.value, formatDate());
    // 서버로 보내기
    editTodo(liWrapEl.id, titleEl.value, done);
  } else if (targetEl.textContent === '수정하기') {
    targetEl.textContent = '닫기';
    titleEl.disabled = false;
    // 복원하기
  } else {
    restoreState(liWrapEl.id);
    editTodo(liWrapEl.id, titleEl.value, done);
    liWrapEl.remove();
  }
};

// 삭제하기 버튼 핸들링
const deleteButtonHandle = (event) => {
  const liWrapEl = event.target.closest('.todo-li');
  const titleEl = liWrapEl.querySelector('.edit-form > .edit');
  const done = liWrapEl.querySelector('.title-wrap').classList.contains('done');
  if (location.pathname === '/trash') {
    // 완전 삭제
    deleteState(liWrapEl.id);
    deleteTodo(liWrapEl.id);
  } else {
    // 임시 삭제
    setStateTrash(liWrapEl.id);
    editTodo(liWrapEl.id, titleEl.value, done, 99);
  }

  liWrapEl.remove();
};

// 각 list 마다 글 수정하기, 완료하기, 삭제하기 버튼 활성화
const todoListTool = (list) => {
  list.forEach((ele) => {
    const toolEl = ele.querySelector('.tool-wrap');
    [...toolEl.children].forEach((e) => {
      switch (e.dataset.category) {
        // 완료하기 버튼
        case 'done':
          const buttonEl = e.querySelector('.done-button');
          if (location.pathname !== '/trash') {
            buttonEl.onclick = doneButtonHandle;
          }
          break;

        // 수정하기 버튼
        case 'edit':
          e.onclick = editButtonHandle;
          break;

        // 삭제하기 버튼
        case 'delete':
          e.onclick = deleteButtonHandle;
          break;

        default:
          break;
      }
    });
  });
  return true;
};

export { todoListTool };
