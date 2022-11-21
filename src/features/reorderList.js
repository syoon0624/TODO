import { debounce, swapTodo } from '../utils';

// 재정렬된 리스트 서버에 최신화
export default debounce(() => {
  const list = document.querySelectorAll('.todo-li');
  const ids = [];

  list.forEach((ele) => {
    ids.push(ele.id);
  });

  swapTodo(ids);
}, 300);
