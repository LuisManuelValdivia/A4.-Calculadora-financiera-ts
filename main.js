"use strict";
let balance = 0;
const transactions = [];
const transactionForm = document.getElementById("transaction-form");
const transaccion_id = document.getElementById("id");
const transaccion_monto = document.getElementById("monto");
const transaccion_descrip = document.getElementById("descripcion");
const transactionTableBody = document.getElementById("transaction-table-body");
const balance_t = document.getElementById("balance");
const btnIngreso = document.getElementById("Ingreso");
const btnGasto = document.getElementById("Gasto");
function updateBalanceDisplay() {
    balance_t.textContent = `$${balance.toFixed(2)}`;
    balance_t.className = balance >= 0 ? "balance-positive" : "balance-negative";
}
function addTransaction(type) {
    const id = parseInt(transaccion_id.value);
    const amount = parseFloat(transaccion_monto.value);
    const description = transaccion_descrip.value.trim();
    if (isNaN(id) || id <= 0) {
        alert("Por favor, ingrese un ID válido.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }
    if (!description) {
        alert("Por favor, ingrese una descripción.");
        return;
    }
    const transaction = { id, amount, description, type };
    transactions.push(transaction);
    balance += type === "Ingreso" ? amount : -amount;
    updateBalanceDisplay();
    const row = document.createElement("tr");
    row.className = type === "Ingreso" ? "income" : "expense";
    row.innerHTML = `
      <td>$${amount.toFixed(2)}</td>
      <td>${description}</td>
      <td>${type}</td>
    `;
    transactionTableBody.appendChild(row);
    transaccion_id.value = "";
    transaccion_monto.value = "";
    transaccion_descrip.value = "";
}
btnIngreso.addEventListener("click", () => addTransaction("Ingreso"));
btnGasto.addEventListener("click", () => addTransaction("Gasto"));
