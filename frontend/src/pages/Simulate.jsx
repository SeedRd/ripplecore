import { authHandler } from "../utils/authApi";

function Simulate() {
  const simulate = async (status) => {
    await authHandler("/api/webhooks/simulate", {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    alert("Webhook triggered");
  };

  return (
    <div>
      <h3>Simulate Payment</h3>
      <button onClick={() => simulate("SUCCESS")}>Success</button>
      <button onClick={() => simulate("FAILURE")}>Failure</button>
    </div>
  );
}

export default Simulate;
