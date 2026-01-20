# 🚀 DEPLOY KE GITHUB - PANDUAN LENGKAP

Panduan step-by-step untuk push code Catatan Keuangan ke GitHub.

---

## 📋 Apa yang Akan Kita Lakukan

1. ✅ Setup Git di komputer
2. ✅ Create GitHub repository
3. ✅ Push code ke GitHub
4. ✅ Setup GitHub Pages (untuk frontend)
5. ✅ Deploy backend ke Railway/Heroku (cloud)

---

## 🔧 STEP 1: Setup Git (5 menit)

### Jika belum install Git:

**Download Git:**
- https://git-scm.com/download/win
- Download versi terbaru
- Install dengan Next → Next → Finish

**Verify instalasi:**
```bash
# Buka Command Prompt atau PowerShell
git --version

# Output: git version 2.x.x
```

### Configure Git (first time only):

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@gmail.com"
```

**Verify:**
```bash
git config --global user.name
git config --global user.email
```

---

## 🐙 STEP 2: Create GitHub Repository (5 menit)

### A. Buat Akun GitHub (Jika belum ada)

1. Kunjungi: https://github.com
2. Klik "Sign up"
3. Isi email, password, username
4. Verify email
5. Selesai!

### B. Create New Repository

1. Login ke GitHub
2. Klik **"+"** di top-right corner
3. Pilih **"New repository"**
4. Isi:
   - **Repository name:** `catatan-keuangan` (atau nama lain)
   - **Description:** "Aplikasi pencatat keuangan dengan login & reset password"
   - **Public atau Private?** Pilih **Public** (untuk demo) atau **Private** (untuk private project)
   - **Add .gitignore?** Pilih **Node**
   - **License?** (Optional)

5. Klik **"Create repository"**

**Hasil:**
```
https://github.com/username/catatan-keuangan
```

Copy URL ini, nanti diperlukan!

---

## 📁 STEP 3: Push Code ke GitHub (10 menit)

### A. Buka Terminal di Folder Project

```bash
# Navigate ke folder
cd C:\Users\ACER\Downloads\catatan keuangan

# Verify di folder yang benar
dir /s | head -20
# Harus muncul: index.html, login.html, server.js, dll
```

### B. Initialize Git Repository

```bash
# Ini baru pertama kali aja
git init

# Verify
# Output: Initialized empty Git repository
```

### C. Add All Files

```bash
# Add semua files ke staging
git add .

# Verify
git status
# Harus muncul: files ready to be committed (in green)
```

### D. Create .gitignore (penting!)

File `.gitignore` untuk exclude files yang tidak perlu di-push:

```bash
# Lihat apakah sudah ada .gitignore
dir .gitignore

# Jika tidak ada, buat file .gitignore
# Dengan content:
```

Isi file `.gitignore`:
```
# Dependencies
node_modules/
package-lock.json

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Build
dist/
build/

# Cache
.cache/
.npm/

# New folder (if unnecessary)
New folder/
```

**Untuk buat .gitignore di Windows:**
```bash
# Buka Notepad
notepad .gitignore

# Paste content di atas
# Save: Ctrl+S
# Exit: Alt+F4
```

### E. Re-add Files (after .gitignore)

```bash
# Reset staging
git reset

# Add lagi (sekarang akan exclude files di .gitignore)
git add .

# Verify
git status
```

### F. First Commit

```bash
git commit -m "Initial commit - Catatan Keuangan App"

# Output:
# X files changed, Y insertions(+)
```

### G. Add Remote Repository

```bash
# Replace dengan URL repository Anda dari Step 2
git remote add origin https://github.com/YOUR_USERNAME/catatan-keuangan.git

# Verify
git remote -v
# Output: 
# origin  https://github.com/YOUR_USERNAME/catatan-keuangan.git (fetch)
# origin  https://github.com/YOUR_USERNAME/catatan-keuangan.git (push)
```

### H. Push ke GitHub

```bash
# First time, use -u flag
git push -u origin main

