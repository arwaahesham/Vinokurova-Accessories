document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.email === email);
  if (exists) {
    alert("This email is already registered!");
    return;
  }

  const newUser = { firstName, lastName, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "login.html";
});
