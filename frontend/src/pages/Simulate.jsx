import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

export default function Simulate() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("SUCCESS");

  const simulate = async () => {
    await fetch(`${BACKEND_URL}/api/webhooks/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction_id: id,
        status
      })
    });
    alert("Webhook triggered");
  };

  return (
    <div>
      <h2>Simulate Payment Result</h2>
      <input
        placeholder="Transaction ID"
        value={id}
        onChange={e => setId(e.target.value)}
      />

      <select onChange={e => setStatus(e.target.value)}>
        <option value="SUCCESS">SUCCESS</option>
        <option value="FAILED">FAILED</option>
      </select>

      <button onClick={simulate}>Trigger Webhook</button>
    </div>
  );
}
