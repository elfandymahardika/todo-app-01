# Todo API - Dokumentasi Teknis

Base URL: `http://localhost:5000/api`

Dokumentasi ini adalah kontrak teknis resmi antara Frontend dan Backend Developer untuk standarisasi request, response, error handling, dan pagination.

---

## 1. Standar Header & Response Format

### Response Header
Setiap response yang dikirim oleh backend menyertakan response header pelacak:
* `X-Request-Id`: UUID unik untuk setiap request guna keperluan tracing dan logging (di-expose melalui CORS).

### Format Response Sukses (Standard)
```json
{
  "success": true,
  "message": "string",
  "data": {},
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

### Format Response Sukses dengan Pagination
```json
{
  "success": true,
  "message": "Berhasil!",
  "data": [],
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z",
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### Format Response Error
```json
{
  "success": false,
  "message": "Pesan error spesifik",
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

---

## 2. Health Check

### Cek Server
`GET /`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Backend Todo Praktikum Berjalan Mulus!",
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

---

## 3. Autentikasi (`/api/auth`)

### a. Register User
`POST /api/auth/register`

**Request Body:**
```json
{
  "username": "andi",
  "email": "andi@example.com",
  "password": "rahasia123"
}
```

**Validasi:**
* `username`, `email`, dan `password` wajib diisi.
* `email` harus berformat valid (memiliki karakter `@`).

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Registrasi berhasil!",
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `400 Bad Request`: `"Username, email, dan password wajib diisi!"` / `"Format email tidak valid!"`
* `409 Conflict`: `"Username atau Email sudah terdaftar!"`

---

### b. Login User
`POST /api/auth/login`

**Request Body:**
```json
{
  "username": "andi",
  "password": "rahasia123"
}
```

**Validasi:**
* `username` dan `password` wajib diisi.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login berhasil!",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `400 Bad Request`: `"Username dan password wajib diisi!"`
* `401 Unauthorized`: `"Username atau password salah!"`

---

## 4. Todo Management (`/api/todos`)

Semua endpoint Todo memerlukan autentikasi Bearer token pada header:
```text
Authorization: Bearer <token_jwt>
```

Jika token tidak disertakan atau kedaluwarsa:
* `401 Unauthorized`: `"Akses ditolak. Token tidak ditemukan!"`
* `403 Forbidden`: `"Sesi tidak valid atau kedaluwarsa!"`

---

### a. Mendapatkan Daftar Tugas (Pagination)
`GET /api/todos?page=1&perPage=10`

**Query Parameters:**
* `page` (opsional, default: `1`): Nomor halaman (integer positif).
* `perPage` (opsional, default: `10`, max: `50`): Jumlah data per halaman.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Berhasil!",
  "data": [
    {
      "id": 12,
      "todo": "Mengerjakan dokumentasi teknis API",
      "completed": false
    },
    {
      "id": 11,
      "todo": "Implementasi pagination backend",
      "completed": true
    }
  ],
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z",
    "pagination": {
      "page": 1,
      "perPage": 10,
      "total": 2,
      "totalPages": 1
    }
  }
}
```

---

### b. Mendapatkan Detail Tugas Berdasarkan ID
`GET /api/todos/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Berhasil!",
  "data": {
    "id": 12,
    "todo": "Mengerjakan dokumentasi teknis API",
    "completed": false
  },
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `404 Not Found`: `"Tugas tidak ditemukan!"`

---

### c. Menambahkan Tugas Baru
`POST /api/todos`

**Request Body:**
```json
{
  "task": "Belajar standarisasi response API"
}
```

**Validasi:**
* `task` wajib diisi dan bertipe string.

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Tugas berhasil ditambahkan!",
  "data": {
    "id": 13,
    "todo": "Belajar standarisasi response API",
    "completed": false
  },
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `400 Bad Request`: `"Task wajib diisi dengan format string!"`

---

### d. Memperbarui Tugas
`PUT /api/todos/:id`

**Request Body:**
```json
{
  "task": "Belajar standarisasi response API (Selesai)",
  "is_completed": true
}
```

**Validasi:**
* Minimal salah satu dari `task` atau `is_completed` harus diisi.
* `task` harus bertipe string jika diberikan.
* `is_completed` harus bertipe boolean (`true`/`false`) jika diberikan.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tugas berhasil diperbarui!",
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `400 Bad Request`: `"Isi minimal task atau is_completed!"` / `"Task harus berupa string!"` / `"is_completed harus berupa true atau false!"`
* `404 Not Found`: `"Tugas tidak ditemukan!"`

---

### e. Menghapus Tugas
`DELETE /api/todos/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tugas berhasil dihapus!",
  "meta": {
    "timestamp": "2026-09-29T06:00:00.000Z"
  }
}
```

**Error Responses:**
* `404 Not Found`: `"Tugas tidak ditemukan!"`

---

## 5. Ringkasan Status Kode HTTP

| Status Code | Deskripsi | Keterangan |
| :--- | :--- | :--- |
| **200 OK** | Request berhasil | Digunakan pada operasi GET, PUT, DELETE, Register, Login |
| **201 Created** | Resource berhasil dibuat | Digunakan pada POST `/api/todos` |
| **400 Bad Request** | Validasi payload gagal | Input body atau parameter tidak sesuai kontrak |
| **401 Unauthorized** | Tidak terautentikasi | Token tidak dikirimkan atau kredensial salah |
| **403 Forbidden** | Akses ditolak | Token tidak valid atau sesi kedaluwarsa |
| **404 Not Found** | Resource tidak ditemukan | Todo dengan ID terkait tidak ditemukan / milik user lain / route salah |
| **409 Conflict** | Duplikasi data | Username atau email sudah terdaftar |
| **500 Internal Server Error** | Kesalahan server | Terjadi kegagalan penanganan database atau server |