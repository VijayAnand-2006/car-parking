import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalSpots = 25;
  const [filledSpots, setFilledSpots] = useState(18);
  const [activityLog, setActivityLog] = useState([
    'Vehicle entered Gate A at 09:12',
    'Vehicle exited Gate C at 09:05',
    'Reserved spot 14 is ready',
  ]);

  const handleEntry = () => {
    if (filledSpots < totalSpots) {
      setFilledSpots((current) => current + 1);
      setActivityLog((current) => ['Vehicle entered at the main gate', ...current].slice(0, 4));
    }
  };

  const handleExit = () => {
    if (filledSpots > 0) {
      setFilledSpots((current) => current - 1);
      setActivityLog((current) => ['Vehicle exited at the main gate', ...current].slice(0, 4));
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [isRegistering, setIsRegistering] = useState(location.pathname === '/register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const occupancyPercent = Math.round((filledSpots / totalSpots) * 100);
  const availableSpots = totalSpots - filledSpots;
  const isFull = filledSpots >= totalSpots;
  const showDashboard = isLoggedIn || !showAuth;

  const goToLogin = () => {
    setIsRegistering(false);
    setShowAuth(true);
    setError('');
    setPassword('');
    setConfirmPassword('');
    navigate('/login');
  };

  const goToRegister = () => {
    setIsRegistering(true);
    setShowAuth(true);
    setError('');
    setPassword('');
    setConfirmPassword('');
    navigate('/register');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isRegistering) {
      if (!username || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Registration failed.');
          return;
        }

        setError(data.message || 'Registration successful. Please sign in.');
        setIsRegistering(false);
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        setError('Unable to reach the server.');
      }
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid username or password.');
        setIsLoggedIn(false);
        return;
      }

      setIsLoggedIn(true);
      setShowAuth(false);
      setError('');
    } catch (error) {
      setError('Unable to reach the server.');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Smart Parking</p>
          <h1>{showDashboard ? 'Parking Dashboard' : 'Parking Login'}</h1>
          <p className="subtitle">{showDashboard ? 'Monitor available spaces and keep traffic flowing smoothly.' : 'Sign in to access the parking dashboard.'}</p>
        </div>
        <div className="status-card">
          <h2>Occupancy</h2>
          <p className="big-number">{occupancyPercent}%</p>
          <span>{filledSpots} of {totalSpots} spaces filled</span>
        </div>
      </header>

      <main className="grid">
        {showAuth && !isLoggedIn ? (
          isRegistering ? (
            <RegisterPage
              username={username}
              password={password}
              confirmPassword={confirmPassword}
              error={error}
              onUsernameChange={(event) => setUsername(event.target.value)}
              onPasswordChange={(event) => setPassword(event.target.value)}
              onConfirmPasswordChange={(event) => setConfirmPassword(event.target.value)}
              onSubmit={handleSubmit}
              onSwitchToLogin={goToLogin}
            />
          ) : (
            <LoginPage
              username={username}
              password={password}
              error={error}
              onUsernameChange={(event) => setUsername(event.target.value)}
              onPasswordChange={(event) => setPassword(event.target.value)}
              onSubmit={handleSubmit}
              onSwitchToRegister={goToRegister}
              onSkip={() => {
                setShowAuth(false);
                setIsLoggedIn(true);
                setError('');
                navigate('/');
              }}
            />
          )
        ) : (
          <>
            <section className="panel">
              <h3>Quick Actions</h3>
              <div className="actions">
                <button type="button" onClick={handleEntry}>Vehicle Entry</button>
                <button type="button" onClick={handleExit}>Vehicle Exit</button>
              </div>
              <p className="helper">Available spots: {availableSpots}</p>
              {isFull ? <p className="alert">Parking lot is full.</p> : null}
            </section>

            <section className="panel">
              <h3>Available Levels</h3>
              <ul>
                <li>Level 1 — {Math.max(0, 8 - Math.floor(filledSpots / 3))} open</li>
                <li>Level 2 — {Math.max(0, 8 - Math.floor((filledSpots + 2) / 3))} open</li>
                <li>Level 3 — {Math.max(0, 9 - Math.ceil(filledSpots / 3))} open</li>
              </ul>
            </section>

            <section className="panel full-width">
              <h3>Latest Activity</h3>
              {activityLog.map((item, index) => (
                <p key={`${item}-${index}`}>{item}</p>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
