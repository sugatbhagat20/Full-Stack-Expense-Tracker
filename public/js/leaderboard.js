var leaderboardBtn = document.getElementById("leaderBoard");
var list2 = document.getElementById("boardList");

leaderboardBtn.addEventListener("click", getLeaderboard);

async function getLeaderboard() {
  const res = await axios.get("http://localhost:4000/user/getAllUsers");

  res.data.forEach((user) => {
    var li = document.createElement("li");
    li.className = "board";
    let span1 = document.createElement("span");
    span1.textContent = `Name: ${user.name} `;
    let span2 = document.createElement("span");
    span2.textContent = `Total Expense: ${user.totalExpenses}`;

    li.appendChild(span1);
    li.appendChild(span2);

    list2.appendChild(li);
  });
}

//document.addEventListener("DOMContentLoaded", getLeaderboard);
