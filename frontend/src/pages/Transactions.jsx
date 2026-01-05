import { useEffect, useState } from "react";
import { authHandler } from "../utils/authApi";

function Transactions({ user }) {
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    authHandler('/api/transactions')
      .then(setTxns)
      .catch(err => alert(err.message));
  }, []);

  return (
    <div>
      <h3>{user.role === 'admin' ? 'All Transactions' : 'My Transactions'}</h3>
      <ul>
        {txns.map(t => (
          <li key={t.id}>{t.id} — {t.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
