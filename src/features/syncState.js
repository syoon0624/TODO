import { state } from '../utils';
import formatDate from './formatDate';

export default (data) => {
  // 초기화
  state.doneList = [];
  state.notDoneList = [];
  state.list = data;

  // 데이터 넣기
  state.list.forEach((ele) => {
    state.ids.push(ele.id);
    ele.updatedAt = formatDate(ele.updatedAt);
    if (ele.done === true) {
      state.doneList.push(ele);
    } else {
      state.notDoneList.push(ele);
    }
  });
};

export const setStateTitle = (id, value, date) => {
  const arr = state.list[state.list.findIndex((k) => k.id === id)];
  arr.title = value;
  arr.updatedAt = date;
};

export const setStateDone = (id, date) => {
  const arr = state.list[state.list.findIndex((e) => e.id === id)];
  arr.updatedAt = date;
  arr.done = !arr.done;
  state.doneList.push(arr);
  state.notDoneList.splice(
    state.notDoneList.findIndex((e) => e.id === id),
    1
  );
};

export const setStateNotDone = (id, date) => {
  const arr = state.list[state.list.findIndex((e) => e.id === id)];
  arr.updatedAt = date;
  arr.done = !arr.done;
  state.notDoneList.push(arr);
  state.doneList.splice(
    state.doneList.findIndex((e) => e.id === id),
    1
  );
};
