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
    const response = await axios.post(
      "http://13.202.23.253:4000/user/logIn",
      user
    );
    alert(response.data.message);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    window.location.href = "/views/html/expense.html";
  } catch (error) {
    if (error.response) {
      const msg = error.response.data.message;
      alert(msg);
    } else {
      console.log(error);
    }
  }
}
