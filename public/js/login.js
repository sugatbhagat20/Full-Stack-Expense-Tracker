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
    const users = await axios
      .post("http://localhost:4000/user/logIn", user)
      .then((result) => {
        alert(result.data.message);
        localStorage.setItem("token", result.data.token);
        window.location.href = "../html/expense.html";
      })
      .catch((error) => {
        if (error.response) {
          const msg = error.response.data.message;
          alert(msg);
        }
      });
    // console.log(res);
    // alert("User logged in successfully");
    // users.data.forEach((user) => {
    //   if (user.email == userDetails.email) {
    //     if (user.password == userDetails.password) {
    //       alert("User logged in successfully");
    //     } else {
    //       alert("User not authorized");
    //     }
    //   } else {
    //     alert("User not found");
    //   }
    // });
  } catch (e) {
    console.log(e);
  }
}
