import './App.css';

function LoginPage({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onSwitchToRegister,
  onSkip,
}) {
  return (
    <section className="panel auth-panel">
      <h3>Login</h3>
      <p className="auth-copy">Sign in to access the parking dashboard.</p>
      <form className="login-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
        <button type="submit">Login</button>
        <button type="button" className="secondary-btn" onClick={onSwitchToRegister}>
          Create an account
        </button>
        <button type="button" className="secondary-btn" onClick={onSkip}>
          Skip for now
        </button>
        {error ? <p className="alert">{error}</p> : null}
      </form>
    </section>
  );
}

export default LoginPage;
