//삭제
const key = process.env.API_KEY;
export default async (id) => {
  try {
    if (id) {
      await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            apikey: key,
            username: 'KDT3_LeeSeungYoon',
          },
        }
      );
    } else {
      console.log('빈 id');
    }
  } catch (err) {
    console.log(err);
    return;
  }
};
