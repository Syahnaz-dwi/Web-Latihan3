const express = require('express');
const app = express();
const PORT = 8001;

// Token rahasia (hardcode, bisa juga dari .env)
const TOKEN = "mysecrettoken";

// Middleware sederhana untuk cek Bearer Token
function authBearer(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
        } 
    if (!token) {
        return res.status(403).json({ error: 'Token salah atau tidak valid' });
    }

    next();
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

app.get('/api/about', (req, res) => {
    res.json([
        { id: 1, name: 'Andi', job: 'Senior Programer' },
        { id: 2, name: 'Budi', job: 'Technical Report' },
        { id: 3, name: 'Cindi', job: 'Front End Programer' },
        { id: 4, name: 'Deli', job: 'UI/UX Designer' },
        { id: 5, name: 'Erlang', job: 'Marketing' }
    ]);
});

app.get('/api/payments', authBearer, (req, res) => {
    res.json([
        { id: 101, name: 'Andi', amount: 150000, status: 'Suscess', method: 'Bank Transfer' },
        { id: 102, name: 'Budi', amount: 250000, status: 'Pending', method: 'Credit Card' },
        { id: 103, name: 'Cici', amount: 50000, status: 'Failed', method: 'E-Wallet' },
    ]);
});