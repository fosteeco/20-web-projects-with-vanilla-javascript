/* API source: https://dummyapi.io/ */
/* Using this api instead of JSON placeholder because 
placeholder seems to be having issues right now and I can't filter it with a _filter and _page paramter
*/
const postContainer = document.querySelector(".post-container"),
  loading = document.querySelector(".loader"),
  filter = document.querySelector(".filter");
// import end

let limit = 5,
  page = 0,
  postNum = 1;
// end

const myHeaders = {
  "app-id": "6123e932f062399e62505c3e",
};

async function getPosts() {
  const res = await fetch(
    `https://dummyapi.io/data/v1/post?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: myHeaders,
    }
  );

  const data = await res.json();
  return data;
}

// Show posts in DOM
async function showPosts() {
  const postsPromise = await getPosts();
  const posts = postsPromise.data;
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    // const postData = getFullPostData(post.id);
    // console.log(postData);
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${postNum}</div>
        <div class="post-info"> 
          <h2 class="post-title">New Post by 
          <div class="avatar-container"><img class="avatar" src="${post.owner.picture}"/></div>${post.owner.firstName} ${post.owner.lastName}</h2>
          <p class="post-body">${post.text}</p>
          <div class="image-container"/>
            <img class="post-image" src="${post.image}"/>
          </div>
        </div>
      `;
    console.log(post);
    postNum++;
    postContainer.appendChild(postEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// async function getFullPostData(postId) {
//   const res = await fetch(`https://dummyapi.io/data/v1/post/${postId}`, {
//     method: "GET",
//     headers: myHeaders,
//   });
//   const data = await res.json();
//   return data;
// }

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// Show initial posts
showPosts();

window.addEventListener("scroll", () => {
  //   console.log(document.documentElement.scrollHeight);
  //   console.log(document.documentElement.scrollTop);
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
