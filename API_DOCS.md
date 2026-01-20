# API Documentation

Base URL: `http://localhost:3001/api`

## Authentication Endpoints

### 1. Register (Pendaftaran)

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "nama_lengkap": "John Doe"
}
```

**Response (Success - 201):**
```json
{
  "message": "Registrasi berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "nama_lengkap": "John Doe"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "Username atau email sudah terdaftar"
}
```

---

### 2. Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "nama_lengkap": "John Doe"
  }
}
```

**Response (Error - 401):**
```json
{
  "error": "Username atau password salah"
}
```

---

### 3. Forgot Password (Minta Reset Password)

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (Success - 200):**
```json
{
  "message": "Email reset password telah dikirim"
}
```

**Email yang dikirim:**
```
Subject: Reset Password - CatatUang Pro

Halo johndoe,

Anda telah meminta untuk mereset password akun Anda. 
Klik link di bawah untuk melanjutkan:

[Reset Password Button]
http://localhost/reset-password?token=xxxxx

Link ini berlaku selama 24 jam.

Jika Anda tidak meminta reset password, abaikan email ini.
```

**Response (Error - 404):**
```json
{
  "error": "Email tidak terdaftar"
}
```

---

### 4. Verify Reset Token

**Endpoint:** `POST /auth/verify-reset-token`

**Request Body:**
```json
{
  "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

**Response (Success - 200):**
```json
{
  "message": "Token valid",
  "user_id": 1
}
```

**Response (Error - 400):**
```json
{
  "error": "Token tidak valid atau sudah kadaluarsa"
}
```

---

### 5. Reset Password

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "token": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "password": "password_baru"
}
```

**Response (Success - 200):**
```json
{
  "message": "Password berhasil direset"
}
```

**Response (Error - 400):**
```json
{
  "error": "Token tidak valid atau sudah kadaluarsa"
}
```

---

## User Endpoints

### 1. Get User Profile

**Endpoint:** `GET /user/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "nama_lengkap": "John Doe",
  "created_at": "2024-01-20T10:30:00Z"
}
```

**Response (Error - 401):**
```json
{
  "error": "Token tidak ditemukan"
}
```

---

### 2. Update User Profile

**Endpoint:** `PUT /user/profile`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "nama_lengkap": "John Doe Updated",
  "email": "newemail@example.com"
}
```

**Response (Success - 200):**
```json
{
  "message": "Profil berhasil diupdate",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "newemail@example.com",
    "nama_lengkap": "John Doe Updated"
  }
}
```

---

## Other Endpoints

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "OK",
  "message": "Server berjalan dengan baik"
}
```

---

## Error Codes

| Status | Meaning | Solution |
|--------|---------|----------|
| 200 | OK | Request berhasil |
| 201 | Created | Resource berhasil dibuat |
| 400 | Bad Request | Data yang dikirim tidak valid |
| 401 | Unauthorized | Token tidak ada atau expired |
| 404 | Not Found | Resource tidak ditemukan |
| 500 | Server Error | Error di server, coba lagi |

---

## Authentication Flow

### 1. Registrasi
```
User → POST /auth/register → Server → Save ke DB → Return Token
```

### 2. Login
```
User → POST /auth/login → Server → Check DB → Return Token
```

### 3. Reset Password Flow
```
User → POST /auth/forgot-password 
  → Server → Send Email dengan Token
  
User → Click Email Link
  → Frontend → POST /auth/verify-reset-token
  → Show Form Reset Password
  
User → POST /auth/reset-password dengan password baru
  → Server → Update DB → Delete Token
  → Redirect ke Login
```

### 4. Menggunakan Token
```
Browser menyimpan token di localStorage

Setiap request ke endpoint yang butuh auth:
Client → GET /user/profile
Headers: Authorization: Bearer <token>
  
Server → Verify Token → Jika valid, return data
         Jika invalid → Return 401
```

---

## Testing dengan Postman

1. **Download Postman:** https://www.postman.com/downloads/

2. **Import Collection:**
   - Buka Postman
   - File → Import
   - Copy-paste config di bawah

3. **Postman Collection JSON:**
```json
{
  "info": {
    "name": "CatatUang API",
    "version": "1.0"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "http://localhost:3001/api/auth/register",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"username\": \"johndoe\", \"email\": \"john@example.com\", \"password\": \"password123\", \"nama_lengkap\": \"John Doe\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:3001/api/auth/login",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"username\": \"johndoe\", \"password\": \"password123\"}"
        }
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/api/user/profile",
        "header": [
          {"key": "Authorization", "value": "Bearer YOUR_TOKEN_HERE"}
        ]
      }
    },
    {
      "name": "Forgot Password",
      "request": {
        "method": "POST",
        "url": "http://localhost:3001/api/auth/forgot-password",
        "header": [
          {"key": "Content-Type", "value": "application/json"}
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"john@example.com\"}"
        }
      }
    }
  ]
}
```

---

## Rate Limiting (Rekomendasi)

Untuk production, tambahkan rate limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // Maksimal 100 request per IP
  message: 'Terlalu banyak request, coba lagi nanti'
});

app.use('/api/', limiter);
```

---

## Contoh JavaScript Implementation

### Login
```javascript
const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'johndoe',
    password: 'password123'
  })
});

const data = await response.json();
localStorage.setItem('token', data.token);
```

### Menggunakan Token
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3001/api/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const user = await response.json();
console.log(user);
```

---

## CORS Configuration

Backend sudah support CORS untuk semua origin:

```javascript
app.use(cors()); // Allow all origins
```

Untuk production, restrict dengan:

```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

**Catatan:** Dokumentasi ini akan di-update seiring penambahan fitur API baru.
