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
