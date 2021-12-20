const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

if (loginForm) {
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
        document.location.replace("/dashboard");
      } else {
        alert("Invalid User Name or Password");
      }
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/login");
    } else {
      alert(response.statusText);
    }
  });
}
