# Surat Keterangan Bebas Tanggungan Keuangan (Backend / Apps Script)

Sistem administrasi pengajuan Surat Keterangan Bebas Tanggungan Keuangan menggunakan Google Apps Script (GAS) dan Google Spreadsheet.

## Cara Instalasi dan Deployment

1. **Buat Spreadsheet Baru**
   - Buka Google Sheets dan buat file baru.
   - Catat / Copy ID Spreadsheet dari URL (di antara `d/` dan `/edit`).

2. **Buka Apps Script Editor**
   - Dari Spreadsheet, klik `Extensions` -> `Apps Script`.

3. **Salin Kode Backend**
   - Salin isi dari semua file `.gs` di folder ini ke project Apps Script.
   - Buat file `.gs` baru untuk masing-masing modul sesuai nama file (misalnya: `Code.gs`, `Submit.gs`, `Admin.gs`, dll).
   - Di file `Code.gs`, ubah `SPREADSHEET_ID` dengan ID Spreadsheet yang Anda catat pada langkah 1.

4. **Jalankan Setup Otomatis**
   - Pilih fungsi `setupSpreadsheet` dari dropdown menu (di atas kode).
   - Klik `Run` (Jalankan).
   - Berikan izin otorisasi yang diminta (Review Permissions -> Allow).
   - Ini akan otomatis membuat semua sheet (Pengajuan, Admin, Pengaturan, Audit Log) beserta header tabel, dan juga memasukkan akun Admin default.

5. **Deploy sebagai Web App**
   - Klik tombol `Deploy` -> `New deployment`.
   - Pilih tipe: `Web app`.
   - Execute as: `Me (Alamat Email Anda)`.
   - Who has access: `Anyone`.
   - Klik `Deploy` dan berikan izin jika diminta lagi.
   - Salin **Web app URL** yang dihasilkan.

6. **Konfigurasi Frontend**
   - Masukkan `Web app URL` yang disalin ke variabel `VITE_API_URL` di dalam file `.env` yang berada di folder `frontend`.

## Catatan Akun Default

Setelah menjalankan fungsi `setupSpreadsheet`, akun default untuk login ke dashboard Admin adalah:
- **Username:** `admin`
- **Password:** `admin123`
