# Tannn Fake Robux

PWA simulator **Fake Robux** untuk demo, konten, dan testing.

> **Penting:** Ini bukan aplikasi resmi Roblox. Saldo di dalam aplikasi adalah saldo virtual/fiktif dan tidak dapat digunakan di Roblox. Aplikasi tidak meminta password, cookie, token, atau kredensial Roblox.

## Fitur

- Saldo Fake Robux lokal
- Tombol quick add
- Give Fake Robux berdasarkan username
- Riwayat transaksi
- Reset data
- Offline/PWA
- Install ke perangkat
- Tanpa backend
- Tanpa database
- Tanpa API
- Tanpa Node.js

## Struktur

```text
tannn-fake-robux/
├── index.html
├── style.css
├── app.js
├── manifest.json
├── sw.js
├── icon.svg
└── README.md
```

## Jalankan

Tidak membutuhkan build step.

Untuk pengujian lokal, gunakan server statis sederhana. Service Worker membutuhkan HTTPS atau localhost.

## Deploy ke Vercel

1. Buat repository baru di GitHub.
2. Upload semua file dalam folder ini ke root repository.
3. Di Vercel pilih **Add New Project**.
4. Import repository GitHub tersebut.
5. Framework Preset: **Other** / static.
6. Build Command: kosong.
7. Output Directory: `.`
8. Deploy.

## Catatan

Semua data saldo dan riwayat disimpan dengan `localStorage`, sehingga data bersifat lokal pada browser/perangkat.
