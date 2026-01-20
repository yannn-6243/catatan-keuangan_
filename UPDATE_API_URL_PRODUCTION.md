# 🔄 UPDATE API_URL UNTUK PRODUCTION

Panduan mengubah API_URL dari localhost ke production domain.

---

## 📍 WHERE TO CHANGE

Ada 2 file yang perlu di-update:

### File 1: login.html
**Location:** Line ~252

```javascript
// ❌ BEFORE (Development):
const API_URL = 'http://localhost:3001/api';

// ✅ AFTER (Production):
const API_URL = 'https://your-backend-domain.com/api';
```

### File 2: auth.js
**Location:** Line ~1

```javascript
// ❌ BEFORE (Development):
const API_URL = 'http://localhost:3001/api';

// ✅ AFTER (Production):
const API_URL = 'https://your-backend-domain.com/api';
```

---

## 🎯 PRODUCTION URLS CONTOH

### Jika Deploy ke Railway:
```javascript
const API_URL = 'https://catatan-keuangan-production-xxxx.up.railway.app/api';
```

### Jika Deploy ke Heroku:
```javascript
const API_URL = 'https://catatan-keuangan-api.herokuapp.com/api';
```

### Jika Deploy ke Render:
```javascript
const API_URL = 'https://catatan-keuangan-backend.onrender.com/api';
```

### Jika Deploy ke Domain Custom:
```javascript
const API_URL = 'https://api.catatan-keuangan.com/api';
```

---

## 🔧 AUTOMATIC DETECTION (RECOMMENDED)

Instead of hardcoding URL, gunakan environment-aware code:

### Option 1: Based on hostname

```javascript
// login.html & auth.js
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api'
  : 'https://production-api-url.com/api';
```

**Kelebihan:**
- Automatically switch saat development vs production
- Tidak perlu manual change

### Option 2: Using environment variable (Next.js style)

Jika setup Next.js atau framework lain:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

---

## 📋 STEP-BY-STEP: UPDATE UNTUK PRODUCTION

### Step 1: Get Production Backend URL

Setelah deploy backend ke Railway/Heroku/Render:

```
Cek di dashboard hosting Anda
URL akan terlihat seperti:
https://catatan-keuangan-xxxxx.up.railway.app
```

Copy URL ini.

### Step 2: Update login.html

Buka file `login.html`:

**Find (Line ~252):**
```javascript
const API_URL = 'http://localhost:3001/api';
```

**Replace dengan:**
```javascript
const API_URL = 'https://your-production-domain/api';
```

Save file.

### Step 3: Update auth.js

Buka file `auth.js`:

**Find (Line ~1):**
```javascript
const API_URL = 'http://localhost:3001/api';
```

**Replace dengan:**
```javascript
const API_URL = 'https://your-production-domain/api';
```

Save file.

### Step 4: Commit & Push

```bash
git add .
git commit -m "Update: API URL untuk production"
git push
```

### Step 5: Verify

1. Frontend akan auto-deploy (jika di GitHub Pages)
2. Test login dari https://username.github.io/catatan-keuangan/
3. Should bisa login sekarang!

---

## 🧪 TESTING API CONNECTION

### Using Browser Console

```javascript
// F12 → Console

// Test connection
fetch('https://your-production-api-domain/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Should return:
// {status: 'OK', message: 'Server berjalan dengan baik'}
```

### Using Postman

1. Download Postman
2. Method: GET
3. URL: `https://your-production-api-domain/api/health`
4. Send
5. Should get 200 OK response

---

## 🚨 COMMON ISSUES

### Issue 1: "CORS error"

```
Error: Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
- Backend CORS harus allow frontend domain
- Update server.js:

```javascript
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://username.github.io',  // Tambah ini
        'https://your-frontend-domain.com'  // Atau ini
    ],
    credentials: true,
    optionsSuccessStatus: 200
}));
```

Then re-deploy backend.

### Issue 2: "Cannot find module..."

```
Error: Cannot find module 'package-name'
```

**Solution:**
- Backend belum install dependencies
- Railway should auto-install dari package.json
- Check Railway logs

### Issue 3: "Database connection error"

```
Error: connect ECONNREFUSED
```

**Solution:**
- Database connection string salah
- Check .env di Railway dashboard
- DB_HOST harus URL database cloud (bukan localhost)

### Issue 4: "401 Unauthorized"

```
Error: Username atau password salah
```

**Solution:**
- User tidak ada di database
- Database belum sync
- Check user tabel di production database:

```sql
mysql -h production-db-host -u username -p
USE catatan_keuangan;
SELECT * FROM users;
```

---

## 📊 ENVIRONMENT COMPARISON

| Aspect | Development | Production |
|--------|-------------|------------|
| API_URL | http://localhost:3001/api | https://domain.com/api |
| Database | localhost:3306 | cloud-db.com:3306 |
| Frontend | http://localhost/login.html | https://username.github.io/repo |
| Backend | localhost:3001 | production-server.com |
| CORS | Localhost only | Production domain |

---

## ✅ VERIFICATION CHECKLIST

- [ ] Backend deployed & URL obtained
- [ ] login.html updated dengan API_URL
- [ ] auth.js updated dengan API_URL
- [ ] Changes committed & pushed
- [ ] Frontend re-deployed (if needed)
- [ ] CORS configured untuk production domain
- [ ] Database accessible dari production backend
- [ ] Test login works dari production frontend
- [ ] Email reset password works
- [ ] Profile fetch works (protected endpoint)

---

## 🎯 TIPS

**Tip 1: Keep Development Setup**
```javascript
// Jangan hardcode, gunakan detection:
const isDev = window.location.hostname === 'localhost';
const API_URL = isDev 
  ? 'http://localhost:3001/api'
  : 'https://production.com/api';
```

**Tip 2: Test Both Environments**
- Test di localhost development
- Test di production GitHub Pages
- Verify keduanya work

**Tip 3: Keep .env Secure**
```
.gitignore harus include:
.env
.env.local
.env.production
```

**Tip 4: Log API Calls**
```javascript
console.log('API URL:', API_URL);
console.log('Calling:', `${API_URL}/auth/login`);
```

---

## 🚀 AFTER UPDATE

Setelah update API_URL:

1. ✅ Commit & push ke GitHub
2. ✅ Frontend will auto-update
3. ✅ Wait ~1 minute untuk GitHub Pages build
4. ✅ Test dari browser
5. ✅ Try login
6. ✅ Should work! 🎉

---

## 📚 RELATED FILES

- `DEPLOY_GITHUB.md` - Complete deployment guide
- `DEPLOY_GITHUB_QUICK.md` - Quick commands
- `server.js` - Check CORS configuration
- `login.html` - Update API_URL here
- `auth.js` - Update API_URL here

---

**That's it!** After updating API_URL, everything should work in production! 🚀
