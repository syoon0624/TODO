import { state } from '../utils';

export default (data) => {
  // 초기화
  state.doneList = [];
  state.notDoneList = [];
  state.list = data;

  // 데이터 넣기
  data.forEach((ele) => {
    state.ids.push(ele.id);
    if (ele.done === true) {
      state.doneList.push(ele);
    } else {
      state.notDoneList.push(ele);
    }
  });
};

export const setStateTitle = (id, value) => {
  const arr = state.list[state.list.findIndex((k) => k.id === id)];
  arr.title = value;
  arr.done
    ? (state.doneList[state.doneList.findIndex((k) => k.id === id)].title =
        value)
    : (state.notDoneList[
        state.notDoneList.findIndex((k) => k.id === id)
      ].title = value);
};

export const setStateDone = (id) => {
  const arr = state.list[state.list.findIndex((e) => e.id === id)];
  arr.done = !arr.done;
  state.doneList.push(arr);
  state.notDoneList.splice(
    state.notDoneList.findIndex((e) => e.id === id),
    1
  );
};

export const setStateNotDone = (id) => {
  const arr = state.list[state.list.findIndex((e) => e.id === id)];
  arr.done = !arr.done;
  state.notDoneList.push(arr);
  state.doneList.splice(
    state.doneList.findIndex((e) => e.id === id),
    1
  );
};
