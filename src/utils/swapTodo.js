import state from './state';

const key = process.env.API_KEY;
//목록 순서 변경
export default async (todoIds) => {
  try {
    const isSame = JSON.stringify(todoIds) === JSON.stringify(state.ids);
    if (!isSame) {
      state.ids = todoIds;
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: key,
            username: 'KDT3_LeeSeungYoon',
          },
          body: JSON.stringify({
            todoIds,
          }),
        }
      );
      const json = await res.json();
      return json;
    } else console.log('같은 값 호출!');
  } catch (err) {
    console.log(err);
    return;
  }
};
