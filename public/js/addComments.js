const blogPost = document.getElementsByClassName("blogPost");

for (let x = 0; x < blogPost.length; x++) {
  blogPost[x].addEventListener("click", (e) => {
    document.location.replace(`/api/post/${blogPost[x].dataset.id}`);
  });
}
