const key = process.env.API_KEY;
//추가(Post)
export default async (title, order = 0) => {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: key,
          username: 'KDT3_LeeSeungYoon',
        },
        body: JSON.stringify({
          title,
          order,
        }),
      }
    );
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
    return;
  }
};
