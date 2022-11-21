const key = process.env.API_KEY;
//추가(Post)
export default async (id, title, done, order = 0) => {
  try {
    if (title !== '') {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            apikey: key,
            username: 'LeeSeungYoon',
          },
          body: JSON.stringify({
            title,
            done,
            order,
          }),
        }
      );
      const json = await res.json();
      console.log(json);
      return json;
    } else return;
  } catch (err) {
    console.log(err);
    return;
  }
};
