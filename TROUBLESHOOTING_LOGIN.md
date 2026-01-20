# 🔧 Troubleshooting: Kesalahan Jaringan Saat Login

Jika Anda mendapat error **"Tidak bisa terhubung ke server"** saat login, ikuti panduan ini.

---

## ❌ Error: "Tidak bisa terhubung ke server. Pastikan backend sudah running di http://localhost:3001"

Ini berarti **backend API tidak berjalan** atau tidak bisa diakses. Berikut cara fix:

### ✅ Solusi 1: Start Backend Server (PALING MUNGKIN)

**Step 1: Buka Command Prompt / PowerShell**
```bash
# Tekan: Win + R
# Ketik: cmd
# Enter
```

**Step 2: Navigate ke folder project**
```bash
cd C:\Users\ACER\Downloads\"catatan keuangan"
```

**Step 3: Start backend**
```bash
npm start
```

**Expected Output:**
```
Server berjalan di port 3001
```

**Jika melihat output ini = SUKSES!**

Sekarang buka browser: `http://localhost/login.html` dan try login lagi.

---

## ❌ Error: "npm is not recognized"

Backend npm tidak terinstall.

### ✅ Solusi:

1. **Install Node.js**
   - Download: https://nodejs.org (LTS version)
   - Install dengan Next → Next → Finish
   
2. **Restart Command Prompt**

3. **Verify:**
   ```bash
   node --version
   npm --version
   ```

4. **Try lagi:**
   ```bash
   npm install
   npm start
   ```

---

## ❌ Error: "Cannot find module ..."

Dependencies tidak terinstall.

### ✅ Solusi:

```bash
cd C:\Users\ACER\Downloads\"catatan keuangan"
npm install
npm start
```

---

## ❌ Error: "ECONNREFUSED" atau "Connect failed"

Backend running tapi ada issue connection.

### ✅ Solusi:

**Check 1: Backend benar-benar running?**
- Lihat di terminal: ada "Server berjalan di port 3001"?
- Jika tidak, jalankan: `npm start`

**Check 2: Port 3001 digunakan aplikasi lain?**
```bash
netstat -ano | findstr :3001
```

Jika ada PID, kill process itu:
```bash
taskkill /PID <PID_NUMBER> /F
```

Lalu jalankan: `npm start` lagi

**Check 3: .env configuration benar?**

Buka file `.env` dan check:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
```

- Apakah DB_PASSWORD benar?
- Apakah MySQL running?

**Check MySQL:**
```bash
mysql -u root -p
# Masukkan password
# Jika masuk = MySQL OK
exit
```

---

## ❌ Error: "Failed to fetch"

CORS error atau network issue.

### ✅ Solusi:

**Check 1: Backend sudah running?**
```bash
npm start
```

**Check 2: Console error message lebih detail?**

Tekan `F12` di browser:
- Tab: Console
- Lihat red error messages
- Copy error message lengkapnya
- Baca di bawah untuk kategori yang sesuai

**Check 3: Browser firewall?**

Beberapa browser/antivirus block localhost:
- Try buka incognito mode
- Try browser lain (Chrome, Firefox, Edge)

---

## ❌ Error: "TypeError: Cannot read property..."

Ada bug di JavaScript.

### ✅ Solusi:

1. **Buka browser console (F12)**
2. **Check error message lengkapnya**
3. **Restart browser & backend:**
   ```bash
   # Terminal: Ctrl + C (stop backend)
   npm start
   ```
4. **Refresh page: F5**

---

## ✅ Debugging Checklist

Sebelum contact support, pastikan sudah check:

- [ ] Backend server running (`npm start` muncul di terminal)
- [ ] Port 3001 tidak error
- [ ] MySQL server running
- [ ] `.env` file ada dan config benar
- [ ] Browser console dibuka (F12) dan lihat error message
- [ ] No antivirus blocking localhost:3001
- [ ] Terminal tidak di-close setelah `npm start`

---

## 🔍 Check Network Call

Untuk debug lebih detail:

1. **Buka browser F12**
2. **Tab: Network**
3. **Try login**
4. **Lihat request:**
   - URL harus: `http://localhost:3001/api/auth/login`
   - Status harus: 200 (jika sukses) atau 401 (jika user tidak ada)
   - Jika red = server error

---

## 📋 Checklist Sebelum Login

✅ Backend Server
```bash
npm start
# Output: Server berjalan di port 3001
```

✅ MySQL Server
```bash
mysql -u root -p
# Berhasil login = OK
exit
```

✅ Database
```bash
mysql -u root -p
USE catatan_keuangan;
SHOW TABLES;
# Harus ada: users, password_resets, transaksi, kategori
exit
```

✅ .env Configuration
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=CORRECT_PASSWORD
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=app_password_dari_google
```

✅ Browser
- Buka: `http://localhost/login.html`
- Console: F12 → lihat ada error?

---

## 🆘 Still Stuck?

Ikuti langkah ini:

### 1. Collect Information
- Screenshot dari error message
- Error message dari browser console (F12)
- Output dari terminal backend

### 2. Check Documentation
- `SETUP_GUIDE.md` - Troubleshooting section
- `QUICK_COMMANDS.md` - Useful commands

### 3. Manual Test API (Postman)

Download Postman: https://www.postman.com

Test endpoint:
```
Method: POST
URL: http://localhost:3001/api/health
```

Response should be:
```json
{"status":"OK","message":"Server berjalan dengan baik"}
```

Jika error = backend issue

---

## 📊 Common Issues & Solutions

| Error | Penyebab | Solusi |
|-------|---------|--------|
| Cannot GET /api/login | Backend belum start | `npm start` |
| ECONNREFUSED | Localhost:3001 unreachable | Check `.env` & MySQL |
| Failed to fetch | CORS/network blocked | Try incognito/browser lain |
| TypeError | JavaScript error | Check browser console (F12) |
| 401 Unauthorized | Username/password salah | Cek user ada di database |
| 500 Server Error | Backend error | Cek terminal untuk error message |

---

## ✨ Tips Debugging

**Tip 1: Terminal harus tetap open**
- Jangan close terminal setelah `npm start`
- Keep it open selama development

**Tip 2: Check console.log**
- Login.html sudah punya console.log
- Buka F12 → Console untuk lihat debug info

**Tip 3: Refresh page**
- Setelah change .env atau fix issue
- Refresh browser: Ctrl+Shift+R (hard refresh)

**Tip 4: Clear localStorage**
- Jika stuck dengan token lama
- F12 → Console → `localStorage.clear()`
- Refresh page

---

## 📞 Bantuan Lebih Lanjut

Jika masih error setelah semua di-check:

1. **Capture error message lengkap**
2. **Baca ulang SETUP_GUIDE.md**
3. **Check QUICK_COMMANDS.md**
4. **Coba di browser lain**
5. **Restart computer**

---

**Status: UPDATED** - Login.html sekarang punya better error messages!

Sekarang saat ada error, Anda akan lihat:
- ✅ Console.log untuk debug
- ✅ Detailed error messages
- ✅ Suggestion untuk solusi

**Try login lagi sekarang!** 🚀
