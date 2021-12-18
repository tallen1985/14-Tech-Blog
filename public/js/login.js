const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user_name = document.getElementById("userNameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();

  if (user_name && password) {
    const sendUser = await fetch(`/api/users/${loginForm.dataset.method}`, {
      method: "POST",
      body: JSON.stringify({ user_name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (sendUser.ok) {
      document.location.replace("/");
    } else {
      alert("Invalid User Name or Password");
    }
  }
});
