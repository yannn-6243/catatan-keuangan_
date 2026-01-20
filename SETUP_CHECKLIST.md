# ✅ SETUP VERIFICATION CHECKLIST

Gunakan checklist ini untuk memastikan semua sudah configured dengan benar sebelum testing.

---

## Phase 1: Pre-Installation

### Software Installation
- [ ] **Node.js** v14+ terinstall
  - Verify: Buka cmd → ketik `node --version` (harus v14+)
  - Verify: Ketik `npm --version` (harus v6+)

- [ ] **MySQL Server** terinstall dan running
  - Verify: Buka cmd → ketik `mysql --version`
  - Verify: `mysql -u root -p` bisa login

- [ ] **MySQL Workbench** (optional tapi recommended)
  - Useful untuk GUI management database

---

## Phase 2: Database Setup

### MySQL Database Creation
- [ ] Database `catatan_keuangan` sudah dibuat
  - Verify: `SHOW DATABASES;` harus list catatan_keuangan

- [ ] Tabel `users` sudah dibuat dengan kolom:
  - [ ] id, username, email, password, nama_lengkap, created_at, updated_at

- [ ] Tabel `password_resets` sudah dibuat dengan kolom:
  - [ ] id, user_id, token, expires_at, created_at

- [ ] Tabel `transaksi` sudah dibuat
- [ ] Tabel `kategori` sudah dibuat
- [ ] Foreign keys semua terpasang
- [ ] Indexes sudah di-create

**Verification Query:**
```sql
USE catatan_keuangan;
SHOW TABLES;
DESC users;
DESC password_resets;
```

---

## Phase 3: Gmail Configuration

### Google Account Setup
- [ ] Gmail account siap digunakan
  - Pastikan Anda punya akun Google/Gmail aktif

- [ ] 2-Step Verification sudah diaktifkan
  - Verify: https://myaccount.google.com/security → cari "2-Step Verification"
  - Status harus "On" bukan "Off"

- [ ] App Password sudah di-generate
  - Verify: https://myaccount.google.com/apppasswords
  - Generate: Select "Mail" dan "Windows Computer"
  - **COPY password 16 karakter** (terlihat seperti: `xxxx xxxx xxxx xxxx`)

### Gmail Permission
- [ ] "Allow less secure app access" (jika menggunakan password biasa)
  - OR
- [ ] Gunakan **App Password** (lebih recommended & aman)

---

## Phase 4: Backend Setup

### Project Files
- [ ] File `server.js` sudah ada
- [ ] File `package.json` sudah ada dengan dependencies:
  - [ ] express
  - [ ] mysql2
  - [ ] cors
  - [ ] dotenv
  - [ ] bcryptjs
  - [ ] jsonwebtoken
  - [ ] nodemailer
  - [ ] uuid

### Node Modules Installation
- [ ] Folder `node_modules/` ada (result dari `npm install`)
  - Verify: Dari folder project, jalankan `npm install`
  - Wait: Process install (mungkin 2-5 menit)
  - Success: Folder `node_modules/` muncul

### Environment Configuration
- [ ] File `.env` sudah dibuat (copy dari `.env.example`)
- [ ] `.env` berisi konfigurasi benar:
  - [ ] `DB_HOST=localhost`
  - [ ] `DB_USER=root`
  - [ ] `DB_PASSWORD=YOUR_MYSQL_PASSWORD` ← Ganti dengan password MySQL Anda
  - [ ] `DB_NAME=catatan_keuangan`
  - [ ] `JWT_SECRET=something_very_secret_at_least_20_chars`
  - [ ] `EMAIL_USER=your_email@gmail.com` ← Ganti dengan email Gmail Anda
  - [ ] `EMAIL_PASSWORD=xxxx xxxx xxxx xxxx` ← Ganti dengan App Password dari Google
  - [ ] `PORT=3001`

### Verification
- [ ] File `.env` bisa diakses (tidak hidden)
- [ ] Semua value di `.env` sudah di-update (tidak ada placeholder)
- [ ] Tidak ada typo di config keys

**Quick Test:**
```bash
cd c:\Users\ACER\Downloads\catatan keuangan
npm install
```

Jika ada error, catat error message untuk troubleshooting.

