var form = document.getElementById("form");
var payment = document.getElementById("buyPremium");
var list = document.getElementById("list");
//const leaderboardBtn = document.getElementById("leaderBoard");
var nameItem = document.querySelector("#name");
var amountItem = document.querySelector("#amount");

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
async function buyPremium(e) {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4000/purchase/premium", {
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
        "http://localhost:4000/purchase/updateTransactionStatus",
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
      "http://localhost:4000/purchase/failed",
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
  const res = await axios.get("http://localhost:4000/user/isPremiumUser", {
    headers: { Authorization: token },
  });
  if (res.data.isPremiumUser) {
    payment.innerHTML = "Premium Member";
    payment.className = "btn btn-warning";
    reportsLink.removeAttribute("onclick");
    leaderboardBtn.removeAttribute("onclick");
    leaderboardBtn.setAttribute("href", "/premium/getLeaderboardPage");
    reportsLink.setAttribute("href", "/reports/getReportsPage");
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
    //deleteBtn.id = `${expense.id}`;
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
    await axios.post("http://localhost:4000/expense/addExpense", expense, {
      headers: { Authorization: token },
    });
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
    await axios.delete(`http://localhost:4000/expense/deleteExpense/${id}`, {
      headers: { Authorization: token },
    });

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
      "http://localhost:4000/expense/expenses/1",
      {
        headers: { Authorization: token },
      }
    );

    expenses.data.expenses.forEach((expense) => {
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
    const ul = document.getElementById("paginationUL");
    for (let i = 1; i <= res.data.totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.setAttribute("class", "page-item");
      a.setAttribute("class", "page-link");
      a.setAttribute("href", "#");
      a.appendChild(document.createTextNode(i));
      li.appendChild(a);
      ul.appendChild(li);
      a.addEventListener("click", paginationBtn);
    }
  } catch (e) {
    console.log(e);
  }
}

async function paginationBtn(e) {
  try {
    const pageNo = e.target.textContent;
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:4000/expense/getAllExpenses/${pageNo}`,
      { headers: { Authorization: token } }
    );

    //table.innerHTML = "";

    expenses.data.expenses.forEach((expense) => {
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
  } catch (error) {
    console.log(error);
  }
}
