var form = document.getElementById("signupForm");
form.addEventListener("submit", signUp);

var name = document.querySelector("#name");
var email = document.querySelector("#email");
var pwd = document.querySelector("#password");

async function signUp(e) {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  };
  try {
    let res;
    res = await axios.post("http://13.202.23.253:4000/user/signUp", user);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