---

## Phase 5: Backend Server Startup

### Start Server
- [ ] Open **Terminal 1** (Command Prompt / PowerShell)
- [ ] Navigate ke folder project:
  ```bash
  cd c:\Users\ACER\Downloads\catatan keuangan
  ```
- [ ] Jalankan server:
  ```bash
  npm start
  ```

### Verification
- [ ] Output console: `Server berjalan di port 3001`
- [ ] Tidak ada error di console
- [ ] Server siap receive requests

**If Error:**
- [ ] Cek console error message
- [ ] Pastikan port 3001 tidak dipakai aplikasi lain
- [ ] Cek `.env` configuration
- [ ] Pastikan MySQL sudah running

---

## Phase 6: Frontend Files

### HTML Files
- [ ] File `login.html` ada dan berisi:
  - [ ] Form register
  - [ ] Form login
  - [ ] Form forgot password
  - [ ] Form reset password
  - [ ] JavaScript untuk API calls

- [ ] File `index.html` sudah di-update:
  - [ ] Import `auth.js`
  - [ ] Tombol logout di header
  - [ ] Check auth on load

### JavaScript Files
- [ ] File `auth.js` ada dengan functions:
  - [ ] `checkAuth()`
  - [ ] `getCurrentUser()`
  - [ ] `getAuthToken()`
  - [ ] `logout()`
  - [ ] `apiCall()`

### API Configuration
- [ ] `login.html` punya `API_URL = 'http://localhost:3001/api'`
- [ ] `auth.js` punya `API_URL = 'http://localhost:3001/api'`
- [ ] Tidak ada hardcoded URL yang salah

---

## Phase 7: Browser Testing

### Access Frontend
- [ ] Buka browser (Chrome, Firefox, Edge, Safari)
- [ ] Ketik URL: `http://localhost/login.html`
- [ ] Page loading tanpa error (bukan white blank page)

### Network Check
- [ ] Browser console tidak ada error (F12 → Console)
- [ ] Network tab menunjukkan request ke API:
  - [ ] F12 → Network → Refresh page
  - [ ] Lihat ada request ke `localhost:3001`

---

## Phase 8: API Testing

### Health Check (Optional)
- [ ] Di browser, buka: `http://localhost:3001/api/health`
- [ ] Response: `{"status":"OK","message":"Server berjalan dengan baik"}`

### Manual API Test (Recommended menggunakan Postman)
- [ ] Download Postman: https://www.postman.com/downloads/
- [ ] Test POST /auth/register:
  - [ ] Body:
    ```json
    {
      "username": "testuser",
      "email": "test@gmail.com",
      "password": "testpass123",
      "nama_lengkap": "Test User"
    }
    ```
  - [ ] Success response: Token & user data

- [ ] Test POST /auth/login:
  - [ ] Body: `{"username": "testuser", "password": "testpass123"}`
  - [ ] Success response: Token & user data

- [ ] Test POST /auth/forgot-password:
  - [ ] Body: `{"email": "test@gmail.com"}`
  - [ ] Check: Email masuk ke inbox (tunggu ~5 detik)
  - [ ] Success: Lihat link reset password di email

---

## Phase 9: Functional Testing

### Test Registration
- [ ] Buka http://localhost/login.html
- [ ] Klik "Daftar sekarang"
- [ ] Isi form:
  - [ ] Nama: Test User
  - [ ] Username: testuser
  - [ ] Email: test@gmail.com
  - [ ] Password: testpass123
- [ ] Klik "Daftar"
- [ ] Result:
  - [ ] Tidak ada error message
  - [ ] Auto redirect ke dashboard (index.html)
  - [ ] Username/nama muncul di header

### Test Login
- [ ] Klik logout (tombol merah di header)
- [ ] Buka http://localhost/login.html lagi
- [ ] Isi form:
  - [ ] Username: testuser
  - [ ] Password: testpass123
- [ ] Klik "Login"
- [ ] Result:
  - [ ] Tidak ada error
  - [ ] Redirect ke dashboard
  - [ ] Data user muncul di header

