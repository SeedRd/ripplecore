import { useEffect, useState } from 'react';
import { authHandler } from './utils/authApi';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Ping from './pages/Ping';
import Transactions from './pages/Transactions';
import Status from './pages/Status';
import Simulate from './pages/Simulate';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [loading, setLoading] = useState(true);
  const [txnId, setTxnId] = useState(null);

  useEffect(() => {
    authHandler('/api/auth/me')
      .then((data) => {
        setUser(data);
        log(data);
        setPage('home');
      })
      .catch(() => {
        setUser(null);
        setPage('login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      await authHandler('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setTxnId(null);
      setPage('login');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header user={user} setPage={setPage} logout={logout} />
      <hr />

      {}
      {!user && page === "login" && <Login setUser={setUser} />}
      {!user && page === "signup" && <Signup setPage={setPage} />}

      {}
      {user && page === "home" && (
        <>
          <Home onTransactionCreated={setTxnId} />
          {txnId && <Status transactionId={txnId} />}
        </>
      )}

      {}
      {user && page === "ping" && <Ping />}
      {user && page === "transactions" && (
        <Transactions user={user} />
      )}

      {}
      {user && user.role === "admin" && page === "simulate" && (
        <Simulate />
      )}

      {}
      {!user && page !== "login" && page !== "signup" && (
        <Login setUser={setUser} />
      )}

      <Footer />
    </div>
  );
}

export default App;
