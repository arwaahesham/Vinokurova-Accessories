document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (u) => u.firstName === firstName && u.email === email && u.password === password
  );

  if (user) {
    alert(`Welcome back, ${user.firstName}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
});
