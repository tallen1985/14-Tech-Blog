const blogPost = document.getElementsByClassName("blogPost");

for (let x = 0; x < blogPost.length; x++) {
  blogPost[x].addEventListener("click", (e) => {
    alert(blogPost[x].dataset.id);
  });
}
