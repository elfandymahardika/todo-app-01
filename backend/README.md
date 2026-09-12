# Todo API Backend

Backend REST API untuk aplikasi Todo berbasis Express, TypeScript, dan MySQL.

## Menjalankan server

1. Install dependency:

	```bash
	npm install
	```

2. Buat file `.env` dari `.env.example`, lalu sesuaikan koneksi MySQL dan `JWT_SECRET`.
3. Jalankan `schema.sql` pada MySQL untuk membuat database, tabel, dan data awal.
4. Jalankan server development:

	```bash
	npm run dev
	```

Server berjalan pada `http://localhost:5000` secara default. Dokumentasi endpoint tersedia di [API.md](API.md).

## Script

| Script | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan server dengan watch mode |
| `npm run typecheck` | Memeriksa tipe TypeScript |
| `npm run build` | Mengompilasi source ke `dist/` |
| `npm start` | Menjalankan hasil kompilasi |