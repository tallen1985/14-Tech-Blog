const postForm = document.getElementById("postForm");

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("inputTitle").value.trim();
  const content = document.getElementById("inputContent").value.trim();

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
