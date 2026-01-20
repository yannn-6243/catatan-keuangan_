# ⚡ QUICK COMMANDS REFERENCE

Kumpulan command yang sering digunakan saat development dan troubleshooting.

---

## 📦 Project Setup

### Inisialisasi Project
```bash
# Navigate ke folder project
cd C:\Users\ACER\Downloads\"catatan keuangan"

# Install dependencies
npm install

# Copy environment file
copy .env.example .env

# Edit .env dengan text editor
notepad .env
```

---

## 🗄️ Database Commands

### MySQL Connection
```bash
# Connect ke MySQL
mysql -u root -p

# Masukkan password MySQL Anda
# Tekan Enter
```

### Setup Database
```sql
-- Copy-paste semua dari database.sql
CREATE DATABASE IF NOT EXISTS catatan_keuangan;
USE catatan_keuangan;

-- Paste semua CREATE TABLE statements
-- ...

-- Verify
SHOW DATABASES;
USE catatan_keuangan;
SHOW TABLES;
DESCRIBE users;
```

### Check Data
```sql
-- Lihat semua users
SELECT id, username, email, nama_lengkap, created_at FROM users;

-- Lihat password resets yang active
SELECT * FROM password_resets WHERE expires_at > NOW();

-- Lihat transaksi user tertentu
SELECT * FROM transaksi WHERE user_id = 1;

-- Lihat kategori
SELECT * FROM kategori;
```

### Reset/Clear Data
```sql
-- Hapus all users (WARNING: CASCADE delete semua data)
DELETE FROM users;

-- Reset auto increment
ALTER TABLE users AUTO_INCREMENT = 1;

-- Hapus semua password reset tokens
DELETE FROM password_resets;

-- Drop entire database (WARNING!)
DROP DATABASE catatan_keuangan;
```

### Backup Database
```bash
# Backup ke file SQL
mysqldump -u root -p catatan_keuangan > backup_20260120.sql

# Restore dari file
mysql -u root -p catatan_keuangan < backup_20260120.sql
```

---

## 🚀 Server Commands

### Start Backend Server
```bash
# Terminal 1 - Jalankan backend
cd C:\Users\ACER\Downloads\"catatan keuangan"
npm start

# Output: Server berjalan di port 3001
```

### Stop Server
```bash
# Tekan di terminal
Ctrl + C

# Confirm: Y dan Enter
```

### Restart Server
```bash
# Tekan Ctrl+C untuk stop
Ctrl + C

# Jalankan lagi
npm start
```

### Development Mode (dengan auto-reload)
```bash
# Butuh install nodemon dulu
npm install -g nodemon

# Jalankan dengan auto-reload
nodemon server.js

# Server akan auto-restart jika ada perubahan file
```

### Check Port Usage
```bash
# Windows - Cek port 3001
netstat -ano | findstr :3001

# Kill process di port 3001
taskkill /PID <PID> /F
```

---

## 🧪 API Testing

### Using curl (Command Prompt)
```bash
# Health check
curl http://localhost:3001/api/health

# Register
curl -X POST http://localhost:3001/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@gmail.com\",\"password\":\"pass123\",\"nama_lengkap\":\"Test User\"}"

# Login
curl -X POST http://localhost:3001/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"pass123\"}"

# Forgot password
curl -X POST http://localhost:3001/api/auth/forgot-password ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@gmail.com\"}"
```

### Using Postman
```
1. Download: https://www.postman.com/downloads
2. Create new Request
3. Method: POST
4. URL: http://localhost:3001/api/auth/login
5. Headers: Content-Type: application/json
6. Body (raw JSON):
   {
     "username": "testuser",
     "password": "pass123"
   }
7. Click Send
8. Response muncul di bawah
```

---

## 🔧 Common Fixes

### Restart MySQL
```bash
# Windows Services
# Method 1: GUI
# Win + R → services.msc → Cari MySQL → Right Click → Start/Restart

# Method 2: Command Prompt (As Administrator)
net stop MySQL80
net start MySQL80

# Atau untuk versi lain (MySQL57, MySQL56, dll)
net stop MySQL57
net start MySQL57
```

### Clear npm Cache
```bash
npm cache clean --force
npm install
```

### Reset node_modules
```bash
# Delete node_modules folder
rmdir /s node_modules

# Delete package-lock.json
del package-lock.json

# Reinstall
npm install
```

### Check npm Installed Packages
```bash
npm list

# List global packages
npm list -g
```

---

## 📁 File Viewing

### View .env File
```bash
# Windows - Buka di Notepad
notepad .env

# Atau di VS Code
code .env
```

### View Logs
```bash
# Server console sudah show logs
# Check di terminal where npm start is running

# Atau save logs ke file
npm start > server.log 2>&1
```

### List Project Files
```bash
# List folder structure
dir /s

# List hanya file .js
dir /s *.js

# List hanya file .html
dir /s *.html

# List hanya file .sql
dir /s *.sql
```

---

## 🌐 Browser Console

### Test API dari Console
```javascript
// Open browser → F12 → Console

// Test register
fetch('http://localhost:3001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testuser',
    email: 'test@gmail.com',
    password: 'pass123',
    nama_lengkap: 'Test User'
  })
}).then(r => r.json()).then(console.log)

// Test login
fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'testuser',
    password: 'pass123'
  })
}).then(r => r.json()).then(console.log)

// Check localStorage
localStorage.getItem('token')
localStorage.getItem('user')

// Clear localStorage
localStorage.clear()

// Set localStorage manually (for testing)
localStorage.setItem('token', 'YOUR_TOKEN_HERE')
```

---

