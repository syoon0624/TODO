import { formatDate } from '../features';
import { state } from './state';

const key = process.env.API_KEY;
const headers = {
  'content-type': 'application/json',
  apikey: key,
  username: 'KDT3_LeeSeungYoon',
};
const url = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos';

// 리스트 조회(Get)
const getList = async () => {
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers,
    });
    const json = await data.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};

// 추가(Post)
const createTodo = async (title, order = 0) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        order,
      }),
    });
    const json = await res.json();
    json.updatedAt = formatDate(json.updatedAt);
    state.list.push(json);
    state.notDoneList.push(json);
    return json;
  } catch (err) {
    console.log(err);
    return;
  }
};

// 수정(Put)
const editTodo = async (id, title, done = false, order = 0) => {
  try {
    if (title !== '') {
      const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          title,
          done,
          order,
        }),
      });
      const json = await res.json();
      return json;
    } else return;
  } catch (err) {
    console.log(err);
    return;
  }
};

// 삭제(Delete)
const deleteTodo = async (id) => {
  try {
    if (id) {
      await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers,
      });
    } else {
      console.log('빈 id');
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

// 목록 순서 변경(Put)
const swapTodo = async (todoIds) => {
  try {
    const isSame = JSON.stringify(todoIds) === JSON.stringify(state.ids);
    if (!isSame) {
      state.ids = todoIds;
      const res = await fetch(`${url}/reorder`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          todoIds,
        }),
      });
      const json = await res.json();
      return json;
    } else return;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { getList, createTodo, editTodo, deleteTodo, swapTodo };
