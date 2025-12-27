import { useState } from "react";

const BACKEND_URL = "http://localhost:3000";

function Home({ onTransactionCreated }) {
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [status, setStatus] = useState(null);

  const createPayment = async () => {
    if (!amount || !upiId) {
      setError("Amount and UPI ID are required.");
      return;
    }

    setLoading(true);
    setError("");
    setQrCode(null);
    setTransactionId(null);
    setStatus(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/transactions/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          upi_id: upiId.trim(),
          note: note.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create transaction");
      }

      setQrCode(data.qrCode);
      setTransactionId(data.transaction_id);
      setStatus(data.status);

      // ✅ SAFE CALL (only if function exists)
      if (typeof onTransactionCreated === "function") {
        onTransactionCreated(data.transaction_id);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = () => {
    if (!status) return null;

    const color =
      status === "SUCCESS"
        ? "green"
        : status === "FAILURE"
        ? "red"
        : "orange";

    return (
      <p>
        <strong>Status:</strong>{" "}
        <span style={{ color }}>{status}</span>
      </p>
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>RippleCore – Create Payment</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />

      <input
        placeholder="UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />

      <br />

      <input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <br />

      <button onClick={createPayment} disabled={loading}>
        {loading ? "Creating..." : "Create Payment"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrCode && (
        <div style={{ marginTop: "20px" }}>
          <h3>Scan QR to Pay</h3>
          <img src={qrCode} alt="UPI QR Code" />

          <p><strong>Transaction ID:</strong> {transactionId}</p>

          {renderStatus()}
        </div>
      )}
    </div>
  );
}

export default Home;
