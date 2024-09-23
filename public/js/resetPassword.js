const resetPasswordBtn = document.getElementById("resetPasswordBtn");

async function updatePassword(e) {
  try {
    e.preventDefault();
    const url = window.location.href;
    const queryString = url.split("?")[1];
    const parameterValue = queryString.split("=")[1];
    const decodedValue = decodeURIComponent(parameterValue);
    const requestId = decodedValue.replace(/\\+$/, "");
    //console.log(uuidWithoutBackslashes);
    const newPassword = document.getElementById("newPassword").value;
    const res = await axios.post(
      "http://localhost:4000/password/resetPassword",
      {
        password: newPassword,
        requestId: requestId,
      }
    );

    alert(res.data.message);
    window.location.href = "../html/login.html";
  } catch (error) {
    console.log(error);
    //alert(error.response.data.message);
    window.location.reload();
  }
}

resetPasswordBtn.addEventListener("click", updatePassword);
