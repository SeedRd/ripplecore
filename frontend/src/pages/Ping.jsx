import { useEffect, useState } from "react";
const BACKEND_URL = 'http://localhost:3000';

export default function Ping() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/ping`)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return <p>Backend Status: {message}</p>;
}