# Jika error "main" tidak ada, gunakan "master"
git push -u origin master

# GitHub akan minta username & password
# Username: github username Anda
# Password: personal access token (buat di Setting → Developer settings)
```

**Jika diminta Personal Access Token:**

1. Login GitHub
2. Settings (profile) → Developer settings → Personal access tokens
3. Generate new token
4. Permissions: check `repo` (full control)
5. Copy token
6. Paste di terminal saat diminta password
7. Done!

### I. Verify Push Success

Buka di browser:
```
https://github.com/YOUR_USERNAME/catatan-keuangan
```

Harus muncul semua files dari project Anda! ✅

---

## 📝 STEP 4: Update & Push Changes (Recurring)

Setiap kali ada perubahan:

```bash
# Check status
git status

# Add changes
git add .

# Commit dengan message yang descriptive
git commit -m "Fix: improve error messages in login"

# Push ke GitHub
git push origin main

# Atau bisa langsung
git add .
git commit -m "Fix: login error handling" && git push
```

---

## 🌐 STEP 5: Deploy Frontend ke GitHub Pages (15 menit)

GitHub Pages gratis untuk host static website (HTML, CSS, JS).

**Cocok untuk:** Frontend (`login.html`, `index.html`, dll)  
**Tidak cocok untuk:** Backend (butuh server running)

### A. Struktur Folder

Untuk GitHub Pages work, struktur harus:

```
catatan-keuangan/
├── index.html
├── login.html
├── auth.js
├── manifest.json
├── sw.js
├── README.md
└── docs/ (optional untuk GitHub Pages)
```

Frontend files harus di root atau folder `docs/`.

### B. Enable GitHub Pages

1. Repository di GitHub
2. Settings → Pages
3. Source → Main branch
4. Folder → / (root) atau /docs
5. Save

### C. Access Frontend

URL akan jadi:
```
https://YOUR_USERNAME.github.io/catatan-keuangan/
```

**Tapi ingat:** Frontend butuh backend untuk login!

---

## 🔧 STEP 6: Deploy Backend (Recommended: Railway)

Frontend bisa di GitHub Pages, tapi **backend butuh server yang 24/7 running**.

### Opsi 1: Railway.app (Recommended - FREE tier tersedia)

**Step 1: Sign up**
- https://railway.app
- Daftar dengan GitHub
- Authorize

**Step 2: Create New Project**
- Click "New Project"
- Select "Deploy from GitHub repo"
- Authorize GitHub
- Select repository: `catatan-keuangan`
- Select branch: `main`

**Step 3: Configure**
- Add environment variables (.env):
  - DB_HOST (dari Railway MySQL)
  - DB_USER
  - DB_PASSWORD
  - JWT_SECRET
  - EMAIL_USER
  - EMAIL_PASSWORD
  - PORT (default 3001)

**Step 4: Deploy**
- Railway auto-deploy
- URL akan jadi: `https://catatan-keuangan-production-xxxx.up.railway.app`

**Step 5: Update Frontend**

Edit `login.html` dan `auth.js`:

```javascript
// Sebelum (development):
const API_URL = 'http://localhost:3001/api';

// Sesudah (production):
const API_URL = 'https://catatan-keuangan-production-xxxx.up.railway.app/api';
```

### Opsi 2: Heroku (Gratis sudah dihapus, tapi bisa trial)

Sama seperti Railway tapi:
- https://heroku.com
- Deploy via GitHub atau CLI

### Opsi 3: Render (Free tier)

- https://render.com
- Mirip Railway
- Free tier available

---

## 🗄️ STEP 7: Database di Cloud

Untuk production, jangan gunakan MySQL lokal!

### Opsi 1: Railway MySQL (Built-in)

Paling mudah, terintegrasi dengan Railway.

### Opsi 2: ClearDB (MySQL as a service)

```
DB_HOST: cleardb-xxx.xxx.cleardb.net
DB_USER: xxx
DB_PASSWORD: xxx
```

### Opsi 3: PlanetScale (MySQL compatible)

