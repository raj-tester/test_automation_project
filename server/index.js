const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5001;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Helper: Read users from file
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return data ? JSON.parse(data) : [];
}

// Helper: Write users to file
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  const users = readUsers();
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users.push({ email, password });
  writeUsers(users);
  res.status(201).json({ message: 'User registered successfully.' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  // Set a simple session cookie
  res.cookie('auth', email, { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Login successful.' });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('auth');
  res.json({ message: 'Logged out successfully.' });
});

// Auth check endpoint
app.get('/api/me', (req, res) => {
  const email = req.cookies.auth;
  if (!email) return res.status(401).json({ message: 'Not authenticated.' });
  res.json({ email });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 