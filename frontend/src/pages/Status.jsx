
import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

function Status() {
  const [id, setId] = useState("");
  const [logs, setLogs] = useState([]);

  const check = async () => {
    const res = await fetch(`${BACKEND_URL}/api/transactions/${id}/status`);
    const data = await res.json();
    setLogs(data.status_logs);
  };

  return (
    <div>
      <h3>Check Status</h3>
      <input placeholder="Transaction ID" onChange={e => setId(e.target.value)} />
      <button onClick={check}>Check</button>

      <ul>
        {logs.map((l, i) => (
          <li key={i}>{l.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Status;
