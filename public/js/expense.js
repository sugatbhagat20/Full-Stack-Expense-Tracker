var form = document.getElementById("form");

var list = document.getElementById("list");

var nameItem = document.querySelector("#name");
var amountItem = document.querySelector("#amount");

form.addEventListener("submit", addItem);
list.addEventListener("click", del);
// list.addEventListener("click", editItem);
window.addEventListener("DOMContentLoaded", () => {
  renderList();
});

async function addItem(e) {
  e.preventDefault();

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
    await axios.post("http://localhost:4000/expense/addExpense", expense);
  } catch (e) {
    console.log(e);
  }
}

async function del(e) {
  let id = e.target.id;
  console.log(id);

  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    await axios.delete(`http://localhost:4000/expense/deleteExpense/${id}`);

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
    const expenses = await axios.get("http://localhost:4000/expense/expenses");

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
