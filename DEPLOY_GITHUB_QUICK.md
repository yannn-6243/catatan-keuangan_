# ⚡ QUICK START: Deploy ke GitHub (10 Menit)

Jika Anda sudah experienced, berikut quick commands untuk deploy.

---

## 🚀 FAST TRACK (Assuming Git Already Installed)

### 1. Configure Git (first time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"
```

### 2. Go to Project Folder
```bash
cd C:\Users\ACER\Downloads\catatan keuangan
```

### 3. Initialize Repository
```bash
git init
```

### 4. Create .gitignore
Windows Command:
```bash
(
  echo node_modules/
  echo .env
  echo .env.local
  echo .env.*.local
  echo .vscode/
  echo .idea/
  echo *.log
  echo npm-debug.log*
  echo New folder/
) > .gitignore
```

Atau manual: Buat file `.gitignore` dengan content di atas.

### 5. Add & Commit
```bash
git add .
git commit -m "Initial commit - Catatan Keuangan App"
```

### 6. Add Remote (Ganti dengan repository URL Anda)
```bash
git remote add origin https://github.com/YOUR_USERNAME/catatan-keuangan.git
```

### 7. Push to GitHub
```bash
git push -u origin main
```

Jika error "main" tidak ada:
```bash
git push -u origin master
```

**Done!** ✅ Code sekarang di GitHub!

---

## 📝 Future Updates

Setiap kali update code:

```bash
git add .
git commit -m "Your commit message"
git push
```

---

## 🌐 Deploy Frontend (GitHub Pages)

1. Go to GitHub repository Settings
2. Pages → Source: Select "main" branch, folder "/ (root)"
3. Save
4. Wait ~1 minute
5. URL: `https://username.github.io/catatan-keuangan/`

---

## 🔧 Deploy Backend (Railway)

1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Add environment variables (.env)
5. Done! Railway auto-deploys

---

## 🎯 What You Get

```
✅ Code backed up on GitHub
✅ Frontend live on GitHub Pages  
✅ Backend running on Railway
✅ Accessible from internet
✅ Sharable link
```

---

## 📞 Need Help?

See: `DEPLOY_GITHUB.md` - Complete guide dengan explanations

---

**That's it!** 🚀 Ready to share your app with the world!
