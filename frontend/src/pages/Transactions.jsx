import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:3000";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/transactions`)
      .then(res => res.json())
      .then(setTransactions);
  }, []);

  return (
    <div>
      <h2>All Transactions</h2>
      <ul>
        {transactions.map(txn => (
          <li key={txn.id}>
            {txn.id} — ₹{txn.amount} — {txn.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
