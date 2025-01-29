interface Transaction {
    id: number;
    amount: number;
    description: string;
    type: "Ingreso" | "Gasto";
  }
  
  let balance = 0;
  const transactions: Transaction[] = [];
  
  const transactionForm = document.getElementById("transaction-form") as HTMLFormElement;
  const transaccion_id = document.getElementById("id") as HTMLInputElement;
  const transaccion_monto = document.getElementById("monto") as HTMLInputElement;
  const transaccion_descrip = document.getElementById("descripcion") as HTMLInputElement;
  const transactionTableBody = document.getElementById("transaction-table-body") as HTMLTableSectionElement;
  const balance_t = document.getElementById("balance") as HTMLSpanElement;
  const btnIngreso = document.getElementById("Ingreso") as HTMLButtonElement;
  const btnGasto = document.getElementById("Gasto") as HTMLButtonElement;
  
  function updateBalanceDisplay(): void {
    balance_t.textContent = `$${balance.toFixed(2)}`;
    balance_t.className = balance >= 0 ? "balance-positive" : "balance-negative";
  }
  
  function addTransaction(type: "Ingreso" | "Gasto"): void {
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
  
    const transaction: Transaction = { id, amount, description, type };
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
  