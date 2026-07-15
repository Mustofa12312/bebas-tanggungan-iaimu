# Surat Keterangan Bebas Tanggungan Keuangan (Frontend)

Sistem administrasi pengajuan Surat Keterangan Bebas Tanggungan Keuangan untuk mahasiswa IAIMU Pamekasan.

## Teknologi

- React + Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- React Hook Form + Zod
- html2pdf.js (Export PDF)
- react-qr-code (QR Verification)

## Cara Instalasi

1. Pastikan Anda telah menginstal Node.js
2. Buka terminal di folder `frontend`
3. Jalankan `npm install`
4. Copy file `.env.example` ke `.env` (jika ada), atau edit file `.env` langsung
5. Jalankan `npm run dev`

## Struktur Aplikasi

Aplikasi ini dibagi menjadi 2 bagian utama:
1. **Public (Mahasiswa)**: Home, Form Pengajuan, Cek Status, Verifikasi QR, Download PDF
2. **Admin**: Dashboard, Data Pengajuan, Audit Log, Pengaturan (Protected by Login)

### Mock API vs Production API

Secara default, jika `VITE_API_URL` tidak diisi valid (atau masih 'XXXXXXXX'), sistem otomatis menggunakan **Mock API** agar pengembangan UI/UX dapat dilakukan meskipun backend Apps Script belum siap.
Setelah Google Apps Script selesai di-deploy, masukkan URL Web App ke `VITE_API_URL` di file `.env` untuk beralih ke mode Production.
