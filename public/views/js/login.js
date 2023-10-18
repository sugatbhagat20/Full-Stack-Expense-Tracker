var form = document.getElementById("loginForm");
form.addEventListener("submit", logIn);

var email = document.querySelector("#email");
var pwd = document.querySelector("#password");

async function logIn(e) {
  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };
  try {
    let res;
    res = await axios.post("http://localhost:4000/user/signUp", user);
    console.log(res);
    alert("User logged in successfully");
  } catch (e) {
    console.log(e);
  }
}