### Test Forgot Password
- [ ] Di login page, klik "Lupa password?"
- [ ] Masukkan email: test@gmail.com
- [ ] Klik "Kirim Link Reset"
- [ ] Result:
  - [ ] Success message: "Link reset password telah dikirim"
  - [ ] Buka email Anda (waitfor 5-10 detik)
  - [ ] Cek folder Inbox atau Spam
  - [ ] Ada email dari noreply@catatan-keuangan.com
  - [ ] Ada link "Reset Password"

### Test Reset Password
- [ ] Klik link "Reset Password" di email
- [ ] Browser terbuka ke: `http://localhost/reset-password?token=xxxxx`
- [ ] Form reset password muncul
- [ ] Isi form:
  - [ ] Password Baru: newpass123
  - [ ] Konfirmasi: newpass123
- [ ] Klik "Reset Password"
- [ ] Result:
  - [ ] Alert: "Password berhasil direset"
  - [ ] Redirect ke login.html
  - [ ] Login dengan username + newpass123
  - [ ] Success!

### Test Dashboard Protection
- [ ] Logout (atau clear localStorage di console)
- [ ] Buka http://localhost/index.html
- [ ] Result:
  - [ ] Auto redirect ke login.html
  - [ ] Tidak bisa akses dashboard tanpa login

---

## Phase 10: Data Verification

### Database Verification
- [ ] Login berhasil
- [ ] Buka MySQL:
  ```sql
  USE catatan_keuangan;
  SELECT * FROM users;
  ```
- [ ] Verify:
  - [ ] Ada user dengan username = testuser
  - [ ] Email = test@gmail.com
  - [ ] Password terlihat hash (bukan plaintext)
  - [ ] nama_lengkap = "Test User"

### Password Reset Token
- [ ] Lakukan forgot password
- [ ] Check database:
  ```sql
  SELECT * FROM password_resets WHERE user_id = 1;
  ```
- [ ] Verify:
  - [ ] Ada token
  - [ ] expires_at lebih dari 24 jam
  - [ ] Setelah reset password, token terhapus

---

## Phase 11: Error Handling

### Test Invalid Login
- [ ] Login dengan username salah
- [ ] Result: Error message "Username atau password salah"

- [ ] Login dengan password salah
- [ ] Result: Error message "Username atau password salah"

### Test Invalid Reset Token
- [ ] Manually visit: `http://localhost/reset-password?token=invalid123`
- [ ] Klik "Reset Password" tanpa mengisi
- [ ] Result: Error message "Token tidak valid"

### Test Email Validation
- [ ] Register dengan email yang sudah terdaftar
- [ ] Result: Error message "Email sudah terdaftar"

---

## Phase 12: Documentation Review

- [ ] README.md sudah ada dan jelas
- [ ] SETUP_GUIDE.md sudah lengkap
- [ ] API_DOCS.md sudah detail
- [ ] IMPLEMENTATION_SUMMARY.md sudah informatif

---

## ✨ Final Verification Checklist

### All Systems Go?
- [ ] Database ✅
- [ ] Backend ✅
- [ ] Frontend ✅
- [ ] Authentication ✅
- [ ] Email Reset ✅
- [ ] Error Handling ✅
- [ ] Documentation ✅

### Ready to Deploy?
- [ ] Semua test passed ✅
- [ ] Tidak ada console error ✅
- [ ] Database backup taken ✅
- [ ] .env tidak committed ke Git ✅
- [ ] Security best practices implemented ✅

---

## 🎯 Troubleshooting Guide

Jika ada yang tidak sesuai, lihat:

| Issue | Solution File | Section |
|-------|---------------|---------|
| Setup questions | SETUP_GUIDE.md | Troubleshooting |
| API errors | API_DOCS.md | Error Codes |
| Database issues | SETUP_GUIDE.md | Setup Database MySQL |
| Email not sending | SETUP_GUIDE.md | Konfigurasi Email Gmail |
| Backend not starting | SETUP_GUIDE.md | Troubleshooting |

---

## 📞 Support

Jika masih ada issue:

1. **Check console error** (F12 → Console)
2. **Read the docs** (file .md yang sesuai)
3. **Google the error** (copy-paste error message)
4. **Stack Overflow** (https://stackoverflow.com)

---

**Status:** Ready for Production ✅

**Last Updated:** January 20, 2026

**Version:** 1.0.0
