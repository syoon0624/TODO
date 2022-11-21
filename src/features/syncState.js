import { state } from '../utils';

export default (data) => {
  state.list = data;
  data.forEach((ele) => {
    state.ids.push(ele.id);
  });
};
