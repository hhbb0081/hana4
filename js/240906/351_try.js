// 특정 유저의 정보와 게시글 목록을 리턴하는 함수를 작성하시오.
//  - 예) 1번 유저의 정보: https://jsonplaceholder.typicode.com/users/1
//  - 예) 1번 유저의 글목록: https://jsonplaceholder.typicode.com/posts?userId=1

const BASE_URL = `https://jsonplaceholder.typicode.com`;

const myFetch = async (path) => {
  const res = await fetch(`${BASE_URL}/${path}`);
  return res.json();
};

async function getUserPosts(userId) {
  try {
    const { id, name } = await myFetch(`users/${userId}`);
    // console.log("🚀 ~ getUserPosts ~ info:", info);

    const posts = await myFetch(`posts?userId=${userId}`);
    // const res2 = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    // console.log("🚀 ~ getUserPosts ~ list:", list);

    return {
      id,
      name,
      posts,
    };
  } catch (err) {
    console.error(err);
  }
}

// const { info, list } = getUserPosts(1);
// console.log("🚀 ~ info, list:", info, list);

async function fetchUser() {
  const { info, list } = await getUserPosts(1);
  console.log("🚀 ~ info, list:", info, list);
}

fetchUser();

//  ⇒ 다음 형식으로 리턴 (format 준수!)
// {
//   id: 유저ID,
//   name: 유저명,
//   posts: [
//      {id: 글ID, title: 글제목, body: 글내용}, {...
//   ]
// }
