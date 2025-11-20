const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- IN-MEMORY FALLBACK DATA (For testing without DB) ---
let MEMORY_USERS = [
  { id: 1, username: 'DemoUser', email: 'demo@cafe.com', password: '123', points: 1250, wins: 12, gamesPlayed: 25 }
];
let MEMORY_GAMES = [
  { id: 1, hostName: 'GamerTr_99', gameType: 'Taş Kağıt Makas', points: 150, table: 'MASA04', status: 'waiting' }
];
let MEMORY_REWARDS = [];

// Helper to check DB status
const isDbConnected = async () => {
  try {
    const client = await pool.connect();
    client.release();
    return true;
  } catch (e) {
    return false;
  }
};

// --- API ROUTES ---

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  if(await isDbConnected()) {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash, points) VALUES ($1, $2, $3, 100) RETURNING id, username, email, points, wins, games_played as "gamesPlayed"',
        [username, email, password] // Note: In real prod, hash password with bcrypt
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(400).json({ error: 'Kullanıcı oluşturulamadı. E-posta kullanımda olabilir.' });
    }
  } else {
    // Fallback
    if(MEMORY_USERS.find(u => u.email === email)) {
      return res.status(400).json({ error: 'E-posta kullanımda.' });
    }
    const newUser = { id: Date.now(), username, email, password, points: 100, wins: 0, gamesPlayed: 0 };
    MEMORY_USERS.push(newUser);
    res.json(newUser);
  }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if(await isDbConnected()) {
    try {
      const result = await pool.query('SELECT id, username, email, points, wins, games_played as "gamesPlayed" FROM users WHERE email = $1 AND password_hash = $2', [email, password]);
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(401).json({ error: 'Geçersiz e-posta veya şifre.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Sunucu hatası.' });
    }
  } else {
    // Fallback
    const user = MEMORY_USERS.find(u => u.email === email && u.password === password);
    if (user) res.json(user);
    else res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
  }
});

// 3. GET GAMES
app.get('/api/games', async (req, res) => {
  if(await isDbConnected()) {
    const result = await pool.query('SELECT * FROM games WHERE status = \'waiting\' ORDER BY created_at DESC');
    res.json(result.rows);
  } else {
    res.json(MEMORY_GAMES);
  }
});

// 4. CREATE GAME
app.post('/api/games', async (req, res) => {
  const { hostName, gameType, points, table } = req.body;
  
  if(await isDbConnected()) {
    try {
      const result = await pool.query(
        'INSERT INTO games (host_name, game_type, points, table_code, status) VALUES ($1, $2, $3, $4, \'waiting\') RETURNING *',
        [hostName, gameType, points, table]
      );
      res.json(result.rows[0]);
    } catch(err) {
      res.status(500).json({error: err.message});
    }
  } else {
    const newGame = { id: Date.now(), hostName, gameType, points, table, status: 'waiting' };
    MEMORY_GAMES.unshift(newGame);
    res.json(newGame);
  }
});

// 5. JOIN GAME (Delete/Archive logic)
app.post('/api/games/:id/join', async (req, res) => {
  const { id } = req.params;
  
  if(await isDbConnected()) {
    // For simplicity, we just delete it from active list or mark status active
    await pool.query('UPDATE games SET status = \'active\' WHERE id = $1', [id]);
    res.json({ success: true });
  } else {
    MEMORY_GAMES = MEMORY_GAMES.filter(g => g.id != id);
    res.json({ success: true });
  }
});

// 6. UPDATE USER (Points, Stats)
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { points, wins, gamesPlayed } = req.body;
  
  if(await isDbConnected()) {
    const result = await pool.query(
      'UPDATE users SET points = $1, wins = $2, games_played = $3 WHERE id = $4 RETURNING id, username, email, points, wins, games_played as "gamesPlayed"',
      [points, wins, gamesPlayed, id]
    );
    res.json(result.rows[0]);
  } else {
    const idx = MEMORY_USERS.findIndex(u => u.id == id);
    if(idx !== -1) {
      MEMORY_USERS[idx] = { ...MEMORY_USERS[idx], points, wins, gamesPlayed };
      res.json(MEMORY_USERS[idx]);
    } else {
      res.status(404).json({error: 'User not found'});
    }
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});