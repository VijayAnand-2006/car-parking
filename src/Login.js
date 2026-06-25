import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    setError('');
    navigate('/');
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Sign in to access the parking dashboard.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
          />

          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don&apos;t have an account?{' '}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
  },
  title: {
    margin: '0 0 8px',
    color: '#0f172a',
    fontSize: '28px',
  },
  subtitle: {
    margin: '0 0 20px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px 14px',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '12px 14px',
    border: 'none',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  error: {
    margin: 0,
    color: '#dc2626',
    fontSize: '14px',
  },
  footer: {
    marginTop: '16px',
    color: '#475569',
    fontSize: '14px',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 600,
  },
};

export default Login;
