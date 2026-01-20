require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost',
        'http://localhost:5500', // VS Code Live Server
        'http://127.0.0.1',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());

// Create MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// ============ HELPER FUNCTIONS ============

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Verify JWT Token (Middleware)
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token tidak valid' });
    }
};

// ============ AUTHENTICATION ROUTES ============

// REGISTER
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, nama_lengkap } = req.body;

        // Validasi input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, dan password harus diisi' });
        }

        const conn = await pool.getConnection();
        
        // Check if user already exists
        const [existing] = await conn.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existing.length > 0) {
            await conn.release();
            return res.status(400).json({ error: 'Username atau email sudah terdaftar' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await conn.query(
            'INSERT INTO users (username, email, password, nama_lengkap) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, nama_lengkap || username]
        );

        await conn.release();

        const userId = result.insertId;
        const token = generateToken(userId);

        res.status(201).json({
            message: 'Registrasi berhasil',
            token,
            user: {
                id: userId,
                username,
                email,
                nama_lengkap: nama_lengkap || username
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username dan password harus diisi' });
        }

        const conn = await pool.getConnection();

        const [users] = await conn.query(
            'SELECT id, username, email, password, nama_lengkap FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            await conn.release();
            return res.status(401).json({ error: 'Username atau password salah' });
        }

        const user = users[0];
        const passwordValid = await bcrypt.compare(password, user.password);

        if (!passwordValid) {
            await conn.release();
            return res.status(401).json({ error: 'Username atau password salah' });
        }

        await conn.release();

        const token = generateToken(user.id);

        res.json({
            message: 'Login berhasil',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                nama_lengkap: user.nama_lengkap
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// ============ PASSWORD RESET ROUTES ============

// REQUEST PASSWORD RESET
app.post('/api/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email harus diisi' });
        }

        const conn = await pool.getConnection();

        const [users] = await conn.query(
            'SELECT id, username, email FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            await conn.release();
            return res.status(404).json({ error: 'Email tidak terdaftar' });
        }

        const user = users[0];
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam

        // Save reset token
        await conn.query(
            'INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)',
            [user.id, token, expiresAt]
        );

        await conn.release();

        // Send email
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset Password - CatatUang Pro',
            html: `
                <h2>Permintaan Reset Password</h2>
                <p>Halo ${user.username},</p>
                <p>Anda telah meminta untuk mereset password akun Anda. Klik tombol di bawah untuk melanjutkan:</p>
                <p><a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a></p>
                <p>Atau copy link berikut: ${resetUrl}</p>
                <p>Link ini berlaku selama 24 jam.</p>
                <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
                <hr>
                <p><small>CatatUang Pro - Aplikasi Pencatat Keuangan</small></p>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
                return res.status(500).json({ error: 'Gagal mengirim email' });
            }
            res.json({ message: 'Email reset password telah dikirim' });
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// VERIFY RESET TOKEN
app.post('/api/auth/verify-reset-token', async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Token harus diisi' });
        }

        const conn = await pool.getConnection();

        const [resets] = await conn.query(
            'SELECT user_id FROM password_resets WHERE token = ? AND expires_at > NOW()',
            [token]
        );

        await conn.release();

        if (resets.length === 0) {
            return res.status(400).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
        }

        res.json({ message: 'Token valid', user_id: resets[0].user_id });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// RESET PASSWORD
app.post('/api/auth/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ error: 'Token dan password harus diisi' });
        }

        const conn = await pool.getConnection();

        // Verify token
        const [resets] = await conn.query(
            'SELECT user_id FROM password_resets WHERE token = ? AND expires_at > NOW()',
            [token]
        );

        if (resets.length === 0) {
            await conn.release();
            return res.status(400).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
        }

        const userId = resets[0].user_id;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password
        await conn.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, userId]
        );

        // Delete used token
        await conn.query(
            'DELETE FROM password_resets WHERE user_id = ?',
            [userId]
        );

        await conn.release();

        res.json({ message: 'Password berhasil direset' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// ============ USER ROUTES ============

// GET USER PROFILE
app.get('/api/user/profile', verifyToken, async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [users] = await conn.query(
            'SELECT id, username, email, nama_lengkap, created_at FROM users WHERE id = ?',
            [req.userId]
        );
        await conn.release();

        if (users.length === 0) {
            return res.status(404).json({ error: 'User tidak ditemukan' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Profile error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// UPDATE USER PROFILE
app.put('/api/user/profile', verifyToken, async (req, res) => {
    try {
        const { nama_lengkap, email } = req.body;
        const conn = await pool.getConnection();

        await conn.query(
            'UPDATE users SET nama_lengkap = ?, email = ? WHERE id = ?',
            [nama_lengkap, email, req.userId]
        );

        const [users] = await conn.query(
            'SELECT id, username, email, nama_lengkap FROM users WHERE id = ?',
            [req.userId]
        );
        await conn.release();

        res.json({ message: 'Profil berhasil diupdate', user: users[0] });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server berjalan dengan baik' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan server' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
