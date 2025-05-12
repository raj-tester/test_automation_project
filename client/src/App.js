import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/signup', { email, password });
      setMessage('Signup successful! Please login.');
      setView('login');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/login', { email, password });
      const res = await axios.get('http://localhost:5000/api/me');
      setUser(res.data);
      setView('home');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed.');
    }
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/logout');
    setUser(null);
    setView('login');
    setMessage('Logged out successfully.');
  };

  if (user && view === 'home') {
    return (
      <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
        <h2>Welcome, {user.email}!</h2>
        <button onClick={handleLogout}>Logout</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>{view === 'signup' ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={view === 'signup' ? handleSignup : handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 10 }}
          />
        </div>
        <button type="submit" style={{ width: '100%' }}>
          {view === 'signup' ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <div style={{ marginTop: 10 }}>
        {view === 'signup' ? (
          <span>
            Already have an account?{' '}
            <button onClick={() => { setView('login'); setMessage(''); }} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>Login</button>
          </span>
        ) : (
          <span>
            Don&apos;t have an account?{' '}
            <button onClick={() => { setView('signup'); setMessage(''); }} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>Sign Up</button>
          </span>
        )}
      </div>
      {message && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
}

export default App; 