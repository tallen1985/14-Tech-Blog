const blogPost = document.getElementsByClassName("blogPost");
const commentForm = document.getElementById("commentForm");

if (document.location.pathname === "/dashboard") {
  for (let x = 0; x < blogPost.length; x++) {
    blogPost[x].addEventListener("click", (e) => {
      document.location.replace(`/update/${blogPost[x].dataset.id}`);
    });
  }
} else {
  for (let x = 0; x < blogPost.length; x++) {
    blogPost[x].addEventListener("click", (e) => {
      document.location.replace(`/post/${blogPost[x].dataset.id}`);
    });
  }
}

if (commentForm) {
  commentForm.addEventListener("submit", async (e) => {
    const content = document.getElementById("inputContent").value.trim();
    const postId = document.getElementById;
    e.preventDefault();
    const sendComment = await fetch("/api/comment/", {
      method: "POST",
      body: JSON.stringify({
        content,
        post_id: blogPost[0].dataset.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (sendComment.ok) {
      document.location.replace("/");
    }
  });
}
