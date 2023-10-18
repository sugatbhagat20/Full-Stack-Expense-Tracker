var form = document.getElementById("form");
form.addEventListener("submit", signUp);

var name = document.querySelector("#name");
var email = document.querySelector("#email");
var pwd = document.querySelector("#pwd");

async function signUp(e) {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    pwd: e.target.pwd.value,
  };
  try {
    let res;
    res = await axios.post("http://localhost:4000/get/addPost", user);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
