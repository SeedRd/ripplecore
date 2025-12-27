import { useEffect, useRef, useState } from "react";
import { authHandler } from "../utils/authApi";

const BACKEND_URL = "http://localhost:3000";

async function Status({ initialTransactionId }) {
  const [transactionId, setTransactionId] = useState(initialTransactionId || "");
  const [statusLogs, setStatusLogs] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(null);
  const intervalRef = useRef(null);

  const data = await authHandler(`api/transactions/${transactionId}/status`);
  
  const fetchStatus = async () => {
    if (!transactionId) return;

    try {
      const res = await fetch(
        `${BACKEND_URL}/api/transactions/${transactionId}/status`
      );

      if (!res.ok) return;

      const data = await res.json();
      const logs = data.status_logs;

      setStatusLogs(logs);
      setCurrentStatus(logs[logs.length - 1]?.status);

      const finalStatus = logs[logs.length - 1]?.status;
      if (finalStatus === "SUCCESS" || finalStatus === "FAILURE") {
        clearInterval(intervalRef.current);
      }
    } catch (err) {
      console.error("Polling error:", err);
    }
  };

  const startPolling = () => {
    clearInterval(intervalRef.current);
    fetchStatus();
    intervalRef.current = setInterval(fetchStatus, 3000);
  };

  useEffect(() => {
    if (initialTransactionId) {
      startPolling();
    }

    return () => clearInterval(intervalRef.current);
  }, [initialTransactionId]);

  return (
    <div>
      <h2>Check Payment Status</h2>

      <input
        placeholder="Transaction ID"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />

      <button onClick={startPolling}>Check Status</button>

      {currentStatus && (
        <p>
          <strong>Current Status:</strong>{" "}
          <span
            style={{
              color:
                currentStatus === "SUCCESS"
                  ? "green"
                  : currentStatus === "FAILURE"
                  ? "red"
                  : "orange",
            }}
          >
            {currentStatus}
          </span>
        </p>
      )}

      <ul>
        {statusLogs.map((log, i) => (
          <li key={i}>
            {log.status} — {new Date(log.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Status;
