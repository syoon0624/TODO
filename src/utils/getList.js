const key = process.env.API_KEY;
//추가(Post)
export default async () => {
  try {
    const data = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: key,
          username: 'LeeSeungYoon',
        },
      }
    );
    const json = await data.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