## 📊 Useful SQL Queries

### Count Users
```sql
SELECT COUNT(*) as total_users FROM users;
```

### Count Transactions
```sql
SELECT COUNT(*) as total_transaksi FROM transaksi;
SELECT SUM(jumlah) as total_pengeluaran FROM transaksi WHERE tipe='pengeluaran';
SELECT SUM(jumlah) as total_pemasukan FROM transaksi WHERE tipe='pemasukan';
```

### User Stats
```sql
SELECT 
  u.username,
  COUNT(t.id) as jumlah_transaksi,
  SUM(CASE WHEN t.tipe='pemasukan' THEN t.jumlah ELSE 0 END) as total_masuk,
  SUM(CASE WHEN t.tipe='pengeluaran' THEN t.jumlah ELSE 0 END) as total_keluar
FROM users u
LEFT JOIN transaksi t ON u.id = t.user_id
GROUP BY u.id;
```

### User Transaction History
```sql
SELECT t.*, u.username
FROM transaksi t
JOIN users u ON t.user_id = u.id
WHERE u.id = 1
ORDER BY t.tanggal DESC;
```

### Find Expired Reset Tokens
```sql
SELECT * FROM password_resets WHERE expires_at < NOW();

-- Delete expired tokens
DELETE FROM password_resets WHERE expires_at < NOW();
```

---

## 🚢 Deployment Commands

### Build for Production
```bash
# Set environment
set NODE_ENV=production

# Or dengan PowerShell
$env:NODE_ENV = "production"

# Jalankan
npm start
```

### Using PM2 (Process Manager)
```bash
# Install PM2 global
npm install -g pm2

# Start dengan PM2
pm2 start server.js --name "catatan-keuangan"

# Monitor
pm2 monit

# Logs
pm2 logs catatan-keuangan

# Stop
pm2 stop catatan-keuangan

# Restart
pm2 restart catatan-keuangan

# Setup auto-start on reboot
pm2 startup
pm2 save
```

### Docker (Optional)
```bash
# Build image
docker build -t catatan-keuangan .

# Run container
docker run -p 3001:3001 --env-file .env catatan-keuangan

# Or with docker-compose
docker-compose up -d
```

---

## 📝 Git Commands (Version Control)

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### Ignore Sensitive Files
```bash
# Create .gitignore
echo node_modules/ > .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo package-lock.json >> .gitignore

# Commit .gitignore
git add .gitignore
git commit -m "Add .gitignore"
```

### Update to Latest
```bash
git pull origin main
npm install
```

---

## 🔍 Debugging

### Enable Debug Mode
```bash
# Set debug
set DEBUG=*

# Atau di PowerShell
$env:DEBUG = "*"

# Jalankan
npm start
```

### Check Errors
```bash
# View terminal output (sudah automatic)
# Errors akan muncul di terminal tempat npm start

# Atau check browser console
F12 → Console → Lihat error messages
```

### Monitor Network
```bash
# Browser
F12 → Network tab → Do action → See all requests

# Check Response tab untuk error details
# Check Preview tab untuk response body
```

---

## 📞 Emergency Fixes

### Server tidak merespons?
```bash
# Restart server
# Terminal: Ctrl + C
# Jalankan: npm start

# Atau kill port dan restart
netstat -ano | findstr :3001
taskkill /PID <PID> /F
npm start
```

### Database connection error?
```bash
# Restart MySQL
net stop MySQL80
net start MySQL80

# Atau gunakan Services GUI
# Win + R → services.msc

# Check connection
mysql -u root -p
SELECT 1;
exit;
```

### Email not sending?
```bash
# Check .env
notepad .env

# Verify:
# - EMAIL_USER benar (gmail address)
# - EMAIL_PASSWORD benar (16 char app password, bukan password akun)
# - 2-Step Verification aktif di Google Account

# Restart server after .env change
Ctrl + C
npm start
```

### Can't login?
```bash
# Check user di database
mysql -u root -p
USE catatan_keuangan;
SELECT * FROM users WHERE username='testuser';

# Check password hash
SELECT * FROM users WHERE id=1\G

# Test manually
# Try register new user dan test login dengan akun baru
```

---

## 🎯 Workflow Commands

### Full Restart Workflow
```bash
# 1. Stop server (Ctrl+C in terminal)
# 2. Restart MySQL
net stop MySQL80
net start MySQL80

# 3. Restart server
npm start

# 4. Test in browser
# http://localhost/login.html
```

### Complete Reset Workflow
```bash
# 1. Stop server
Ctrl + C

# 2. Reset database
mysql -u root -p
DROP DATABASE catatan_keuangan;
# Paste all from database.sql

# 3. Clear browser storage
# Open http://localhost/login.html
# F12 → Console → localStorage.clear()
# Refresh page

# 4. Restart server
npm start
```

### Push to Production Workflow
```bash
# 1. Test locally
npm start
# Test semua fitur

# 2. Stop server
Ctrl + C

# 3. Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# 4. Deploy ke server
# SSH into server
ssh user@server.com
cd /var/www/catatan-keuangan
git pull origin main
npm install
pm2 restart catatan-keuangan
```

---

## 📚 References

| Command | Purpose |
|---------|---------|
| `npm start` | Start backend server |
| `npm install` | Install dependencies |
| `npm list` | List installed packages |
| `mysql -u root -p` | Connect to MySQL |
| `git push` | Push code to repository |
| `pm2 start` | Start with process manager |
| `docker build` | Build Docker image |
| `curl` | Test API endpoint |

---

**Last Updated:** January 20, 2026

**Version:** 1.0.0

**Save this file for quick reference!** 📌
