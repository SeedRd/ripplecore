import { useState } from "react";
import Ping from "./pages/Ping";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";
import Status from "./pages/Status";
import Simulate from "./pages/Simulate";
import Header from './components/Header';

export default function App() {
  const [page, setPage] = useState("ping");

  return (
    // <BrowserRouter>

      <div>

        <div><Header /></div>
        
        <h1>RippleCore Demo.</h1>
        <button onClick={() => setPage("ping")}>Ping</button>
        <button onClick={() => setPage("home")}>Create</button>
        <button onClick={() => setPage("all")}>All</button>
        <button onClick={() => setPage("one")}>Single</button>
        <button onClick={() => setPage("status")}>Status</button>
        <button onClick={() => setPage("simulate")}>Simulate</button>

        <hr />

        {page === "ping" && <Ping />}
        {page === "home" && <Home />}
        {page === "all" && <Transactions />}
        {page === "one" && <TransactionDetail />}
        {page === "status" && <Status />}
        {page === "simulate" && <Simulate />}
      </div>
    // </BrowserRouter>
  );
}
