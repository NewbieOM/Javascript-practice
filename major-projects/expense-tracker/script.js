const form = document.querySelector("#transaction-form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const filterInput = document.querySelector("#filter");
const transactionList = document.querySelector("#transaction-list");

const incomeDisplay = document.querySelector("#total-income");
const expensesDisplay = document.querySelector("#total-expenses");
const balanceDisplay = document.querySelector("#balance");

let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

const money = amount =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    }).format(amount);

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateSummary() {
    const income = transactions
        .filter(item => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

    const expenses = transactions
        .filter(item => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

    incomeDisplay.textContent = money(income);
    expensesDisplay.textContent = money(expenses);
    balanceDisplay.textContent = money(income - expenses);
}

function renderTransactions() {
    transactionList.innerHTML = "";

    const selectedFilter = filterInput.value;

    const filtered = transactions.filter(item =>
        selectedFilter === "all" || item.type === selectedFilter
    );

    filtered.forEach(item => {
        const li = document.createElement("li");

        const details = document.createElement("div");
        const title = document.createElement("strong");
        const category = document.createElement("small");
        const amount = document.createElement("span");
        const deleteBtn = document.createElement("button");

        title.textContent = item.description;
        category.textContent = ` — ${item.category}`;
        amount.textContent =
            `${item.type === "income" ? "+" : "-"}${money(item.amount)}`;

        amount.classList.add(item.type);

        details.append(title, category);
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            transactions = transactions.filter(
                transaction => transaction.id !== item.id
            );

            saveTransactions();
            renderTransactions();
        });

        li.append(details, amount, deleteBtn);
        transactionList.appendChild(li);
    });

    if (filtered.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No transactions yet.";
        transactionList.appendChild(emptyMessage);
    }

    updateSummary();
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = Number(amountInput.value);

    if (!description || !Number.isFinite(amount) || amount <= 0) {
        alert("Enter a description and an amount greater than zero.");
        return;
    }

    transactions.push({
        id: crypto.randomUUID(),
        description,
        amount,
        type: typeInput.value,
        category: categoryInput.value
    });

    saveTransactions();
    renderTransactions();

    form.reset();
    descriptionInput.focus();
});

filterInput.addEventListener("change", renderTransactions);

renderTransactions();