```
DB_HOST: xxx.mysql.planetscale.com
DB_USER: xxx
DB_PASSWORD: xxx
```

---

## ✅ CHECKLIST: PUSH KE GITHUB

- [ ] Git installed (`git --version` works)
- [ ] GitHub account created
- [ ] GitHub repository created
- [ ] Git configured (`git config --global user.name` works)
- [ ] Folder initialized (`git init`)
- [ ] .gitignore created (excludes node_modules, .env, dll)
- [ ] Files added (`git add .`)
- [ ] First commit created (`git commit -m "..."`)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Code pushed (`git push -u origin main`)
- [ ] Verified on GitHub.com ✅

---

## ✅ CHECKLIST: DEPLOY FRONTEND

- [ ] Frontend files di root folder
- [ ] GitHub Pages enabled in Settings
- [ ] Frontend accessible di https://username.github.io/repo-name/

---

## ✅ CHECKLIST: DEPLOY BACKEND

- [ ] Railway/Heroku/Render account created
- [ ] Database created (MySQL)
- [ ] Environment variables configured
- [ ] Backend deployed
- [ ] Backend URL generated (e.g., https://xxx.railway.app)
- [ ] Frontend API_URL updated dengan backend URL
- [ ] Frontend re-deployed
- [ ] Test login dari frontend ✅

---

## 🎯 FINAL RESULT

Setelah selesai:

```
GitHub Repository:
https://github.com/username/catatan-keuangan

Frontend (GitHub Pages):
https://username.github.io/catatan-keuangan/

Backend (Railway):
https://catatan-keuangan-production-xxx.up.railway.app

Database:
MySQL di Railway / PlanetScale / ClearDB
```

**Semuanya online & accessible dari internet!** 🚀

---

## 🔒 Security Tips

1. **JANGAN push .env file!**
   - Sudah di .gitignore
   - Tapi double-check!

2. **Use environment variables di production**
   - Jangan hardcode secrets di code

3. **Update API_URL dinamis**
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
   ```

4. **Keep credentials safe**
   - Jangan share personal access token
   - Jangan share database password

---

## 📝 Git Commands Reference

```bash
# Setup
git init
git config --global user.name "Name"
git config --global user.email "email@gmail.com"

# First time
git add .
git commit -m "Initial commit"
git remote add origin URL
git push -u origin main

# Regular updates
git add .
git commit -m "Description"
git push

# Check status
git status
git log

# Undo changes
git checkout -- file.txt
git reset HEAD~1

# Clone existing repo
git clone URL
```

---

## 🆘 Common Issues

### "fatal: not a git repository"
```bash
# Solution: Initialize git
git init
```

### "Everything up-to-date" (tapi files ada yang berubah)
```bash
# Solution: Add changes dulu
git add .
git commit -m "Update"
git push
```

### "remote origin already exists"
```bash
# Solution: Remove existing remote
git remote remove origin
git remote add origin URL
```

### "Permission denied (publickey)"
```bash
# Solution: Setup SSH key atau gunakan personal access token
# https://docs.github.com/en/authentication/connecting-to-github-with-ssh
```

### "Merge conflict"
```bash
# Solution: Update dulu
git pull origin main
# Resolve conflicts di file
git add .
git commit -m "Merge"
git push
```

---

## 📚 Useful Resources

- **Git Tutorial:** https://git-scm.com/book/en/v2
- **GitHub Docs:** https://docs.github.com
- **GitHub Pages:** https://pages.github.com
- **Railway Docs:** https://docs.railway.app
- **Heroku Docs:** https://devcenter.heroku.com

---

## 🎉 NEXT STEPS

1. **Hari 1:** Push code ke GitHub
2. **Hari 2:** Deploy frontend ke GitHub Pages
3. **Hari 3:** Deploy backend ke Railway
4. **Hari 4:** Test everything from internet
5. **Hari 5:** Share dengan team/demo

---

**Ready untuk deploy?** Mulai dari STEP 1! 🚀

**File ini sudah detailed enough untuk complete deployment process!**
