import './App.css';

function RegisterPage({
  username,
  password,
  confirmPassword,
  error,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  onSwitchToLogin,
}) {
  return (
    <section className="panel auth-panel">
      <h3>Register</h3>
      <p className="auth-copy">Create a new account to manage parking access.</p>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button type="submit">Create Account</button>
        <button type="button" className="secondary-btn" onClick={onSwitchToLogin}>
          Back to Login
        </button>
        {error ? <p className="alert">{error}</p> : null}
      </form>
    </section>
  );
}

export default RegisterPage;
