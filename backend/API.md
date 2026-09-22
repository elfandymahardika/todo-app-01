# Todo API

Base URL: `http://localhost:5000/api`

## Authentication

### Register

`POST /auth/register`

Request body:

```json
{
  "username": "andi",
  "email": "andi@example.com",
  "password": "rahasia123"
}
```

### Login

`POST /auth/login`

Request body:

```json
{
  "username": "andi",
  "password": "rahasia123"
}
```

The response contains a JWT token. Send it on todo requests using:

```text
Authorization: Bearer <token>
```

## Todos

All todo endpoints require the `Authorization` header.

### List todos

`GET /todos`

### Create todo

`POST /todos`

Request body:

```json
{
  "task": "Mengerjakan dokumentasi API"
}
```

### Update todo

`PUT /todos/:id`

Request body:

```json
{
  "task": "Menyelesaikan dokumentasi API",
  "is_completed": true
}
```

### Delete todo

`DELETE /todos/:id`

## Response status

| Status | Meaning |
| --- | --- |
| 200 | Request berhasil |
| 201 | Data berhasil dibuat |
| 400 | Request body atau parameter tidak valid |
| 401 | Token tidak dikirim |
| 403 | Token tidak valid atau kedaluwarsa |
| 404 | Todo tidak ditemukan atau bukan milik pengguna |
| 409 | Username atau email sudah digunakan |
| 500 | Kesalahan server |

Successful responses use the following shape:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```