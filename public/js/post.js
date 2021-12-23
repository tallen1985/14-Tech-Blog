const postForm = document.getElementById("postForm");
const deleteBtn = document.getElementById("deleteBtn");
const updateForm = document.getElementById("updateForm");
const title = document.getElementById("inputTitle");
const content = document.getElementById("inputContent");

const postId = document.location.pathname.split("/");

if (deleteBtn && updateForm) {
  const postId = document.location.pathname.split("/")[2];

  deleteBtn.addEventListener("click", async (e) => {
    const deleteItem = await fetch(`/api/post/delete/${postId[2]}`, {
      method: "delete",
    });

    if (deleteItem.ok) {
      document.location.replace("/dashboard");
    }
  });

  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newTitle = title.value;
    const newContent = content.value;

    const updateData = await fetch("/api/post/update", {
      method: "put",
      body: JSON.stringify({
        id: postId,
        title: newTitle,
        content: newContent,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (updateData.ok) {
      console.log({ Message: "Update Failed" });
      return;
    }
  });
}

if (postForm) {
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const sendForm = await fetch("/api/post/", {
      method: postForm.dataset.method,
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (sendForm.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Error adding Item");
    }
  });
}
