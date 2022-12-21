import { formatDate } from '../features';
import { getList } from './fetchAPI';

// 전역 객체
const state = {
  list: [],
  doneList: [],
  notDoneList: [],
  trashList: [],
};

const setState = (key, data) => {
  state[key] = data;
};

const initialState = async () => {
  const newState = await getList();
  newState.forEach((item) => {
    item.updatedAt = formatDate(item.updatedAt);
  });

  setState(
    'list',
    newState.filter((item) => item.order !== 99)
  );
  const newDoneList = newState.filter((item) => item.done === true);
  setState('doneList', newDoneList);
  const newNotDoneList = newState.filter((item) => item.done === false);
  setState('notDoneList', newNotDoneList);
  const newTrashList = newState.filter((item) => item.order === 99);
  setState('trashList', newTrashList);
};

const setStateList = (obj) => {
  const key = obj.done ? 'doneList' : 'notDoneList';
  const deleteKey = obj.done ? 'notDoneList' : 'doneList';

  if (obj.order === 99) {
    // 휴지통으로
    setState('trashList', [...state['trashList'], obj]);
    setState(
      'list',
      state.list.filter((item) => item.id !== obj.id)
    );
    setState(
      key,
      state[key].filter((item) => item.id !== obj.id)
    );
  } else {
    setState(key, [...state[key], obj]);
    setState(
      deleteKey,
      state[deleteKey].filter((item) => item.id !== obj.id)
    );
  }
};

// 할일 문장
const setStateTitle = (id, value, date) => {
  const obj = state.list.filter((item) => item.id === id)[0];
  obj.title = value;
  obj.updatedAt = date;
};

// 완료/미완료로 바뀜 시 리스트 set
const setStateDo = (id, date) => {
  const obj = state.list.filter((item) => item.id === id)[0];
  obj.updatedAt = date;
  obj.done = !obj.done;

  setStateList(obj);
};

// 휴지통으로 보내기
const setStateTrash = (id) => {
  const obj = state.list.filter((item) => item.id === id)[0];
  obj.order = 99;
  setStateList(obj);
};

// 완전 삭제
const deleteState = (id) => {
  state.trashList.splice(findListIndex(state.trashList, id), 1);
};

// 복원하기
const restoreState = (id) => {
  const obj = state.trashList.filter((item) => item.id === id);
  arr.order = 0;
  setState('list', [...state.list, obj]);
  setStateList(obj);
};

export {
  state,
  setStateDo,
  setStateTitle,
  setStateTrash,
  restoreState,
  deleteState,
  initialState,
};
