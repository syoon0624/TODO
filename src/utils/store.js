import { formatDate } from '../features';
import { getList } from './fetchAPI';
import { observable } from './observer';

export const createStore = (reducer) => {
  const state = reducer();
  const frozenState = {};

  // key에 따른 상태를 get
  Object.keys(state).forEach((key) => {
    Object.defineProperty(frozenState, key, {
      get: () => state[key],
    });
  });

  // action 보내기
  const dispatch = (action) => {
    const newState = reducer(state, action);
    console.log('new!', newState);

    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
    }
  };

  const getState = () => frozenState;

  return { getState, dispatch };
};

const initState = {
  list: [],
  doneList: [],
  notDoneList: [],
  trashList: [],
};

// dispatch에 사용될 type들
export const INIT = 'INIT';

export const store = createStore((state = initState, action = {}) => {
  console.log('state: ', state);
  console.log('action: ', action.payload);
  switch (action.type) {
    case 'INIT':
      return { ...action.payload };
    default:
      return state;
  }
});

export const actionCreator = (type, payload) => {
  return {
    type,
    payload,
  };
};

const initialState = async () => {
  const newState = await getList();
  newState.forEach((item) => {
    item.updatedAt = formatDate(item.updatedAt);
  });

  const list = newState.filter((item) => item.order !== 99);
  const doneList = newState.filter((item) => item.done === true);
  const notDoneList = newState.filter((item) => item.done === false);
  const trashList = newState.filter((item) => item.order === 99);
  return { list, doneList, notDoneList, trashList };
};

const setStateList = (obj) => {
  const key = obj.done ? 'doneList' : 'notDoneList';
  const deleteKey = obj.done ? 'notDoneList' : 'doneList';
  const data = store.getState();

  if (obj.order === 99) {
    // 휴지통으로
    data.trashList = [...data.trashList, obj];
    data.list = data.list.filter((item) => item.id !== obj.id);
    data[key] = data[key].filter((item) => item.id !== obj.id);
  } else {
    data[key] = [...data[key], obj];
    data[deleteKey] = data[deleteKey].filter((item) => item.id !== obj.id);
  }

  return data;
};

// 할일 문장
const setStateTitle = (id, value, date) => {
  const data = store.getState();
  const obj = data.list.filter((item) => item.id === id)[0];
  obj.title = value;
  obj.updatedAt = date;
  return obj;
};

// 완료/미완료로 바뀜 시 리스트 set
const setStateDo = (id, date) => {
  const data = store.getState();
  const obj = data.list.filter((item) => item.id === id)[0];
  obj.updatedAt = date;
  obj.done = !obj.done;

  setStateList(obj);
};

// 휴지통으로 보내기
const setStateTrash = (id) => {
  const data = store.getState();
  const obj = data.list.filter((item) => item.id === id)[0];
  obj.order = 99;
  setStateList(obj);
};

// 완전 삭제
const deleteState = (id) => {
  const data = store.getState();
  data.trashList.splice(findListIndex(data.trashList, id), 1);

  return data;
};

// 복원하기
const restoreState = (id) => {
  const data = store.getState();
  const obj = data.trashList.filter((item) => item.id === id);
  arr.order = 0;
  data.list = [...data.list, obj];

  setStateList(obj);
  return data;
};

export { setStateDo, setStateTitle, setStateTrash, restoreState, deleteState, initialState };
