import { state } from '../utils';
import formatDate from './formatDate';

const findListIndex = (list, id) => {
  return list.findIndex((e) => e.id === id);
};

export default async (data) => {
  // 초기화
  state.doneList = [];
  state.notDoneList = [];
  state.trashList = [];
  state.list = data;

  // 데이터 넣기
  await state.list.forEach(async (ele) => {
    state.ids.push(ele.id);
    ele.updatedAt = formatDate(ele.updatedAt);
    if (ele.done === true) {
      await state.doneList.push(ele);
    } else {
      await state.notDoneList.push(ele);
    }

    if (ele.order === 99) {
      await setStateTrash(ele.id);
    }
  });
};

// 할일 문장
export const setStateTitle = (id, value, date) => {
  const arr = state.list[findListIndex(state.list, id)];
  arr.title = value;
  arr.updatedAt = date;
};

// 완료/미완료로 바뀜 시 리스트 set
export const setStateDo = (id, date, isDone) => {
  const arr = state.list[state.list.findIndex((e) => e.id === id)];
  arr.updatedAt = date;
  arr.done = !arr.done;
  const list = isDone ? state.notDoneList : state.doneList;
  const spliceList = isDone ? state.doneList : state.notDoneList;
  list.push(arr);
  spliceList.splice(
    spliceList.findIndex((e) => e.id === id),
    1
  );
};

// 휴지통으로 보내기
export const setStateTrash = (id) => {
  const arr = state.list[findListIndex(state.list, id)];
  arr.order = 99;
  state.trashList.push(arr);
  state.list.splice(findListIndex(state.list, id), 1);
  if (arr.done) {
    state.doneList.splice(findListIndex(state.doneList, id), 1);
  } else {
    state.notDoneList.splice(findListIndex(state.notDoneList, id), 1);
  }
};

// 완전 삭제
export const deleteState = (id) => {
  state.trashList.splice(findListIndex(state.trashList, id), 1);
};

// 복원하기
export const restoreState = (id) => {
  const arr = state.trashList[findListIndex(state.trashList, id)];
  arr.order = 0;
  state.list.push(arr);
  if (arr.done) {
    state.doneList.push(arr);
  } else {
    state.notDoneList.push(arr);
  }
};
