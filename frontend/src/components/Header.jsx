function Header({ user, setPage }) {
  return (
    <header>
      <h2>RippleCore</h2>

      
      
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("ping")}>Ping</button>
      <button onClick={() => setPage("status")}>Status</button>

      {user && (
        <>
          <button onClick={() => setPage("transactions")}>Transactions</button>
          {user.role === "admin" && (
            <button onClick={() => setPage("simulate")}>Simulate</button>
          )}
        </>
      )}

      {!user && (
        <>
          <button onClick={() => setPage("login")}>Login</button>
          <button onClick={() => setPage("signup")}>Signup</button>
        </>
      )}
    </header>
  );
}

export default Header;
