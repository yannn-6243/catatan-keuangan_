# 📋 PANDUAN LENGKAP SETUP CATATAN KEUANGAN

## Daftar Isi
1. [Persiapan Awal](#persiapan-awal)
2. [Setup Database MySQL](#setup-database-mysql)
3. [Konfigurasi Email Gmail](#konfigurasi-email-gmail)
4. [Setup Backend Node.js](#setup-backend-nodejs)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## Persiapan Awal

### Installasi Software Wajib

#### 1. Node.js (untuk Backend)
- Download: https://nodejs.org (LTS version)
- Pilih versi 18+ atau 20+ LTS
- Install dengan Next → Next → Finish
- Verifikasi instalasi di Command Prompt:
  ```bash
  node --version
  npm --version
  ```

#### 2. MySQL Server
- Download: https://dev.mysql.com/downloads/mysql/
- Pilih "Windows (x86, 64-bit)" 
- Jalankan installer
- Di konfigurasi:
  - Port: **3306** (default)
  - Username: **root**
  - Password: **Anda pilih** (catat untuk nanti!)
  - Windows Service: Centang "Configure MySQL Server as a Windows Service"

- Verifikasi instalasi di Command Prompt:
  ```bash
  mysql --version
  ```

#### 3. MySQL Workbench (GUI untuk Database)
- Download: https://dev.mysql.com/downloads/workbench/
- Install biasa saja
- Ini memudahkan manage database dari GUI

---

## Setup Database MySQL

### Cara 1: Menggunakan Command Prompt (Termudah)

```bash
# 1. Buka Command Prompt / PowerShell
# Windows: Tekan Win + R, ketik "cmd", Enter

# 2. Login ke MySQL
mysql -u root -p

# Masukkan password yang Anda set tadi

# 3. Copy-paste semua query dari database.sql:

CREATE DATABASE IF NOT EXISTS catatan_keuangan;
USE catatan_keuangan;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nama_lengkap VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS password_resets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transaksi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    tipe VARCHAR(20) NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    jumlah DECIMAL(15, 2) NOT NULL,
    deskripsi TEXT,
    tanggal DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_date (user_id, tanggal)
);

CREATE TABLE IF NOT EXISTS kategori (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    nama VARCHAR(50) NOT NULL,
    tipe VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_kategori (user_id, nama, tipe)
);

# 4. Verifikasi
SHOW DATABASES;
USE catatan_keuangan;
SHOW TABLES;

# 5. Exit
exit;
```

### Cara 2: Menggunakan MySQL Workbench (GUI)

1. Buka MySQL Workbench
2. Klik "+" di "MySQL Connections"
3. Setup connection baru dengan credentials Anda
4. Double-click connection untuk connect
5. File → Open SQL Script → Pilih `database.sql`
6. Tekan Ctrl+Shift+Enter atau klik tombol Execute

---

## Konfigurasi Email Gmail

### Langkah-Langkah

#### 1. Masuk ke Google Account
- Buka https://myaccount.google.com
- Pastikan Anda login dengan akun Gmail yang ingin digunakan

#### 2. Enable 2-Step Verification (Keamanan Berlapis)
- Di sidebar kiri, pilih **"Security"** (Keamanan)
- Cari **"2-Step Verification"** 
- Klik tombol **"Get Started"**
- Ikuti proses verifikasi via SMS/Authenticator app
- Selesai sampai ada konfirmasi "2-Step Verification is on"

#### 3. Generate App Password
- Kembali ke halaman Security
- Scroll sampai menemukan **"App passwords"** (biasanya di bawah 2-Step)
- Jika tidak ada: Pastikan 2-Step Verification sudah aktif
- Klik "App passwords"
- Pilih:
  - Select app: **"Mail"**
  - Select device: **"Windows Computer"**
- Klik Generate
- Google akan menampilkan password **16 karakter**
- **COPY password ini** - Anda akan butuhnya

Contoh: `abcd efgh ijkl mnop`

---

## Setup Backend Node.js

### 1. Buka Folder Project

```bash
# Windows Command Prompt atau PowerShell
cd C:\Users\ACER\Downloads\"catatan keuangan"

# Atau gunakan Windows Explorer:
# 1. Buka C:\Users\ACER\Downloads
# 2. Klik kanan pada "catatan keuangan"
# 3. Pilih "Open in Terminal" atau "Open in PowerShell"
```

### 2. Buat File .env

Pertama, copy `.env.example` menjadi `.env`:

```bash
# Windows
copy .env.example .env
```

Atau manual:
1. Buka folder "catatan keuangan" 
2. Buka `.env.example` dengan Notepad
3. File → Save As...
4. Nama: `.env`
5. Save

### 3. Edit File .env

Buka file `.env` dengan Notepad/VS Code dan edit:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=PASSWORD_MYSQL_ANDA_DISINI
DB_NAME=catatan_keuangan
DB_PORT=3306

# JWT Secret (Bisa apa saja, minimal 20 karakter)
JWT_SECRET=ini_rahasia_untuk_token_jwt_minimal_20_karakter

# Email Configuration - Gunakan Gmail App Password
EMAIL_USER=email_anda@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_FROM=noreply@catatan-keuangan.com

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URL (untuk link reset password di email)
FRONTEND_URL=http://localhost
```

**PENTING:**
- `DB_PASSWORD`: Ganti dengan password MySQL Anda
- `EMAIL_USER`: Ganti dengan email Gmail Anda
- `EMAIL_PASSWORD`: Ganti dengan App Password 16 karakter dari Google (tanpa spasi atau dengan spasi, sama saja)

### 4. Install Dependencies

```bash
npm install
```

Ini akan download semua package yang diperlukan ke folder `node_modules`.

### 5. Jalankan Server

```bash
npm start
```

Output yang diharapkan:
```
Server berjalan di port 3001
```

**JANGAN TUTUP TERMINAL INI** - Biarkan server terus berjalan.

---

## Testing

### 1. Buka Aplikasi

Di browser favorit Anda:
```
http://localhost/login.html
```

Atau jika file dibuka langsung, refresh halaman.

### 2. Test Registrasi

1. Klik tombol **"Daftar sekarang"**
2. Isi form:
   - Nama Lengkap: `John Doe`
   - Username: `johndoe`
   - Email: `john@gmail.com`
   - Password: `password123`
3. Klik **"Daftar"**
4. Jika berhasil → Langsung login dan masuk ke dashboard

### 3. Test Reset Password

1. Di halaman login, klik **"Lupa password?"**
2. Masukkan email yang tadi didaftar: `john@gmail.com`
3. Klik **"Kirim Link Reset"**
4. Buka email Anda (tunggu beberapa detik)
   - Cek folder **Inbox** atau **Spam**
5. Klik link **"Reset Password"** di email
6. Masukkan password baru 2x
7. Klik **"Reset Password"**
8. Akan redirect ke login
9. Login dengan password baru

### 4. Test Fitur Transaksi

1. Login dengan akun yang dibuat
2. Akan masuk ke dashboard
3. Klik **"+ Tambah Transaksi"**
4. Isi form transaksi
5. Klik **"Simpan"**
6. Transaksi akan muncul di list

---

## Troubleshooting

### ❌ "npm is not recognized"
**Solusi:**
- Node.js belum diinstall atau PATH belum set
- Restart Command Prompt / Computer
- Reinstall Node.js

### ❌ "Cannot GET /api/auth/login"
**Solusi:**
- Backend belum berjalan
- Jalankan `npm start` di terminal
- Pastikan port 3001 tidak dipakai aplikasi lain

### ❌ "connect ECONNREFUSED 127.0.0.1:3306"
**Solusi:**
- MySQL Server belum running
- Windows: 
  - Buka Services (Win + R → services.msc)
  - Cari "MySQL80" atau "MySQL57" (tergantung versi)
  - Klik kanan → Start
- Atau restart komputer

### ❌ "Access denied for user 'root'@'localhost'"
**Solusi:**
- Password di `.env` salah
- Edit `.env` → Pastikan `DB_PASSWORD` benar
- Restart server: Stop (Ctrl+C) → `npm start` lagi

### ❌ "Email failed to send"
**Solusi:**
- Gmail 2-Step Verification belum enabled
- App Password tidak benar (cek di .env)
- Pastikan EMAIL_USER dan EMAIL_PASSWORD benar
- Gmail mungkin reject koneksi: Login Gmail → Google Account Security → Allow "Less secure app access"
- Atau gunakan App Password (lebih recommended)

### ❌ Database sudah ada tapi ingin reset
```bash
mysql -u root -p
DROP DATABASE catatan_keuangan;
# Lalu jalankan query CREATE DATABASE lagi
```

### ❌ Lupa MySQL Password
```bash
# Windows: Buka MySQL Command Line Client sebagai Administrator
# Atau gunakan MySQL Workbench untuk reset password
```

---

## Struktur Database

### Tabel: users
Menyimpan informasi user
```sql
id | username | email | password_hash | nama_lengkap | created_at
```

### Tabel: password_resets
Token untuk reset password (auto-delete setelah 24 jam)
```sql
id | user_id | token | expires_at | created_at
```

### Tabel: transaksi
Menyimpan setiap transaksi user
```sql
id | user_id | tipe | kategori | jumlah | deskripsi | tanggal | created_at
```

### Tabel: kategori
Kategori custom yang dibuat user
```sql
id | user_id | nama | tipe | created_at
```

---

## File Penting

| File | Fungsi |
|------|--------|
| `login.html` | Halaman login, register, reset password |
| `index.html` | Dashboard utama |
| `server.js` | Backend API (Node.js + Express) |
| `auth.js` | Helper function untuk authentication |
| `database.sql` | Schema database |
| `.env` | Konfigurasi (JANGAN PUSH ke Git) |
| `package.json` | Dependencies Node.js |

---

## Keamanan

⚠️ **PENTING untuk Production:**

1. **Jangan share `.env` file** - Berisi password dan secret key
2. **Ganti JWT_SECRET** dengan string random yang panjang
3. **Gunakan HTTPS** (SSL Certificate)
4. **Jangan hardcode API_URL** di frontend - Gunakan environment variables
5. **Validate input** di backend (sudah ada di code)
6. **Sanitize database queries** - Gunakan prepared statements (sudah ada)
7. **Rate limiting** - Biar tidak bisa di-spam
8. **Email provider** - Gunakan SendGrid/Mailgun di production (bukan Gmail)

---

## Next Steps

Setelah semua berjalan:

1. **Tambahkan fitur lain:**
   - Category management
   - Budget alerts
   - Analytics dashboard
   - Monthly reports

2. **Deploy ke server:**
   - Heroku
   - Vercel (frontend)
   - AWS / Digital Ocean (backend)
   - Railway.app

3. **Improve UI/UX:**
   - Add loading states
   - Better error messages
   - Offline support (PWA)

4. **Database optimization:**
   - Add indexes
   - Query optimization
   - Backup strategy

---

## Bantuan Lebih Lanjut

### Dokumentasi Resmi
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com
- MySQL: https://dev.mysql.com/doc
- Nodemailer: https://nodemailer.com

### Stack Overflow
- Jika error, search di https://stackoverflow.com dengan error message

### Tools Berguna
- Postman: Test API endpoint
- VS Code: Code editor
- DBeaver: GUI untuk manage database

---

**Selamat! Aplikasi Anda siap digunakan.** 🎉
