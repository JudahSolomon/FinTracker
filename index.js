const form = document.querySelector(".add");
const incomeList = document.querySelector(".income-list");
const expenseList = document.querySelector(".expense-list");
const statistics = document.querySelector(".stats");
const clearAll = document.querySelector(".clear");
const records = document.querySelector(".records");
const history = document.querySelector(".transaction-control");
const transControl = document.querySelector(".transaction-history");
const statisticsBalance = document.getElementById("balance");
const statisticsExpensis = document.getElementById("expense");
const statisticsIncome = document.getElementById("income");

//  creating a variable that will get data from the local storage
let transactions =
  localStorage.getItem("transactions") !== null
    ? JSON.parse(localStorage.getItem("transactions"))
    : [];

// Creating a template for each transaction
function transactionTemplate(id, source, amount, time) {
  return `<li data-id="${id}">
                    <p>
                      <span>${source}</span>
                      <span id="time">${time}</span>
                    </p>
                    ₵<span>${Math.abs(amount)}</span>
                    <i class="bi bi-trash delete"></i>
                  </li>`;
}

function addtransactionToIncomrOrExpensis(id, source, amount, time) {
  if (amount >= 0) {
    incomeList.innerHTML += transactionTemplate(id, source, amount, time);
  } else {
    expenseList.innerHTML += transactionTemplate(id, source, amount, time);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (form.source.value.trim() === "" || form.amount.value.trim() === "") {
    return alert("Please enter Source and Amount");
  } else {
    addTransaction(form.source.value, form.amount.value, transactions.time);
  }
  scrollTo(0, 20);
  form.reset();
});

// adding income to the Balance and Amount income

// creating function to keep track of transactions
function addTransaction(source, amount) {
  const time = new Date();
  const id = Math.floor(Math.random() * 10000);

  const transaction = {
    id: id,
    source: source,
    amount: amount,
    time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`,
  };

  addtransactionToIncomrOrExpensis(
    transaction.id,
    source,
    amount,
    transaction.time
  );
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  window.location.reload();
}

//  writing a function to get the transaction from the local storage on refresh
function getTransactions() {
  transactions.forEach((transaction) => {
    if (history === "") {
      history.classList.add("hide");
      clearAll.classList.add("hide");
    } else if (transaction.amount > 0) {
      incomeList.innerHTML += transactionTemplate(
        transaction.id,
        transaction.source,
        transaction.amount,
        transaction.time
      );
    } else {
      expenseList.innerHTML += transactionTemplate(
        transaction.id,
        transaction.source,
        transaction.amount,
        transaction.time
      );
    }
  });
  // window.location.reload();
}

// deleting an income
incomeList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
    window.location.reload();
    deleteTransaction(Number(event.target.parentElement.dataset.id));
  }
});
// deleting an expensis
expenseList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();

    /* since local storage stored data in string we 
    need to convert our id to an Int so it will match 
    with the id in code which is also an Int*/
    deleteTransaction(Number(event.target.parentElement.dataset.id));
  }
});

/* this function is used to delete a transaction both from the
DOM anf the local storage */
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => {
    return transaction.id !== id;
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Statistics Part
//  using the filter and the reduce method to calculate the totals
function statsUpdateSections() {
  const statsIncome = transactions
    .filter((transaction) => {
      return transaction.amount > 0;
    })
    .reduce((total, transaction) => {
      total += Math.abs(transaction.amount);
      return total;
    }, 0);

  const statsExpensis = transactions
    .filter((transaction) => {
      return transaction.amount < 0;
    })
    .reduce((total, transaction) => {
      total += Math.abs(transaction.amount);
      return total;
    }, 0);

  const balance = statsIncome - statsExpensis;

  statisticsBalance.textContent = Number(balance);
  statisticsIncome.textContent = statsIncome;
  statisticsExpensis.textContent = statsExpensis;

  //balance
}

statsUpdateSections();
getTransactions();

// delete all transaction history

clearAll.addEventListener("click", (event) => {
  deleteAllTransactions();

  incomeList.classList.add("hide");
  expenseList.classList.add("hide");
  window.location.reload();
});

function deleteAllTransactions() {
  const incomeControls = transControl.querySelector(" .income");
  incomeControls.remove();
  const expenseControls = transControl.querySelector(" .expense");
  expenseControls.remove();

  // setting the transaction array to empty when the clear history button is clicked
  transactions = [];
  localStorage.setItem("transactions", JSON.stringify(transactions));
}
