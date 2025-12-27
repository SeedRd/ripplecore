import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

export default function TransactionDetail() {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);

  const fetchTxn = async () => {
    const res = await fetch(`${BACKEND_URL}/api/transactions/${id}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div>
      <h2>Transaction Details</h2>
      <input
        placeholder="Transaction ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />
      <button onClick={fetchTxn}>Fetch</button>

      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
