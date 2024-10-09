var form = document.getElementById("form");
var payment = document.getElementById("buyPremium");
var list = document.getElementById("list");
//const leaderboardBtn = document.getElementById("leaderBoard");
var nameItem = document.querySelector("#name");
var amountItem = document.querySelector("#amount");
var download = document.getElementById("downloadFile");
form.addEventListener("submit", addItem);
list.addEventListener("click", del);
payment.addEventListener("click", buyPremium);
const reportsLink = document.getElementById("reportsLink");
var leaderboardBtn = document.getElementById("leaderBoard");

// list.addEventListener("click", editItem);
document.addEventListener("DOMContentLoaded", () => {
  renderList();
});
document.addEventListener("DOMContentLoaded", isPremiumUser);

download.addEventListener("click", downloadFile);

async function downloadFile(e) {
  try {
    console.log("click");
    const token = localStorage.getItem("token");
    const res = await axios.get("http://13.202.23.253:4000/user/download", {
      headers: { Authorization: token },
    });
    console.log(res);
    // const a = document.createElement("a");
    // a.href = res.data.fileUrl;
    // a.download = "myexpense.csv";
    window.location.href = res.data.fileUrl.Location;

    // a.click();
  } catch (e) {
    console.log(e);
  }
}

async function buyPremium(e) {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://13.202.23.253:4000/purchase/premium", {
    headers: { Authorization: token },
  });
  //console.log(res);
  var options = {
    key: res.data.key_id, // Enter the Key ID generated from the Dashboard
    order_id: res.data.order.id, // For one time payment
    // This handler function will handle the success payment
    handler: async function (response) {
      console.log(response);
      const res = await axios.post(
        "http://13.202.23.253:4000/purchase/updateTransactionStatus",
        {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id,
        },
        { headers: { Authorization: token } }
      );

      //console.log(res);
      alert("Welcome to our Premium Membership");
      window.location.reload();
      localStorage.setItem("token", res.data.token);
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.on("payment.failed", async function (response) {
    alert("failed");
    console.log(response.error);
    const res = await axios.post(
      "http://13.202.23.253:4000/purchase/failed",
      {
        order_id: options.order_id,
        payment_id: response.error.metadata.payment_id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res);
  });
  rzp1.open();
  e.preventDefault();
}

async function isPremiumUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://13.202.23.253:4000/user/isPremiumUser", {
    headers: { Authorization: token },
  });
  if (res.data.isPremiumUser) {
    payment.innerHTML = "Premium Member";
    payment.className = "btn btn-warning";
    reportsLink.removeAttribute("onclick");
    leaderboardBtn.removeAttribute("onclick");
    leaderboardBtn.setAttribute("href", "/premium/getLeaderboardPage");
    //reportsLink.setAttribute("href", "/reports/getReportsPage");
    payment.removeEventListener("click", buyPremium);
  }
}

async function addItem(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  var selectElement = document.querySelector("#expense");
  var input3 = selectElement.options[selectElement.selectedIndex].value;

  // if (input1 && input2) {
  try {
    let expense = {
      name: nameItem.value,
      amount: amountItem.value,
      expense: input3,
    };

    var li = document.createElement("li");
    var deleteBtn = document.createElement("button");
    //var editBtn = document.createElement("button");

    //give classname to the li element
    li.className = "items";
    deleteBtn.className = "delete btn btn-dark";
    //editBtn.className = "edit btn btn-info";

    // Add a unique key as a data attribute to the li element
    //li.dataset.name = input1;
    //li.dataset.amount = input2;

    console.log(expense);
    deleteBtn.appendChild(document.createTextNode("Delete"));
    //editBtn.appendChild(document.createTextNode("Edit"));
    let span1 = document.createElement("span");
    span1.textContent = `${expense.name} `;
    let span2 = document.createElement("span");
    span2.textContent = `${expense.amount} `;
    let span3 = document.createElement("span");
    span3.textContent = `${expense.expense} `;
    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(deleteBtn);
    //li.appendChild(editBtn);

    //append li to ul
    list.appendChild(li);

    const response = await axios.post(
      "http://13.202.23.253:4000/expense/addExpense",
      expense,
      {
        headers: { Authorization: token },
      }
    );
  } catch (e) {
    console.log(e);
  }
}

async function del(e) {
  const token = localStorage.getItem("token");
  let id = e.target.id;
  console.log(id);

  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    await axios.delete(
      `http://13.202.23.253:4000/expense/deleteExpense/${id}`,
      {
        headers: { Authorization: token },
      }
    );

    list.removeChild(li);
  }
}

// function editItem(e) {
//   var li = e.target.parentElement;
//   var itemName = li.dataset.name; //getting name of the expense
//   var itemAmount = li.dataset.amount; //getting amount of the expense
//   if (e.target.classList.contains("edit")) {
//     var li = e.target.parentElement;
//     //setting back values to the placeholders
//     document.getElementById("name").value = itemName;
//     document.getElementById("amount").value = itemAmount;

//     localStorage.removeItem(itemName);

//     list.removeChild(li);
//   }
// }

async function renderList(e) {
  try {
    const token = localStorage.getItem("token");
    const expenses = await axios.get(
      "http://13.202.23.253:4000/expense/getAllExpenses",
      {
        headers: { Authorization: token },
      }
    );
    //list.innerHTML = ""; // Clear the list before adding new items
    expenses.data.forEach((expense) => {
      var li = document.createElement("li");
      var deleteBtn = document.createElement("button");
      //var editBtn = document.createElement("button");

      //give classname to the li element
      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";

      deleteBtn.id = `${expense.id}`;
      deleteBtn.appendChild(document.createTextNode("Delete"));
      //editBtn.appendChild(document.createTextNode("Edit"));
      let span1 = document.createElement("span");
      span1.textContent = `${expense.name} `;
      let span2 = document.createElement("span");
      span2.textContent = `${expense.amount} `;
      let span3 = document.createElement("span");
      span3.textContent = `${expense.expense} `;
      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
      li.appendChild(deleteBtn);

      list.appendChild(li);
    });
  } catch (e) {
    console.log(e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const recordsPerPageSelect = document.getElementById("rows");
  const previousBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const recordsDiv = document.getElementById("records");
  const token = localStorage.getItem("token");

  let currentPage = 1;
  let recordsPerPage = parseInt(recordsPerPageSelect.value);

  // Function to fetch records from the backend
  async function fetchRecords(page, perPage) {
    try {
      const response = await axios.get(
        `http://13.202.23.253:4000/expense/getExpenses?page=${page}&perPage=${perPage}`,
        {
          headers: {
            Authorization: token, // Ensure 'Bearer' is included for token authorization
          },
        }
      );

      const data = response.data; // Axios returns the data directly in response.data

      // Display fetched records
      recordsDiv.innerHTML = data
        .map(
          (record) => `<div><strong>Name:</strong> ${record.name}
              <strong>Amount:</strong> ${record.amount}
              <strong>Category:</strong> ${record.expense}</div>`
        )
        .join("");
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  // Initial fetch
  fetchRecords(currentPage, recordsPerPage);

  // Event listeners for dropdown and buttons
  recordsPerPageSelect.addEventListener("change", () => {
    recordsPerPage = parseInt(recordsPerPageSelect.value);
    fetchRecords(currentPage, recordsPerPage);
  });

  previousBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchRecords(currentPage, recordsPerPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    fetchRecords(currentPage, recordsPerPage);
  });
});
