const resetPasswordLinkBtn = document.getElementById("resetPasswordLinkBtn");

async function sendMail() {
  try {
    const email = document.getElementById("email").value;
    const res = await axios.post(
      "http://13.233.165.10:4000/password/sendMail",
      {
        email: email,
      }
    );
    alert(res.data.message);
    window.location.href = "../views/html/resetPassword.html";
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
    window.location.reload();
  }
}

resetPasswordLinkBtn.addEventListener("click", sendMail);
