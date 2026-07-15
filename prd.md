# Product Requirements Document (PRD)

# Bagian 1 — Cover, Pendahuluan, Visi, Tujuan, Scope, Stakeholder

---

# SURAT BEBAS TANGGUNGAN KEUANGAN IAIMU

**Versi Dokumen:** 1.0

**Status:** Draft

**Jenis Aplikasi:** Web Application

**Target Platform:**

- Desktop
- Android
- iPhone
- Tablet

**Frontend**

- React + Vite
- Tailwind CSS
- React Router
- Axios

**Backend**

- Google Apps Script (REST API)

**Database**

- Google Spreadsheet

**Document Owner**

- IAIMU Pamekasan

**Prepared By**

- Development Team

---

# 1. Pendahuluan

## 1.1 Latar Belakang

Proses penerbitan **Surat Keterangan Bebas Tanggungan Keuangan** di IAIMU Pamekasan masih dilakukan secara manual. Mahasiswa harus menghubungi pihak administrasi, sementara admin harus memeriksa pembayaran, mengisi data surat, serta membuat nomor surat secara manual. Proses ini membutuhkan waktu, berpotensi menimbulkan kesalahan penulisan, dan menyulitkan pelacakan status pengajuan.

Aplikasi ini dikembangkan untuk mendigitalisasi seluruh proses pengajuan surat, mulai dari pengisian data oleh mahasiswa, proses verifikasi oleh admin, hingga pencetakan surat resmi dengan format yang sama seperti dokumen institusi. Template surat mengikuti format resmi yang telah digunakan oleh IAIMU.

---

## 1.2 Tujuan Sistem

Membangun aplikasi berbasis web yang mampu:

- Mempermudah mahasiswa mengajukan Surat Bebas Tanggungan Keuangan tanpa harus login.
- Memudahkan admin melakukan verifikasi pengajuan.
- Menghasilkan nomor surat secara otomatis dan unik.
- Mencetak surat resmi dengan format sesuai template institusi.
- Menyediakan QR Code untuk verifikasi keaslian surat.
- Menyimpan seluruh data pengajuan pada Google Spreadsheet.
- Mengurangi kesalahan penulisan dan pekerjaan administratif.

---

# 2. Visi Produk

Membangun sistem administrasi surat bebas tanggungan yang:

- Mudah digunakan oleh mahasiswa.
- Mudah dikelola oleh admin.
- Cepat dalam proses verifikasi.
- Aman terhadap data.
- Dapat digunakan melalui perangkat Android maupun komputer.
- Menghasilkan surat resmi secara otomatis dengan kualitas yang konsisten.

---

# 3. Tujuan Bisnis

Sistem ini diharapkan mampu:

- Mengurangi proses administrasi manual.
- Mempercepat penerbitan surat.
- Mengurangi kesalahan penulisan data.
- Menyediakan riwayat pengajuan yang terdokumentasi.
- Mempermudah proses audit administrasi.
- Mengurangi penggunaan dokumen fisik selama proses pengajuan.

---

# 4. Ruang Lingkup (Project Scope)

## Termasuk Dalam Sistem

### Mahasiswa

- Mengakses website tanpa login.
- Mengisi formulir pengajuan.
- Mengirim data pengajuan.
- Otomatis diarahkan ke WhatsApp Admin setelah submit.
- Mengecek status pengajuan menggunakan NIM.
- Mengunduh atau mencetak surat apabila status sudah **Lunas**.

---

### Admin

- Login menggunakan Username dan Password.
- Melihat seluruh data pengajuan.
- Mencari data berdasarkan:
  - Nama
  - NIM
  - Program Studi

- Mengubah status pengajuan:
  - Menunggu Verifikasi
  - Belum Lunas
  - Lunas

- Mencetak surat.
- Melihat riwayat perubahan status (audit log sederhana).

---

### Sistem

- Menyimpan data pada Google Spreadsheet.
- Membuat nomor surat otomatis.
- Menghasilkan QR Code verifikasi.
- Membuat PDF sesuai template surat resmi.
- Mencegah pengajuan ganda untuk NIM yang sudah memiliki data aktif.
- Responsif di Android, tablet, dan desktop.

---

## Di Luar Ruang Lingkup

Fitur berikut **tidak termasuk** dalam versi pertama (MVP):

- Registrasi akun mahasiswa.
- Login mahasiswa.
- Edit data oleh mahasiswa setelah submit.
- Upload bukti pembayaran.
- Integrasi payment gateway.
- Integrasi Sistem Akademik (SIAKAD).
- Notifikasi Email.
- Notifikasi SMS.
- Tanda tangan digital tersertifikasi.
- Multi bahasa.

---

# 5. Stakeholder

| Stakeholder         | Peran                                                           |
| ------------------- | --------------------------------------------------------------- |
| Mahasiswa           | Mengajukan permohonan surat dan mengecek status pengajuan.      |
| Admin BAU/Bendahara | Memverifikasi status tanggungan keuangan dan menerbitkan surat. |
| IAIMU Pamekasan     | Pemilik sistem dan penanggung jawab operasional.                |
| Tim Pengembang      | Mengembangkan, menguji, dan memelihara aplikasi.                |

---

# 6. Definisi Sukses Proyek

Proyek dianggap berhasil apabila:

- Mahasiswa dapat mengajukan surat tanpa login.
- Data pengajuan langsung tersimpan ke Google Spreadsheet.
- Mahasiswa otomatis diarahkan ke WhatsApp Admin setelah submit.
- Admin dapat memverifikasi pengajuan melalui dashboard.
- Nomor surat dibuat otomatis tanpa duplikasi.
- Surat dapat dicetak sesuai format resmi IAIMU.
- QR Code pada surat dapat digunakan untuk verifikasi keaslian.
- Mahasiswa hanya dapat mencetak surat apabila status pengajuan **Lunas**.
- Sistem mencegah pengajuan baru apabila NIM masih memiliki pengajuan aktif.
- Seluruh halaman berfungsi dengan baik di perangkat desktop maupun mobile.

# Product Requirements Document (PRD)

# Bagian 2 — Analisis Pengguna, Hak Akses, User Journey, Functional Requirements

---

# 7. Analisis Pengguna (User Analysis)

Aplikasi ini memiliki dua jenis pengguna utama.

## 7.1 Mahasiswa

Mahasiswa merupakan pengguna yang mengajukan permohonan Surat Keterangan Bebas Tanggungan Keuangan.

### Karakteristik

- Tidak memerlukan akun.
- Tidak perlu login.
- Dapat mengakses website melalui HP maupun laptop.
- Mengisi formulir secara mandiri.
- Bertanggung jawab atas kebenaran data yang diinput.

### Tujuan

- Mengajukan permohonan surat.
- Mengetahui status verifikasi.
- Mengunduh surat apabila telah dinyatakan lunas.

---

## 7.2 Admin

Admin merupakan petugas BAU/Bendahara yang bertugas memverifikasi pengajuan mahasiswa.

### Karakteristik

- Memiliki Username dan Password.
- Mengelola seluruh data pengajuan.
- Menentukan status pembayaran.
- Menerbitkan surat.

### Tujuan

- Mempermudah proses administrasi.
- Mengurangi pekerjaan manual.
- Memastikan hanya mahasiswa yang telah memenuhi kewajiban yang memperoleh surat.

---

# 8. Hak Akses (User Roles)

## 8.1 Mahasiswa

Mahasiswa dapat:

- Membuka website.
- Mengisi formulir.
- Mengirim pengajuan.
- Mengecek status menggunakan NIM.
- Mengunduh surat apabila status **Lunas**.
- Memindai QR Code untuk verifikasi surat.

Mahasiswa **tidak dapat**:

- Login.
- Mengedit data yang telah dikirim.
- Menghapus data.
- Mengubah status pengajuan.
- Melihat data mahasiswa lain.

---

## 8.2 Admin

Admin dapat:

- Login ke Dashboard.
- Melihat seluruh pengajuan.
- Mencari data berdasarkan Nama.
- Mencari data berdasarkan NIM.
- Mencari data berdasarkan Program Studi.
- Mengubah status pengajuan.
- Membuat nomor surat otomatis.
- Mencetak surat.
- Mengunduh PDF.
- Melihat riwayat perubahan status.
- Mengelola nomor WhatsApp Admin.

Admin **tidak dapat**:

- Menghapus riwayat audit.
- Mengubah nomor surat yang telah diterbitkan.

---

# 9. User Journey

## 9.1 Mahasiswa Mengajukan Surat

```text
Buka Website
      │
      ▼
Mengisi Formulir
      │
      ▼
Mencentang Pernyataan
      │
      ▼
Klik Submit
      │
      ▼
Data Disimpan
ke Spreadsheet
      │
      ▼
Status
Menunggu Verifikasi
      │
      ▼
Otomatis Membuka
WhatsApp Admin
```

---

## 9.2 Admin Memverifikasi

```text
Login
      │
      ▼
Dashboard
      │
      ▼
Melihat Pengajuan
      │
      ▼
Verifikasi
      │
      ▼
Status

Belum Lunas
atau
Lunas
```

---

## 9.3 Mahasiswa Mengecek Status

```text
Buka Website
      │
      ▼
Masukkan NIM
      │
      ▼
Cari
      │
      ▼
Sistem Mengecek
Spreadsheet
      │
      ▼
Menampilkan Status
```

---

## 9.4 Mahasiswa Mengunduh Surat

```text
Masukkan NIM
      │
      ▼
Status = Lunas?
      │
      ├── Tidak
      │      │
      │      ▼
      │ Tampilkan Informasi
      │
      ▼
Ya
      │
      ▼
Tampilkan Tombol
Cetak Surat
      │
      ▼
Generate PDF
      │
      ▼
Download
```

---

# 10. Functional Requirements

## Modul 1 — Form Pengajuan

### Deskripsi

Mahasiswa mengisi formulir tanpa login.

### Field

| Field          | Wajib |
| -------------- | ----- |
| Nama Lengkap   | Ya    |
| NIM            | Ya    |
| Program Studi  | Ya    |
| Nomor WhatsApp | Ya    |

---

### Validasi

- Semua field wajib diisi.
- NIM hanya boleh angka.
- Nomor WhatsApp hanya boleh angka.
- Tidak boleh ada spasi di awal maupun akhir input.
- Panjang Nama maksimal 100 karakter.
- Panjang Program Studi maksimal 100 karakter.
- Nomor WhatsApp minimal 10 digit.

---

### Validasi NIM

Saat tombol **Submit** ditekan, sistem mengecek apakah NIM sudah memiliki pengajuan.

Jika ditemukan data dengan status:

- Menunggu Verifikasi
- Belum Lunas
- Lunas

maka sistem menolak pengajuan dan menampilkan pesan:

> **NIM ini sudah memiliki pengajuan. Silakan hubungi Admin apabila terdapat kesalahan data atau membutuhkan bantuan.**

---

## Modul 2 — Persetujuan Data

Sebelum tombol Submit aktif, mahasiswa wajib mencentang pernyataan:

> **Saya telah memastikan seluruh data yang saya isi sudah benar. Data yang telah dikirim tidak dapat diubah. Kesalahan penulisan menjadi tanggung jawab saya.**

Tanpa mencentang pernyataan tersebut, tombol **Submit** tidak dapat digunakan.

---

## Modul 3 — Submit Pengajuan

Setelah Submit berhasil, sistem akan:

- Menyimpan data ke Google Spreadsheet.
- Memberikan Timestamp otomatis.
- Memberikan Status **Menunggu Verifikasi**.
- Membuat ID Pengajuan unik.
- Mengarahkan pengguna ke WhatsApp Admin dengan pesan yang telah disiapkan.
- Menampilkan halaman konfirmasi bahwa pengajuan berhasil dikirim.

---

## Modul 4 — Dashboard Admin

Dashboard menampilkan daftar seluruh pengajuan.

Informasi yang ditampilkan:

| Kolom             |
| ----------------- |
| Nama              |
| NIM               |
| Program Studi     |
| Nomor WhatsApp    |
| Status            |
| Nomor Surat       |
| Tanggal Pengajuan |

---

Fitur Dashboard:

- Pencarian Nama.
- Pencarian NIM.
- Pencarian Program Studi.
- Filter Status.
- Pagination.
- Refresh Data.

---

## Modul 5 — Verifikasi

Admin dapat mengubah status menjadi:

- Menunggu Verifikasi
- Belum Lunas
- Lunas

Perubahan status otomatis dicatat ke Audit Log.

---

## Modul 6 — Cetak Surat

Tombol **Cetak Surat** hanya muncul jika status adalah **Lunas**.

Saat diklik, sistem:

- Membuat nomor surat otomatis.
- Mengisi template surat resmi.
- Menambahkan QR Code.
- Menghasilkan file PDF siap cetak.

---

## Modul 7 — Cek Status

Mahasiswa hanya perlu memasukkan NIM.

Sistem menampilkan:

- Nama
- NIM
- Program Studi
- Status Pengajuan

Jika status **Lunas**, sistem menampilkan tombol **Cetak Surat**.

---

## Modul 8 — Verifikasi QR Code

QR Code pada surat mengarah ke halaman verifikasi.

Halaman verifikasi menampilkan:

- Nomor Surat
- Nama
- NIM
- Program Studi
- Status
- Tanggal Terbit

Jika data ditemukan, tampilkan keterangan:

> **Surat Valid dan Terdaftar di Sistem.**

Jika tidak ditemukan:

> **Surat Tidak Valid atau Tidak Terdaftar.**

# Product Requirements Document (PRD)

# Bagian 3 — Non-Functional Requirements, Aturan Bisnis, Validasi, dan Struktur Data

---

# 11. Non-Functional Requirements

## 11.1 Performance

Sistem harus mampu:

- Membuka halaman utama dalam waktu maksimal **3 detik** pada koneksi internet normal.
- Menampilkan hasil pencarian dalam waktu maksimal **2 detik**.
- Menyimpan data ke Google Spreadsheet dalam waktu maksimal **5 detik**.
- Membuat PDF surat dalam waktu maksimal **5 detik**.
- Membuat QR Code secara otomatis saat surat diterbitkan.

---

## 11.2 Availability

Target ketersediaan sistem:

- 24 Jam
- 7 Hari dalam seminggu

Downtime hanya dilakukan saat proses pemeliharaan.

---

## 11.3 Compatibility

Website harus dapat digunakan pada:

### Desktop

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

---

### Android

- Chrome
- Edge
- Firefox

---

### iPhone

- Safari
- Chrome

---

## 11.4 Responsive Design

Website harus responsif pada ukuran layar:

| Device  | Minimum Width |
| ------- | ------------: |
| Android |        360 px |
| Tablet  |        768 px |
| Laptop  |       1366 px |
| Desktop |       1920 px |

---

## 11.5 Security

Sistem harus:

- Menggunakan HTTPS saat dipublikasikan.
- Menyembunyikan URL Google Spreadsheet dari pengguna.
- Seluruh akses Spreadsheet hanya melalui Google Apps Script.
- Login Admin menggunakan Username dan Password.
- Mencegah akses Dashboard tanpa login.
- Melakukan validasi seluruh input sebelum disimpan.
- Menolak permintaan API yang tidak valid.

---

## 11.6 Maintainability

Kode program harus:

- Mudah dibaca.
- Menggunakan struktur folder yang rapi.
- Menggunakan komponen React yang dapat digunakan kembali (_reusable_).
- Dipisahkan antara UI, API, dan utilitas.
- Menggunakan konfigurasi yang mudah diubah tanpa mengedit banyak file.

---

## 11.7 Scalability

Sistem harus mampu menangani:

- Ribuan data mahasiswa.
- Penambahan data setiap tahun akademik.
- Penambahan Program Studi tanpa perubahan kode yang signifikan.
- Penambahan admin di masa mendatang.

---

# 12. Business Rules (Aturan Bisnis)

## 12.1 Pengajuan

- Mahasiswa tidak perlu login.
- Mahasiswa wajib mengisi seluruh data.
- Data yang telah dikirim tidak dapat diubah oleh mahasiswa.
- Satu NIM hanya boleh memiliki satu pengajuan aktif.
- Jika NIM sudah memiliki pengajuan, sistem menolak pengajuan baru.

---

## 12.2 Status Pengajuan

Status hanya terdiri dari:

| Status              | Keterangan                                                 |
| ------------------- | ---------------------------------------------------------- |
| Menunggu Verifikasi | Data telah dikirim dan menunggu pemeriksaan admin.         |
| Belum Lunas         | Mahasiswa masih memiliki tanggungan keuangan.              |
| Lunas               | Mahasiswa telah bebas tanggungan dan dapat mencetak surat. |

---

## 12.3 Nomor Surat

Nomor surat:

- Dibuat otomatis.
- Tidak boleh duplikat.
- Mengikuti format resmi institusi.

Contoh:

```text
075/A2/IAIMU/2026
076/A2/IAIMU/2026
077/A2/IAIMU/2026
```

Nomor hanya dibuat saat status berubah menjadi **Lunas**.

---

## 12.4 Cetak Surat

Surat hanya dapat dicetak jika:

- Status = **Lunas**.

Jika status:

- Menunggu Verifikasi
- Belum Lunas

maka tombol cetak tidak ditampilkan.

---

## 12.5 QR Code

QR Code dibuat saat surat diterbitkan.

QR Code digunakan untuk memverifikasi keaslian surat melalui halaman verifikasi.

---

## 12.6 WhatsApp Admin

Setelah mahasiswa mengirim formulir:

- Sistem membuka WhatsApp secara otomatis.
- Nomor tujuan dapat terdiri dari satu atau beberapa nomor yang dikelola admin.
- Isi pesan telah disiapkan otomatis berdasarkan data yang diisi mahasiswa.

---

# 13. Validasi Data

## Form Mahasiswa

| Field          | Validasi              |
| -------------- | --------------------- |
| Nama           | Wajib diisi           |
| Nama           | Maksimal 100 karakter |
| NIM            | Wajib diisi           |
| NIM            | Hanya angka           |
| Program Studi  | Wajib diisi           |
| Program Studi  | Maksimal 100 karakter |
| Nomor WhatsApp | Wajib diisi           |
| Nomor WhatsApp | Hanya angka           |
| Nomor WhatsApp | Minimal 10 digit      |

---

## Checkbox Persetujuan

Mahasiswa wajib menyetujui:

> Saya telah memastikan seluruh data yang saya isi benar. Data yang telah dikirim tidak dapat diubah.

Tanpa persetujuan tersebut, tombol **Submit** tidak dapat digunakan.

---

## Validasi NIM

Sistem mengecek apakah NIM sudah pernah mengajukan.

Jika ditemukan:

- Menunggu Verifikasi
- Belum Lunas
- Lunas

maka sistem menampilkan pesan:

> **NIM ini sudah memiliki pengajuan. Silakan hubungi Admin apabila terdapat kesalahan data atau membutuhkan bantuan.**

---

# 14. Struktur Google Spreadsheet

## Sheet : Pengajuan

| Kolom            | Keterangan                                |
| ---------------- | ----------------------------------------- |
| ID               | ID Pengajuan                              |
| Timestamp        | Waktu Pengajuan                           |
| Nama             | Nama Mahasiswa                            |
| NIM              | Nomor Induk Mahasiswa                     |
| Program Studi    | Program Studi                             |
| Nomor WhatsApp   | Nomor Mahasiswa                           |
| Status           | Menunggu Verifikasi / Belum Lunas / Lunas |
| Nomor Surat      | Nomor Surat                               |
| QR Token         | Token QR                                  |
| Tanggal Validasi | Diisi saat status menjadi Lunas           |
| Admin Validator  | Username Admin yang melakukan verifikasi  |

---

## Sheet : Admin

| Kolom    | Keterangan                            |
| -------- | ------------------------------------- |
| Username | Username Admin                        |
| Password | Password (disimpan dalam bentuk hash) |
| Nama     | Nama Admin                            |
| Status   | Aktif / Nonaktif                      |

---

## Sheet : Pengaturan

| Kolom                | Keterangan                           |
| -------------------- | ------------------------------------ |
| Nomor Surat Terakhir | Nomor terakhir yang telah digunakan  |
| Tahun Aktif          | Tahun berjalan                       |
| Nomor WA Admin       | Satu atau lebih nomor WhatsApp Admin |

---

## Sheet : Audit Log

| Kolom       | Keterangan                   |
| ----------- | ---------------------------- |
| Timestamp   | Waktu perubahan              |
| NIM         | Nomor Mahasiswa              |
| Nama        | Nama Mahasiswa               |
| Status Lama | Status sebelum diubah        |
| Status Baru | Status setelah diubah        |
| Admin       | Username Admin               |
| Keterangan  | Catatan perubahan (opsional) |

---

# 15. Struktur ID Pengajuan

Setiap pengajuan memiliki ID unik.

Contoh:

```text
SBTK-2026-000001
SBTK-2026-000002
SBTK-2026-000003
```

ID ini digunakan sebagai identitas internal sistem dan tidak ditampilkan pada surat resmi.

---

# 16. Error Handling

Sistem harus memberikan pesan yang jelas kepada pengguna.

| Kondisi                                   | Pesan                                                          |
| ----------------------------------------- | -------------------------------------------------------------- |
| Semua field kosong                        | Semua data wajib diisi.                                        |
| NIM sudah pernah mengajukan               | NIM ini sudah memiliki pengajuan aktif.                        |
| Internet terputus                         | Gagal mengirim data. Periksa koneksi internet Anda.            |
| Server Google Apps Script tidak merespons | Terjadi gangguan pada server. Silakan coba beberapa saat lagi. |
| Login Admin salah                         | Username atau Password tidak sesuai.                           |
| Surat belum dapat dicetak                 | Surat hanya dapat dicetak setelah status menjadi **Lunas**.    |
| QR Code tidak valid                       | Surat tidak ditemukan atau tidak terdaftar di sistem.          |

# Product Requirements Document (PRD)

# Bagian 4 — UI/UX Specification, Sitemap, Wireframe, dan User Flow

---

# 17. UI/UX Principles

Aplikasi harus memiliki tampilan yang:

- Sederhana dan mudah dipahami.
- Menggunakan bahasa Indonesia.
- Responsif pada Android, Tablet, Laptop, dan Desktop.
- Fokus pada kemudahan pengajuan surat.
- Memiliki navigasi yang sederhana sehingga pengguna tidak memerlukan panduan khusus.

---

## Design Style

Konsep desain:

- Modern
- Clean
- Professional
- Minimalis
- Cepat diakses

---

## Warna

| Elemen     | Warna        |
| ---------- | ------------ |
| Primary    | Biru Tua     |
| Secondary  | Putih        |
| Success    | Hijau        |
| Warning    | Kuning       |
| Danger     | Merah        |
| Background | Abu-abu muda |

---

## Typography

Heading

- Bold
- Mudah dibaca

Body

- Regular
- Kontras tinggi

---

## Icon

Menggunakan ikon sederhana untuk:

- Home
- Search
- Print
- Login
- Logout
- WhatsApp
- PDF
- QR Code
- User
- Settings

---

# 18. Sitemap

```text
Website
│
├── Home
│
├── Ajukan Surat
│
│     ├── Form Pengajuan
│     └── Submit
│
├── Cek Status
│
├── Cetak Surat
│
├── Verifikasi QR
│
└── Login Admin
      │
      ├── Dashboard
      │
      ├── Data Pengajuan
      │
      ├── Detail Pengajuan
      │
      ├── Cetak Surat
      │
      ├── Audit Log
      │
      └── Pengaturan
```

---

# 19. Daftar Halaman

## 1. Home

Fungsi

Sebagai halaman utama website.

Komponen

- Logo IAIMU
- Nama Website
- Penjelasan singkat
- Tombol Ajukan Surat
- Tombol Cek Status
- Footer

---

## 2. Form Pengajuan

Komponen

- Nama Lengkap
- NIM
- Program Studi
- Nomor WhatsApp
- Checkbox Persetujuan
- Tombol Submit

---

Validasi

Apabila ada data kosong:

Field diberi warna merah.

Submit tidak dapat dilakukan.

---

## 3. Halaman Berhasil

Setelah submit berhasil.

Menampilkan

✅ Data berhasil dikirim

Status

Menunggu Verifikasi

Tombol

Hubungi Admin melalui WhatsApp

---

## 4. Cek Status

Komponen

- Input NIM
- Tombol Cari

---

Hasil

Nama

NIM

Program Studi

Status

---

Jika status

Menunggu Verifikasi

Menampilkan badge kuning.

---

Jika status

Belum Lunas

Badge merah.

---

Jika status

Lunas

Badge hijau.

Tombol

Cetak Surat

---

## 5. Halaman Cetak Surat

Menampilkan preview surat.

Komponen

- Preview PDF
- Tombol Download PDF
- Tombol Print

---

## 6. Halaman Login Admin

Komponen

- Username
- Password
- Tombol Login

---

Jika gagal

Username atau Password salah.

---

## 7. Dashboard Admin

Menampilkan statistik sederhana.

Contoh

```text
Total Pengajuan

Menunggu Verifikasi

Belum Lunas

Lunas
```

Di bawah statistik terdapat tabel data pengajuan.

---

## 8. Data Pengajuan

Tabel

| Nama | NIM | Prodi | Status | Aksi |
| ---- | --- | ----- | ------ | ---- |

---

Fitur

- Search Nama
- Search NIM
- Search Prodi
- Filter Status
- Pagination

---

Aksi

- Detail
- Ubah Status
- Cetak Surat

---

## 9. Detail Pengajuan

Menampilkan

Nama

NIM

Program Studi

Nomor WhatsApp

Status

Nomor Surat

Tanggal Pengajuan

QR Code

---

Admin dapat

Mengubah Status

---

## 10. Audit Log

Tabel

| Waktu | Admin | Status Lama | Status Baru | NIM |

---

Audit log hanya dapat dilihat.

Tidak dapat diubah.

---

## 11. Pengaturan

Berisi

- Nomor WhatsApp Admin
- Nomor Surat Terakhir
- Tahun Aktif

---

# 20. Wireframe

## Home

```text
+----------------------------------+

        LOGO IAIMU

SURAT BEBAS TANGGUNGAN

Penjelasan Singkat

[ Ajukan Surat ]

[ Cek Status ]

+----------------------------------+
```

---

## Form Pengajuan

```text
Nama Lengkap

[________________________]

NIM

[________________________]

Program Studi

[________________________]

Nomor WhatsApp

[________________________]

☐
Saya telah memastikan data benar.

[ Submit ]

```

---

## Cek Status

```text
Masukkan NIM

[________________]

[ Cari ]

------------------------

Nama

NIM

Program Studi

Status

```

---

## Dashboard Admin

```text
------------------------------------

Search

[________________]

Filter Status

[ Dropdown ]

------------------------------------

Nama

NIM

Prodi

Status

Aksi

------------------------------------

```

---

## Detail Pengajuan

```text
Nama

NIM

Program Studi

Nomor WA

Status

Nomor Surat

Tanggal

QR Code

-------------------

[ Belum Lunas ]

[ Lunas ]

```

---

# 21. Navigasi

## Mahasiswa

```text
Home

↓

Ajukan Surat

↓

Submit

↓

WhatsApp Admin

↓

Cek Status

↓

Cetak Surat
```

---

## Admin

```text
Login

↓

Dashboard

↓

Data Pengajuan

↓

Detail

↓

Ubah Status

↓

Cetak Surat
```

---

# 22. Responsive Layout

## Android

- Menu sederhana.
- Tombol penuh (full width).
- Input mudah disentuh.
- Tabel diubah menjadi kartu (card) agar mudah dibaca.

---

## Tablet

- Tata letak dua kolom pada halaman tertentu.
- Dashboard menampilkan statistik dan daftar pengajuan dengan ruang lebih luas.

---

## Laptop & Desktop

- Sidebar navigasi tetap di sisi kiri.
- Konten utama di sisi kanan.
- Tabel penuh dengan fitur pencarian dan filter.

---

# 23. UX Rules

- Maksimal tiga klik untuk mencapai fitur utama.
- Selalu tampilkan indikator proses saat mengirim data atau mencetak surat.
- Tombol dinonaktifkan saat proses berlangsung untuk mencegah klik ganda.
- Gunakan pesan sukses dan gagal yang jelas serta mudah dipahami.
- Seluruh formulir mendukung navigasi menggunakan keyboard.
- Setiap halaman memiliki tombol kembali (Back) jika diperlukan.
- Gunakan konfirmasi sebelum admin mengubah status menjadi **Lunas**, karena tindakan ini akan membuat nomor surat otomatis dan memungkinkan surat dicetak.

# Product Requirements Document (PRD)

# Bagian 5 — Arsitektur Sistem, Struktur Proyek, Database Spreadsheet, API, dan Keamanan

---

# 24. System Architecture

Aplikasi menggunakan arsitektur **Frontend → REST API → Google Spreadsheet**.

```text
                    Mahasiswa / Admin
                            │
                            │
                 React + Vite Frontend
                            │
                    Axios (HTTPS)
                            │
                            ▼
               Google Apps Script API
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
 Google Spreadsheet     Google Drive      QR Generator
        │
        ▼
    Data Pengajuan
```

---

# 25. Teknologi

## Frontend

| Teknologi       | Fungsi             |
| --------------- | ------------------ |
| React + Vite    | Framework Frontend |
| Tailwind CSS    | Styling            |
| React Router    | Routing            |
| Axios           | REST API           |
| React Hook Form | Form Validation    |
| Zod             | Validasi Input     |
| React QR Code   | Generate QR        |
| html2pdf.js     | Export PDF         |

---

## Backend

Google Apps Script

Fungsi:

- REST API
- CRUD Spreadsheet
- Login Admin
- Generate Nomor Surat
- Generate QR Token
- Validasi NIM
- Audit Log

---

## Database

Google Spreadsheet

---

## Hosting

Frontend

- Vercel
- Netlify
- Firebase Hosting

Backend

- Google Apps Script

Database

- Google Spreadsheet

---

# 26. Struktur Folder Frontend

```text
src/

├── assets/
│
├── components/
│   ├── common/
│   ├── form/
│   ├── layout/
│   ├── modal/
│   └── ui/
│
├── pages/
│   ├── Home/
│   ├── Submit/
│   ├── Status/
│   ├── Print/
│   ├── Verify/
│   ├── Login/
│   └── Dashboard/
│
├── routes/
│
├── services/
│
├── hooks/
│
├── utils/
│
├── context/
│
├── constants/
│
├── styles/
│
├── App.jsx
│
└── main.jsx
```

---

# 27. Struktur Google Spreadsheet

## Sheet 1 — Pengajuan

| Kolom            |
| ---------------- |
| ID Pengajuan     |
| Timestamp        |
| Nama             |
| NIM              |
| Program Studi    |
| Nomor WhatsApp   |
| Status           |
| Nomor Surat      |
| QR Token         |
| Tanggal Validasi |
| Admin Validator  |

---

## Sheet 2 — Admin

| Kolom         |
| ------------- |
| Username      |
| Password Hash |
| Nama          |
| Status        |

---

## Sheet 3 — Pengaturan

| Kolom                  |
| ---------------------- |
| Tahun Aktif            |
| Nomor Surat Terakhir   |
| Nomor WhatsApp Admin 1 |
| Nomor WhatsApp Admin 2 |
| Nomor WhatsApp Admin 3 |
| Template Nomor Surat   |

---

## Sheet 4 — Audit Log

| Kolom       |
| ----------- |
| Timestamp   |
| Admin       |
| NIM         |
| Nama        |
| Status Lama |
| Status Baru |
| Keterangan  |

---

# 28. REST API

## Public API

### Submit Pengajuan

```http
POST /api/submit
```

Request

```json
{
  "nama": "",
  "nim": "",
  "prodi": "",
  "whatsapp": ""
}
```

Response

```json
{
  "success": true,
  "status": "Menunggu Verifikasi"
}
```

---

### Cek Status

```http
GET /api/status/{nim}
```

Response

```json
{
  "nama": "",
  "nim": "",
  "prodi": "",
  "status": "",
  "nomorSurat": ""
}
```

---

### Verifikasi QR

```http
GET /api/verify/{token}
```

Response

```json
{
  "valid": true,
  "nama": "",
  "nim": "",
  "prodi": "",
  "nomorSurat": ""
}
```

---

## Admin API

### Login

```http
POST /api/admin/login
```

---

### Dashboard

```http
GET /api/admin/dashboard
```

---

### Daftar Pengajuan

```http
GET /api/admin/submissions
```

---

### Detail Pengajuan

```http
GET /api/admin/submissions/{id}
```

---

### Update Status

```http
PUT /api/admin/submissions/{id}
```

---

### Cetak Surat

```http
POST /api/admin/print/{id}
```

---

### Audit Log

```http
GET /api/admin/logs
```

---

# 29. Alur Nomor Surat

Nomor surat hanya dibuat saat status berubah menjadi **Lunas**.

```text
Status

↓

Lunas

↓

Ambil Nomor Terakhir

↓

Tambah +1

↓

Simpan ke Spreadsheet

↓

Simpan ke Data Mahasiswa

↓

Generate PDF
```

Contoh:

```text
075/A2/IAIMU/2026

↓

076/A2/IAIMU/2026
```

---

# 30. Alur QR Code

Saat surat diterbitkan.

```text
Generate Token

↓

Simpan Token

↓

Generate QR

↓

Masukkan ke PDF

↓

Cetak
```

Contoh URL tujuan QR (saat domain sudah tersedia):

```text
https://domainanda.com/verify?id=TOKEN123456
```

---

# 31. Authentication

## Mahasiswa

Tidak memiliki akun.

Tidak perlu login.

---

## Admin

Menggunakan:

- Username
- Password

Password disimpan dalam bentuk **hash** (misalnya menggunakan SHA-256 atau algoritma yang didukung oleh Apps Script) dan tidak disimpan sebagai teks biasa.

---

# 32. Security

Frontend

- Validasi semua input.
- Sanitasi data sebelum dikirim.
- Tidak menyimpan password di browser.

Backend

- Validasi ulang semua data.
- Menolak request yang tidak lengkap.
- Memastikan NIM tidak memiliki pengajuan aktif sebelum menyimpan data baru.
- Mencatat aktivitas penting ke Audit Log.

Spreadsheet

- Tidak dipublikasikan ke internet.
- Hanya dapat diakses melalui Google Apps Script.
- Hak akses dibatasi untuk administrator yang berwenang.

---

# 33. Backup & Recovery

- Google Spreadsheet menjadi sumber data utama.
- Disarankan membuat salinan (backup) Spreadsheet secara berkala, misalnya mingguan atau bulanan.
- Audit Log tidak boleh dihapus agar riwayat perubahan tetap tersedia.

---

# 34. Logging

Aktivitas berikut dicatat:

- Login Admin.
- Pengajuan baru.
- Perubahan status.
- Penerbitan nomor surat.
- Pencetakan surat.
- Kegagalan proses penting (misalnya gagal menyimpan data atau gagal membuat PDF).

---

# 35. Konfigurasi Sistem

Pengaturan yang dapat diubah tanpa mengubah kode program:

- Tahun aktif.
- Nomor surat terakhir.
- Daftar nomor WhatsApp Admin.
- Nama institusi.
- Alamat institusi.
- URL halaman verifikasi QR (saat domain tersedia).

Seluruh konfigurasi tersebut disimpan pada sheet **Pengaturan**, sehingga admin dapat memperbaruinya dengan mudah melalui dashboard atau langsung melalui Spreadsheet jika diperlukan.

# Product Requirements Document (PRD)

# Bagian 6 — Software Design Specification (SDS), Modul Sistem, Komponen, dan Alur Implementasi

---

# 36. Gambaran Arsitektur Aplikasi

Aplikasi dibagi menjadi tiga bagian utama.

```text
Frontend (React + Vite)
        │
        │ Axios
        ▼
Google Apps Script (REST API)
        │
        ▼
Google Spreadsheet
```

Masing-masing bagian memiliki tanggung jawab yang berbeda sehingga aplikasi mudah dikembangkan dan dipelihara.

---

# 37. Modul Sistem

Sistem terdiri dari 11 modul utama.

| No  | Modul               | Pengguna  |
| --- | ------------------- | --------- |
| 1   | Home                | Mahasiswa |
| 2   | Form Pengajuan      | Mahasiswa |
| 3   | Cek Status          | Mahasiswa |
| 4   | Cetak Surat         | Mahasiswa |
| 5   | Verifikasi QR       | Publik    |
| 6   | Login Admin         | Admin     |
| 7   | Dashboard           | Admin     |
| 8   | Manajemen Pengajuan | Admin     |
| 9   | Audit Log           | Admin     |
| 10  | Pengaturan          | Admin     |
| 11  | REST API            | Sistem    |

---

# 38. Modul Home

## Tujuan

Memberikan informasi singkat mengenai layanan Surat Bebas Tanggungan Keuangan.

## Komponen

- Logo IAIMU
- Judul Website
- Deskripsi
- Tombol Ajukan Surat
- Tombol Cek Status

---

## Alur

```text
User

↓

Home

↓

Pilih Menu

↓

Ajukan Surat
atau
Cek Status
```

---

# 39. Modul Form Pengajuan

## Tujuan

Mahasiswa mengajukan surat.

---

## Input

Nama

NIM

Program Studi

Nomor WhatsApp

Checkbox Persetujuan

---

## Output

Data tersimpan ke Spreadsheet.

Status

Menunggu Verifikasi.

---

## Flow

```text
Isi Form

↓

Validasi

↓

Cek NIM

↓

Sudah Ada?

├── Ya

│

└── Tampilkan Pesan

↓

Tidak

↓

Simpan Data

↓

Status

Menunggu Verifikasi

↓

Redirect WhatsApp
```

---

# 40. Modul Cek Status

## Tujuan

Menampilkan status pengajuan mahasiswa.

---

Input

NIM

---

Output

Nama

NIM

Program Studi

Status

Nomor Surat

Tanggal

---

Flow

```text
Input NIM

↓

Cari

↓

API

↓

Spreadsheet

↓

Tampilkan Data
```

---

# 41. Modul Cetak Surat

## Tujuan

Menghasilkan surat resmi dalam format PDF.

---

Proses

```text
Status

↓

Lunas?

↓

Ya

↓

Ambil Template

↓

Isi Data

↓

Generate QR

↓

Generate PDF

↓

Download
```

---

Output

PDF

---

Jika status bukan **Lunas**, sistem menolak proses pencetakan.

---

# 42. Modul Login Admin

## Input

Username

Password

---

Validasi

- Username wajib diisi.
- Password wajib diisi.

---

Jika benar

Masuk Dashboard.

Jika salah

Muncul pesan

> Username atau Password salah.

---

# 43. Modul Dashboard

Dashboard merupakan pusat administrasi.

Menampilkan:

- Jumlah Pengajuan
- Menunggu Verifikasi
- Belum Lunas
- Lunas

---

Fitur

- Search
- Filter
- Pagination
- Refresh

---

# 44. Modul Manajemen Pengajuan

Admin dapat membuka detail mahasiswa.

Informasi:

Nama

NIM

Program Studi

Nomor WhatsApp

Status

Nomor Surat

Tanggal Pengajuan

---

Aksi

- Ubah Status
- Cetak Surat
- Lihat Audit Log

---

Flow

```text
Dashboard

↓

Klik Data

↓

Detail

↓

Ubah Status

↓

Simpan

↓

Audit Log
```

---

# 45. Modul Audit Log

Semua perubahan status dicatat.

Contoh

| Waktu | Admin | Perubahan        |
| ----- | ----- | ---------------- |
| 10:20 | Admin | Menunggu → Lunas |

Audit Log hanya dapat dibaca.

Tidak dapat diedit.

---

# 46. Modul Pengaturan

Berisi konfigurasi sistem.

Data

- Tahun Aktif
- Nomor Surat Terakhir
- Nomor WhatsApp Admin
- Nama Institusi
- Alamat Institusi

---

Semua perubahan langsung tersimpan ke Spreadsheet.

---

# 47. Modul QR Verification

Saat QR Code dipindai.

Flow

```text
Scan QR

↓

Token

↓

API

↓

Spreadsheet

↓

Data Ditemukan?

↓

Ya

↓

Surat Valid

↓

Tidak

↓

Surat Tidak Valid
```

---

Halaman verifikasi menampilkan

- Nama
- NIM
- Program Studi
- Nomor Surat
- Status

---

# 48. REST API Flow

## Submit

```text
React

↓

Axios

↓

Apps Script

↓

Spreadsheet

↓

Response
```

---

## Status

```text
React

↓

API

↓

Spreadsheet

↓

JSON
```

---

## Login

```text
React

↓

Apps Script

↓

Sheet Admin

↓

Token Login
```

---

## Update Status

```text
Dashboard

↓

API

↓

Spreadsheet

↓

Audit Log

↓

Success
```

---

# 49. Component Structure (React)

```text
App

├── Navbar

├── Footer

├── Home

├── Form

│     ├── Input

│     ├── Button

│     ├── Checkbox

│     └── Validation

│
├── Status

├── Print

├── Verify

├── Login

└── Dashboard

      ├── Sidebar

      ├── Header

      ├── Table

      ├── Search

      ├── Filter

      ├── Pagination

      └── Modal
```

---

# 50. State Management

State yang digunakan:

Mahasiswa

- Form Data
- Status Pengajuan

Admin

- Login
- Dashboard
- Data Pengajuan
- Filter
- Search
- Pagination

---

# 51. Error Flow

## Submit Gagal

```text
Klik Submit

↓

Internet Putus?

↓

Ya

↓

Pesan Error

↓

Coba Lagi
```

---

## Login Gagal

```text
Login

↓

Password Salah

↓

Tampilkan Error
```

---

## Surat Belum Bisa Dicetak

```text
Klik Cetak

↓

Status

Belum Lunas

↓

Tampilkan Informasi

↓

Selesai
```

---

# 52. Deployment Architecture

```text
Internet

↓

Vercel

↓

React Website

↓

Google Apps Script

↓

Google Spreadsheet
```

---

# 53. Pengembangan Bertahap (Development Milestone)

### Tahap 1 – Infrastruktur

- Membuat Google Spreadsheet.
- Membuat Google Apps Script.
- Membuat REST API dasar.
- Deploy backend.

### Tahap 2 – Frontend Mahasiswa

- Home.
- Form Pengajuan.
- Cek Status.
- Redirect WhatsApp.

### Tahap 3 – Dashboard Admin

- Login.
- Dashboard.
- Daftar Pengajuan.
- Pencarian.
- Filter.

### Tahap 4 – Surat

- Nomor surat otomatis.
- Generate PDF.
- QR Code.
- Halaman verifikasi.

### Tahap 5 – Penyempurnaan

- Audit Log.
- Pengaturan.
- Optimasi responsif.
- Pengujian akhir.

---

# 54. Acceptance Criteria

Aplikasi dinyatakan selesai apabila:

- Mahasiswa dapat mengajukan surat tanpa login.
- Sistem menolak pengajuan dengan NIM yang sudah memiliki pengajuan aktif.
- Data tersimpan di Google Spreadsheet.
- Mahasiswa otomatis diarahkan ke WhatsApp Admin setelah submit.
- Admin dapat login dan mengelola pengajuan.
- Admin dapat mengubah status menjadi **Belum Lunas** atau **Lunas**.
- Nomor surat dibuat otomatis tanpa duplikasi.
- Surat PDF mengikuti format resmi institusi.
- QR Code dapat digunakan untuk memverifikasi keaslian surat.
- Halaman verifikasi menampilkan data surat yang valid.
- Audit log mencatat setiap perubahan status.
- Aplikasi berjalan dengan baik pada Android, tablet, laptop, dan desktop.

# Product Requirements Document (PRD)

# Bagian 7 — Database Design, Google Apps Script Specification, API Contract, Business Logic, dan Algoritma Sistem

---

# 55. Database Design (Google Spreadsheet)

Database menggunakan **Google Spreadsheet** sebagai media penyimpanan utama.

Struktur dibuat sederhana agar mudah dipelihara oleh pihak kampus.

---

## Sheet 1 — Pengajuan

Nama Sheet:

```text
Pengajuan
```

| Kolom            | Tipe     | Keterangan                   |
| ---------------- | -------- | ---------------------------- |
| ID               | String   | ID Pengajuan                 |
| Timestamp        | DateTime | Waktu Submit                 |
| Nama             | Text     | Nama Mahasiswa               |
| NIM              | Number   | Nomor Induk Mahasiswa        |
| Program Studi    | Text     | Program Studi                |
| No WhatsApp      | Number   | Nomor HP Mahasiswa           |
| Status           | Enum     | Menunggu, Belum Lunas, Lunas |
| Nomor Surat      | Text     | Nomor Surat                  |
| QR Token         | Text     | Token QR                     |
| Tanggal Validasi | Date     | Diisi ketika Lunas           |
| Admin Validator  | Text     | Username Admin               |

---

## Sheet 2 — Admin

Nama Sheet

```text
Admin
```

| Kolom         | Tipe                |
| ------------- | ------------------- |
| Username      | Text                |
| Password Hash | Text                |
| Nama          | Text                |
| Status        | Active / Non Active |

---

## Sheet 3 — Pengaturan

| Kolom                | Contoh                   |
| -------------------- | ------------------------ |
| Tahun Aktif          | 2026                     |
| Nomor Surat Terakhir | 75                       |
| Nomor WA 1           | 628123456789             |
| Nomor WA 2           | 628987654321             |
| Format Nomor Surat   | {nomor}/A2/IAIMU/{tahun} |

---

## Sheet 4 — Audit Log

| Kolom          |
| -------------- |
| Timestamp      |
| Username Admin |
| NIM            |
| Nama           |
| Status Lama    |
| Status Baru    |
| Keterangan     |

---

# 56. Data Dictionary

## Pengajuan

### ID

Contoh

```text
SBTK-2026-000001
```

Harus unik.

Tidak boleh berubah.

---

### Nama

- Wajib
- Maksimal 100 karakter

---

### NIM

- Wajib
- Hanya angka
- Tidak boleh kosong

---

### Program Studi

Contoh

```text
Pendidikan Agama Islam
```

---

### Nomor WhatsApp

Contoh

```text
628123456789
```

---

### Status

Nilai yang diperbolehkan

```text
Menunggu Verifikasi

Belum Lunas

Lunas
```

---

### Nomor Surat

Kosong saat submit.

Terisi setelah status menjadi **Lunas**.

---

### QR Token

Contoh

```text
8FD72KAB1298
```

Digunakan untuk verifikasi.

---

# 57. Business Logic

---

## Logic 1

### Submit Pengajuan

```text
Mahasiswa

↓

Isi Form

↓

Validasi

↓

Cek NIM

↓

Ada?

├── Ya

│

└── Tolak

↓

Tidak

↓

Simpan

↓

Status

Menunggu Verifikasi

↓

Redirect WhatsApp
```

---

## Logic 2

### Admin Login

```text
Username

↓

Password

↓

Hash

↓

Bandingkan

↓

Valid?

↓

Dashboard
```

---

## Logic 3

### Ubah Status

```text
Menunggu

↓

Belum Lunas

atau

↓

Lunas
```

Jika menjadi **Lunas**

otomatis

- Generate Nomor Surat
- Generate QR
- Simpan Audit Log

---

## Logic 4

### Cetak Surat

```text
Klik Print

↓

Status

↓

Lunas?

↓

Ya

↓

Generate PDF

↓

Download
```

---

## Logic 5

### QR Verification

```text
Scan

↓

Token

↓

Cari

↓

Ada?

↓

Ya

↓

Valid
```

---

# 58. Google Apps Script Functions

## Public

### submitApplication()

Fungsi

Menyimpan data mahasiswa.

---

### checkStatus()

Fungsi

Mengecek status berdasarkan NIM.

---

### verifyQRCode()

Fungsi

Verifikasi QR Code.

---

## Admin

### login()

Login admin.

---

### getDashboard()

Mengambil data dashboard.

---

### getApplications()

Mengambil seluruh pengajuan.

---

### getApplication()

Mengambil detail mahasiswa.

---

### updateStatus()

Mengubah status.

---

### generateLetter()

Generate PDF.

---

### getAuditLogs()

Mengambil Audit Log.

---

### getSettings()

Mengambil konfigurasi.

---

### saveSettings()

Menyimpan konfigurasi.

---

# 59. REST API Contract

## POST

### Submit

```http
POST /submit
```

Body

```json
{
  "nama": "Mustofa",
  "nim": "22010001",
  "prodi": "Teknik Informatika",
  "whatsapp": "628123456789"
}
```

---

Response

```json
{
  "success": true,
  "message": "Pengajuan berhasil dikirim."
}
```

---

## GET

### Status

```http
GET /status?nim=22010001
```

---

Response

```json
{
  "nama": "Mustofa",
  "status": "Menunggu Verifikasi"
}
```

---

## POST

### Login

```http
POST /admin/login
```

---

## GET

Dashboard

```http
GET /admin/dashboard
```

---

## GET

Pengajuan

```http
GET /admin/applications
```

---

## PUT

Update Status

```http
PUT /admin/application
```

---

## GET

Audit

```http
GET /admin/logs
```

---

# 60. Nomor Surat Generator

Algoritma

```text
Ambil Nomor Terakhir

↓

Tambah 1

↓

Ambil Tahun Aktif

↓

Gabungkan

↓

076/A2/IAIMU/2026

↓

Simpan

↓

Return
```

Nomor tidak boleh digunakan dua kali.

---

# 61. QR Generator

Algoritma

```text
Generate UUID

↓

Hash

↓

Token

↓

Simpan

↓

Generate QR
```

Contoh

```text
TOKEN

↓

8FD72KAB1298

↓

https://domain.com/verify?id=8FD72KAB1298
```

---

# 62. WhatsApp Generator

Pesan otomatis

```text
Assalamu'alaikum Admin.

Saya telah mengajukan Surat Keterangan Bebas Tanggungan Keuangan.

Nama : {Nama}

NIM : {NIM}

Program Studi : {Prodi}

Mohon dilakukan verifikasi.

Terima kasih.
```

Jika terdapat lebih dari satu nomor WhatsApp Admin, sistem menggunakan **nomor utama** yang ditentukan pada menu Pengaturan. Nomor lain dapat dijadikan cadangan dan dapat diaktifkan sewaktu-waktu oleh admin.

---

# 63. PDF Generator

PDF mengikuti template resmi.

Data yang diganti

- Nama
- NIM
- Program Studi
- Nomor Surat
- QR Code
- Tanggal

Elemen lain tetap sama sesuai format institusi.

---

# 64. Audit Log

Semua aktivitas penting dicatat.

Aktivitas

- Login Admin
- Submit Mahasiswa
- Ubah Status
- Generate Nomor Surat
- Cetak Surat
- Perubahan Pengaturan

Audit Log tidak dapat dihapus melalui dashboard.

---

# 65. Session Management

Admin

Login berhasil

↓

Session dibuat

↓

Mengakses Dashboard

↓

Logout

↓

Session dihapus

Session akan berakhir otomatis setelah periode tidak aktif yang ditentukan (misalnya 30 menit) sehingga dashboard lebih aman jika komputer ditinggalkan.

---

# 66. Backup Strategy

Backup dilakukan terhadap:

- Sheet Pengajuan
- Sheet Admin
- Sheet Pengaturan
- Sheet Audit Log

Disarankan menggunakan salinan otomatis Google Spreadsheet secara berkala (harian atau mingguan) agar data dapat dipulihkan apabila terjadi kesalahan atau penghapusan yang tidak disengaja.

# Product Requirements Document (PRD)

# Bagian 8 — Rencana Implementasi, Pengujian (Testing), Deployment, Operasional, dan Maintenance

---

# 67. Roadmap Pengembangan

Pengembangan dilakukan secara bertahap agar setiap modul dapat diuji sebelum melanjutkan ke tahap berikutnya.

---

## Phase 1 — Persiapan Proyek

### Tujuan

Menyiapkan seluruh kebutuhan dasar proyek.

### Aktivitas

- Membuat Repository Git
- Konfigurasi React + Vite
- Instalasi Tailwind CSS
- Instalasi React Router
- Instalasi Axios
- Membuat struktur folder
- Konfigurasi Environment

### Output

Project React siap dikembangkan.

---

## Phase 2 — Backend

### Aktivitas

- Membuat Google Spreadsheet
- Membuat seluruh Sheet
- Membuat Google Apps Script
- Membuat REST API
- Pengujian API menggunakan Postman

### Output

Backend siap digunakan.

---

## Phase 3 — Frontend Mahasiswa

### Halaman

- Home
- Form Pengajuan
- Halaman Berhasil
- Cek Status
- Cetak Surat
- Verifikasi QR

### Output

Mahasiswa dapat menggunakan seluruh fitur.

---

## Phase 4 — Dashboard Admin

### Halaman

- Login
- Dashboard
- Data Pengajuan
- Detail Pengajuan
- Audit Log
- Pengaturan

### Output

Admin dapat mengelola seluruh data.

---

## Phase 5 — Surat

### Aktivitas

- Generate Nomor Surat
- Generate QR Code
- Generate PDF
- Print Preview

### Output

Surat siap dicetak.

---

## Phase 6 — Finalisasi

### Aktivitas

- Bug Fix
- Optimasi
- Responsive Testing
- Security Testing
- Deployment

---

# 68. Testing Plan

Pengujian dilakukan pada setiap modul.

---

## Functional Testing

### Form Pengajuan

| Test Case                | Hasil                |
| ------------------------ | -------------------- |
| Semua field diisi        | Berhasil             |
| Nama kosong              | Ditolak              |
| NIM kosong               | Ditolak              |
| Prodi kosong             | Ditolak              |
| WhatsApp kosong          | Ditolak              |
| Checkbox belum dicentang | Submit dinonaktifkan |

---

### Validasi NIM

| Kondisi       | Hasil    |
| ------------- | -------- |
| NIM baru      | Berhasil |
| NIM sudah ada | Ditolak  |

---

### Login Admin

| Kondisi        | Hasil |
| -------------- | ----- |
| Username benar | Login |
| Password salah | Gagal |

---

### Update Status

| Kondisi                | Hasil    |
| ---------------------- | -------- |
| Menunggu → Belum Lunas | Berhasil |
| Menunggu → Lunas       | Berhasil |
| Belum Lunas → Lunas    | Berhasil |

---

### Cetak Surat

| Status      | Hasil      |
| ----------- | ---------- |
| Menunggu    | Tidak Bisa |
| Belum Lunas | Tidak Bisa |
| Lunas       | Bisa       |

---

### QR Code

| Kondisi     | Hasil             |
| ----------- | ----------------- |
| Token benar | Surat Valid       |
| Token salah | Surat Tidak Valid |

---

# 69. User Acceptance Test (UAT)

## Mahasiswa

| No  | Pengujian            |
| --- | -------------------- |
| 1   | Membuka website      |
| 2   | Mengisi formulir     |
| 3   | Submit berhasil      |
| 4   | Redirect ke WhatsApp |
| 5   | Cek Status           |
| 6   | Download Surat       |

---

## Admin

| No  | Pengujian      |
| --- | -------------- |
| 1   | Login          |
| 2   | Dashboard      |
| 3   | Search         |
| 4   | Filter         |
| 5   | Update Status  |
| 6   | Generate Surat |
| 7   | Audit Log      |

---

# 70. Browser Testing

Minimal mendukung

| Browser | Support |
| ------- | ------- |
| Chrome  | ✅      |
| Edge    | ✅      |
| Firefox | ✅      |
| Safari  | ✅      |

---

# 71. Device Testing

| Device  | Support |
| ------- | ------- |
| Android | ✅      |
| Tablet  | ✅      |
| Laptop  | ✅      |
| Desktop | ✅      |
| iPhone  | ✅      |

---

# 72. Performance Testing

Target performa:

| Aktivitas    | Maksimum |
| ------------ | -------- |
| Load Home    | 3 detik  |
| Submit Form  | 5 detik  |
| Cek Status   | 2 detik  |
| Login        | 2 detik  |
| Generate PDF | 5 detik  |

---

# 73. Deployment

## Frontend

Deploy ke

- Vercel (Direkomendasikan)
- Netlify
- Firebase Hosting

---

## Backend

Deploy

Google Apps Script

Deploy sebagai

Web App

---

## Database

Google Spreadsheet

---

# 74. Environment

## Development

```text
Frontend

http://localhost:5173
```

Backend

Google Apps Script Development

---

## Production

Frontend

```text
https://domainanda.com
```

Backend

Google Apps Script Production

---

# 75. Environment Variables

Contoh file `.env`

```env
VITE_API_URL=https://script.google.com/macros/s/XXXXXXXX/exec
VITE_APP_NAME=Surat Bebas Tanggungan
VITE_APP_VERSION=1.0.0
```

**Catatan:** Jangan menyimpan Username Admin, Password Admin, atau informasi sensitif lainnya di file `.env` frontend karena seluruh isi frontend dapat diakses oleh pengguna.

---

# 76. Logging

Aktivitas yang dicatat:

Mahasiswa

- Submit Form

Admin

- Login
- Logout
- Update Status
- Generate Surat
- Cetak Surat
- Perubahan Pengaturan

---

# 77. Monitoring

Monitoring dilakukan untuk memastikan sistem berjalan dengan baik.

Yang dipantau:

- Error API
- Gagal Login
- Gagal Submit
- Gagal Generate PDF
- Gagal Generate QR
- Response Time API

---

# 78. Maintenance

Pemeliharaan dilakukan secara berkala.

Aktivitas

- Backup Spreadsheet
- Update Dependencies
- Perbaikan Bug
- Optimasi Performa
- Pemeriksaan Audit Log
- Pemeriksaan Nomor Surat

---

# 79. Risiko Proyek

| Risiko                                   | Dampak                                       | Mitigasi                                                                     |
| ---------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| Internet terputus                        | Submit gagal                                 | Tampilkan pesan kesalahan dan izinkan pengguna mencoba kembali.              |
| Google Spreadsheet penuh atau bermasalah | Data tidak tersimpan                         | Backup rutin dan pemantauan kapasitas.                                       |
| Google Apps Script mencapai kuota harian | API tidak dapat digunakan sementara          | Optimalkan penggunaan API dan siapkan prosedur pemantauan kuota.             |
| Admin salah mengubah status              | Surat tidak sesuai                           | Tambahkan dialog konfirmasi sebelum perubahan status dan catat di Audit Log. |
| Nomor surat ganda                        | Dokumen tidak valid                          | Gunakan mekanisme penguncian (locking) saat membuat nomor surat.             |
| Domain belum tersedia                    | QR Code belum dapat diverifikasi melalui web | Siapkan placeholder dan aktifkan fitur verifikasi setelah domain tersedia.   |

---

# 80. Dokumentasi yang Harus Disiapkan

Dokumen pendukung yang harus tersedia:

- README Project
- Panduan Instalasi
- Panduan Deployment
- Dokumentasi REST API
- Struktur Google Spreadsheet
- Panduan Admin
- Panduan Pengguna (Mahasiswa)
- Dokumentasi Backup & Recovery
- Changelog

---

# 81. Definisi Proyek Selesai (Definition of Done)

Proyek dinyatakan selesai apabila:

- Seluruh halaman telah selesai dibuat.
- Seluruh REST API berfungsi dengan baik.
- Data berhasil tersimpan ke Google Spreadsheet.
- Dashboard Admin dapat digunakan.
- Nomor surat otomatis tanpa duplikasi.
- Surat PDF sesuai template resmi.
- QR Code dapat diverifikasi.
- Audit Log berfungsi.
- Sistem responsif di Android dan Desktop.
- Pengujian (Functional Test dan UAT) dinyatakan lulus.
- Dokumentasi proyek lengkap dan siap digunakan oleh pihak IAIMU.

---

## Ringkasan Deliverables

Pada akhir proyek akan tersedia:

- Aplikasi Web Mahasiswa
- Dashboard Admin
- Google Apps Script Backend
- Google Spreadsheet Database
- Sistem Nomor Surat Otomatis
- Sistem QR Code Verifikasi
- Generator PDF sesuai template resmi
- Audit Log
- Dokumentasi lengkap (PRD, API, Deployment, dan Panduan Pengguna)

# Product Requirements Document (PRD)

# Bagian 9 — Rencana Pengembangan, Struktur Repository, Coding Standard, CI/CD, dan Dokumentasi Teknis

---

# 82. Development Workflow

Pengembangan aplikasi menggunakan metode **Agile** dengan iterasi pendek sehingga setiap fitur dapat diuji sebelum melanjutkan ke tahap berikutnya.

## Tahapan

```text
Planning

↓

Design

↓

Development

↓

Testing

↓

Deployment

↓

Maintenance
```

---

# 83. Sprint Planning

## Sprint 1

### Infrastruktur

Target

- Membuat Repository
- React + Vite
- Tailwind
- React Router
- Axios
- Google Spreadsheet
- Google Apps Script

Durasi

1 Minggu

---

## Sprint 2

### Mahasiswa

Target

- Home
- Form Pengajuan
- Validasi
- Submit
- Redirect WhatsApp

Durasi

1 Minggu

---

## Sprint 3

### Cek Status

Target

- Cek Status
- Validasi NIM
- Halaman Status
- Tombol Cetak

Durasi

1 Minggu

---

## Sprint 4

### Dashboard Admin

Target

- Login
- Dashboard
- Search
- Filter
- Detail

Durasi

2 Minggu

---

## Sprint 5

### Surat

Target

- Nomor Surat
- QR Code
- Generate PDF
- Print

Durasi

2 Minggu

---

## Sprint 6

### Final

Target

- Bug Fix
- Responsive
- Security
- Optimasi

Durasi

1 Minggu

---

# 84. Struktur Repository

```text
surat-bebas-tanggungan/

│

├── frontend/

│     ├── src/

│     ├── public/

│     ├── package.json

│     └── vite.config.js

│

├── backend/

│     ├── AppsScript.gs

│     ├── API.gs

│     ├── Auth.gs

│     ├── Letter.gs

│     ├── QR.gs

│     ├── Spreadsheet.gs

│     └── Utils.gs

│

├── docs/

│     ├── PRD.md

│     ├── API.md

│     ├── INSTALL.md

│     └── DEPLOYMENT.md

│

└── README.md
```

---

# 85. Struktur Frontend

```text
src/

├── assets/

├── components/

│     ├── common/

│     ├── layout/

│     ├── form/

│     ├── modal/

│     ├── table/

│     └── ui/

│

├── pages/

│     ├── Home/

│     ├── Apply/

│     ├── Status/

│     ├── Print/

│     ├── Verify/

│     ├── Login/

│     └── Dashboard/

│

├── services/

├── hooks/

├── context/

├── utils/

├── constants/

├── routes/

├── App.jsx

└── main.jsx
```

---

# 86. Struktur Backend (Google Apps Script)

```text
Apps Script

│

├── API.gs

├── Auth.gs

├── Submit.gs

├── Status.gs

├── Admin.gs

├── Letter.gs

├── QR.gs

├── Audit.gs

├── Settings.gs

├── Spreadsheet.gs

├── Validator.gs

└── Utils.gs
```

---

# 87. Coding Standard

## React

- Functional Component.
- Menggunakan Hooks.
- Tidak menggunakan Class Component.
- Satu komponen memiliki satu tanggung jawab utama (_Single Responsibility Principle_).
- Menghindari duplikasi kode dengan membuat komponen yang dapat digunakan ulang (_Reusable Component_).

---

## JavaScript

- Menggunakan ES6+.
- Menggunakan `const` dan `let`.
- Menghindari penggunaan `var`.
- Nama variabel menggunakan **camelCase**.
- Nama komponen React menggunakan **PascalCase**.
- Nama folder menggunakan **PascalCase** untuk halaman dan **camelCase** untuk utilitas.

---

## Google Apps Script

- Setiap fungsi memiliki satu tanggung jawab.
- Validasi dilakukan sebelum membaca atau menulis Spreadsheet.
- Gunakan `LockService` saat membuat nomor surat agar tidak terjadi nomor ganda jika dua admin memproses data secara bersamaan.
- Seluruh operasi Spreadsheet menggunakan fungsi utilitas agar mudah dipelihara.

---

# 88. Git Workflow

Branch utama:

```text
main
```

Branch pengembangan:

```text
develop
```

Branch fitur:

```text
feature/login
feature/dashboard
feature/status
feature/print
feature/qrcode
```

Branch perbaikan:

```text
hotfix/login
hotfix/api
```

---

# 89. Commit Convention

Contoh commit:

```text
feat: tambah halaman cek status

feat: tambah dashboard admin

fix: perbaiki validasi NIM

fix: perbaiki generate PDF

refactor: pisahkan service API

docs: update PRD

style: rapikan tampilan dashboard

test: tambah pengujian API
```

---

# 90. Versioning

Menggunakan **Semantic Versioning**.

Contoh:

```text
v1.0.0
```

Penjelasan:

- Major → Perubahan besar yang tidak kompatibel.
- Minor → Penambahan fitur baru yang tetap kompatibel.
- Patch → Perbaikan bug tanpa mengubah fitur.

---

# 91. CI/CD (Continuous Integration & Deployment)

Setiap perubahan kode akan melalui proses:

```text
Push ke Git

↓

GitHub

↓

Build

↓

Lint

↓

Test

↓

Deploy

↓

Production
```

Apabila build atau pengujian gagal, proses deployment dibatalkan.

---

# 92. Code Review Checklist

Sebelum kode digabungkan ke branch utama, lakukan pemeriksaan berikut:

| Pemeriksaan                         | Status |
| ----------------------------------- | ------ |
| Tidak ada error JavaScript          | ☐      |
| Tidak ada warning penting           | ☐      |
| Lolos linting                       | ☐      |
| Komponen dapat digunakan ulang      | ☐      |
| API sesuai kontrak                  | ☐      |
| Tidak ada data sensitif di frontend | ☐      |
| Responsif pada Android dan Desktop  | ☐      |
| Pengujian berhasil                  | ☐      |

---

# 93. Dokumentasi Teknis

Dokumen yang harus tersedia:

## README

Berisi:

- Deskripsi proyek.
- Cara instalasi.
- Cara menjalankan aplikasi.
- Struktur proyek.
- Teknologi yang digunakan.

---

## API Documentation

Menjelaskan:

- Endpoint.
- Method.
- Request.
- Response.
- Kode status HTTP.
- Contoh penggunaan.

---

## Deployment Guide

Menjelaskan:

- Deploy Frontend ke Vercel.
- Deploy Google Apps Script sebagai Web App.
- Menghubungkan React dengan Apps Script.
- Konfigurasi Spreadsheet.
- Pengaturan domain.

---

## User Manual

Untuk mahasiswa:

- Cara mengajukan surat.
- Cara mengecek status.
- Cara mencetak surat.

Untuk admin:

- Cara login.
- Cara mengubah status.
- Cara mencetak surat.
- Cara melihat Audit Log.
- Cara mengelola pengaturan.

---

# 94. Monitoring Setelah Produksi

Setelah sistem digunakan, lakukan pemantauan terhadap:

- Jumlah pengajuan per hari.
- Waktu respons API.
- Jumlah login admin.
- Kegagalan submit.
- Kegagalan generate PDF.
- Kegagalan verifikasi QR.
- Penggunaan nomor surat.
- Kapasitas Google Spreadsheet.

---

# 95. Rencana Pengembangan Versi Berikutnya (Roadmap)

Fitur yang dapat dipertimbangkan untuk versi selanjutnya:

## Versi 1.1

- Notifikasi WhatsApp otomatis kepada mahasiswa setelah status berubah.
- Ekspor data ke Excel.
- Filter berdasarkan periode pengajuan.

---

## Versi 1.2

- Integrasi dengan Sistem Informasi Akademik (SIAKAD).
- Import data mahasiswa dari file Excel.
- Dashboard statistik yang lebih lengkap.

---

## Versi 2.0

- Multi-role Admin (BAU, Bendahara, Super Admin).
- Tanda tangan digital resmi.
- Arsip surat dalam format PDF.
- Dukungan multi-instansi.
- Template surat yang dapat dikustomisasi melalui dashboard.

---

# 96. Penutup

Dokumen PRD ini menjadi acuan utama dalam pengembangan aplikasi **Surat Keterangan Bebas Tanggungan Keuangan IAIMU**. Seluruh kebutuhan bisnis, alur kerja, desain sistem, struktur data, antarmuka, spesifikasi teknis, hingga rencana implementasi telah dirancang untuk menghasilkan aplikasi yang:

- Memudahkan mahasiswa mengajukan surat tanpa login.
- Memudahkan admin memverifikasi status pengajuan.
- Menghasilkan nomor surat otomatis tanpa duplikasi.
- Mencetak surat sesuai template resmi institusi.
- Menyediakan QR Code untuk verifikasi keaslian surat.
- Menggunakan Google Spreadsheet sebagai database dan Google Apps Script sebagai REST API.
- Berjalan dengan baik di Android, laptop, dan desktop.

Dokumen ini menjadi referensi bagi pengembang, penguji, dan pihak IAIMU selama proses pembangunan hingga implementasi aplikasi di lingkungan produksi.

# Product Requirements Document (PRD)

# Bagian 10 — Lampiran, Checklist Implementasi, Estimasi Proyek, Future Enhancement, dan Penutup

---

# 97. Checklist Implementasi

## A. Persiapan

| No  | Pekerjaan                    | Status |
| --- | ---------------------------- | ------ |
| 1   | Membuat Repository Git       | ☐      |
| 2   | Membuat Project React + Vite | ☐      |
| 3   | Install Tailwind CSS         | ☐      |
| 4   | Install React Router         | ☐      |
| 5   | Install Axios                | ☐      |
| 6   | Membuat Struktur Folder      | ☐      |
| 7   | Membuat Environment Variable | ☐      |

---

## B. Google Spreadsheet

| No  | Pekerjaan                | Status |
| --- | ------------------------ | ------ |
| 1   | Membuat Sheet Pengajuan  | ☐      |
| 2   | Membuat Sheet Admin      | ☐      |
| 3   | Membuat Sheet Pengaturan | ☐      |
| 4   | Membuat Sheet Audit Log  | ☐      |

---

## C. Google Apps Script

| No  | Pekerjaan                | Status |
| --- | ------------------------ | ------ |
| 1   | REST API Submit          | ☐      |
| 2   | REST API Login           | ☐      |
| 3   | REST API Status          | ☐      |
| 4   | REST API Dashboard       | ☐      |
| 5   | REST API Update Status   | ☐      |
| 6   | REST API Generate Surat  | ☐      |
| 7   | REST API QR Verification | ☐      |

---

## D. Frontend Mahasiswa

| No  | Pekerjaan             | Status |
| --- | --------------------- | ------ |
| 1   | Home                  | ☐      |
| 2   | Ajukan Surat          | ☐      |
| 3   | Validasi Form         | ☐      |
| 4   | Redirect WhatsApp     | ☐      |
| 5   | Cek Status            | ☐      |
| 6   | Cetak Surat           | ☐      |
| 7   | Halaman Verifikasi QR | ☐      |

---

## E. Dashboard Admin

| No  | Pekerjaan        | Status |
| --- | ---------------- | ------ |
| 1   | Login            | ☐      |
| 2   | Dashboard        | ☐      |
| 3   | Daftar Pengajuan | ☐      |
| 4   | Pencarian        | ☐      |
| 5   | Filter Status    | ☐      |
| 6   | Detail Pengajuan | ☐      |
| 7   | Update Status    | ☐      |
| 8   | Generate Surat   | ☐      |
| 9   | Audit Log        | ☐      |
| 10  | Pengaturan       | ☐      |

---

## F. Pengujian

| No  | Pekerjaan                  | Status |
| --- | -------------------------- | ------ |
| 1   | Testing Form               | ☐      |
| 2   | Testing API                | ☐      |
| 3   | Testing Dashboard          | ☐      |
| 4   | Testing PDF                | ☐      |
| 5   | Testing QR Code            | ☐      |
| 6   | Testing Responsive         | ☐      |
| 7   | User Acceptance Test (UAT) | ☐      |

---

# 98. Estimasi Pengembangan

| Tahap                      | Estimasi |
| -------------------------- | -------: |
| Persiapan Proyek           |   2 Hari |
| Backend Google Apps Script |   4 Hari |
| Frontend Mahasiswa         |   5 Hari |
| Dashboard Admin            |   7 Hari |
| Generate PDF & QR Code     |   4 Hari |
| Pengujian                  |   3 Hari |
| Deployment                 |   2 Hari |

**Total estimasi:** sekitar **27 hari kerja** untuk satu pengembang. Estimasi dapat berubah sesuai kompleksitas perubahan dan proses revisi.

---

# 99. Future Enhancement

Versi berikutnya dapat menambahkan fitur-fitur berikut.

## V1.1

- Notifikasi WhatsApp otomatis ketika status berubah.
- Export Excel.
- Filter berdasarkan tanggal pengajuan.
- Dashboard statistik sederhana.

---

## V1.2

- Import data mahasiswa dari Excel.
- Multi Tahun Akademik.
- Riwayat surat per mahasiswa.
- Arsip PDF pada Google Drive.

---

## V2.0

- Multi Role Admin.
- Digital Signature.
- Integrasi SIAKAD.
- Template surat dinamis.
- Multi Kampus.
- Email Notification.
- Dashboard Analitik.

---

# 100. Kebutuhan Server

## Frontend

Rekomendasi

- Vercel
- Netlify

---

## Backend

Google Apps Script

---

## Database

Google Spreadsheet

---

## Domain

Contoh

```text
https://surat.iaimu.ac.id
```

---

## SSL

Menggunakan HTTPS.

---

# 101. Kebutuhan Browser

Minimal mendukung

- Chrome
- Firefox
- Edge
- Safari

---

# 102. Kebutuhan Perangkat

### Mahasiswa

- Android 10+
- iPhone
- Laptop
- Desktop

---

### Admin

- Laptop
- Desktop

Resolusi minimum

```text
1366 × 768
```

---

# 103. Daftar Library

## Frontend

```text
react
react-router-dom
axios
tailwindcss
react-hook-form
zod
react-qr-code
html2pdf.js
jspdf
```

---

## Backend

Google Apps Script

---

# 104. Standar Keamanan

Aplikasi harus memenuhi ketentuan berikut:

- Seluruh komunikasi menggunakan HTTPS.
- Password admin disimpan dalam bentuk hash.
- Validasi dilakukan di frontend dan backend.
- Spreadsheet tidak dapat diakses langsung oleh pengguna.
- Nomor surat dibuat menggunakan mekanisme yang mencegah duplikasi.
- Aktivitas penting dicatat pada Audit Log.
- Session admin berakhir otomatis setelah periode tidak aktif.

---

# 105. Deliverables Proyek

Setelah proyek selesai, hasil yang diserahkan meliputi:

## Source Code

- Frontend React + Vite.
- Backend Google Apps Script.

---

## Database

- Google Spreadsheet.
- Struktur Sheet lengkap.

---

## Dokumentasi

- PRD.
- README.
- Panduan Instalasi.
- Panduan Deployment.
- Dokumentasi API.
- Panduan Admin.
- Panduan Mahasiswa.

---

## Sistem

- Dashboard Admin.
- Website Mahasiswa.
- REST API.
- QR Verification.
- Generate PDF.
- Nomor Surat Otomatis.
- Audit Log.

---

# 106. Kriteria Go-Live

Aplikasi siap digunakan apabila:

- Seluruh fitur utama telah selesai.
- Tidak terdapat bug kritis.
- Nomor surat otomatis berjalan dengan benar.
- PDF sesuai template resmi. fileciteturn0file0
- QR Code dapat diverifikasi.
- Dashboard Admin berfungsi.
- Seluruh API telah diuji.
- Pengujian UAT disetujui oleh pihak IAIMU.
- Backup Google Spreadsheet telah disiapkan.

---

# 107. Risiko Operasional Setelah Go-Live

| Risiko                         | Mitigasi                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Lupa password admin            | Sediakan akun admin cadangan dan prosedur reset password.                                             |
| Kuota Google Apps Script habis | Pantau penggunaan API dan optimalkan proses agar hemat kuota.                                         |
| Spreadsheet terhapus           | Backup berkala dan batasi hak akses edit.                                                             |
| Nomor surat salah format       | Simpan format nomor surat pada Pengaturan dan validasi sebelum diterbitkan.                           |
| Perubahan template surat       | Pisahkan template dari logika aplikasi agar mudah diperbarui.                                         |
| Domain berpindah               | Gunakan pengaturan URL verifikasi di menu Pengaturan sehingga QR Code dapat diarahkan ke domain baru. |

---

# 108. Penutup

Dokumen **Product Requirements Document (PRD)** ini menjadi acuan resmi dalam pembangunan aplikasi **Surat Keterangan Bebas Tanggungan Keuangan IAIMU**.

Aplikasi dirancang untuk:

- Mempermudah mahasiswa mengajukan surat tanpa proses login.
- Mempermudah admin melakukan verifikasi dan penerbitan surat.
- Menghasilkan nomor surat otomatis yang unik.
- Menyediakan QR Code untuk verifikasi keaslian surat.
- Menggunakan **React + Vite** sebagai frontend, **Google Apps Script** sebagai backend, dan **Google Spreadsheet** sebagai database.
- Menghasilkan surat PDF yang mengikuti format resmi institusi. fileciteturn0file0

Dengan dokumen ini, seluruh kebutuhan bisnis, fungsional, teknis, keamanan, pengujian, hingga implementasi telah terdokumentasi secara menyeluruh sehingga dapat dijadikan pedoman oleh tim pengembang, penguji, maupun pihak IAIMU selama proses pembangunan dan operasional sistem.

---

# Kesimpulan

Dokumen PRD ini telah mencakup:

- **Bagian 1:** Cover, Pendahuluan, Visi, Scope, Stakeholder.
- **Bagian 2:** Analisis Pengguna, Hak Akses, User Journey, Functional Requirements.
- **Bagian 3:** Non-Functional Requirements, Aturan Bisnis, Validasi, Struktur Data.
- **Bagian 4:** UI/UX Specification, Sitemap, Wireframe, User Flow.
- **Bagian 5:** Arsitektur Sistem, Struktur Proyek, Database, API, Keamanan.
- **Bagian 6:** Software Design Specification (SDS), Modul Sistem, Komponen, dan Alur Implementasi.
- **Bagian 7:** Database Design, Google Apps Script Specification, API Contract, Business Logic, dan Algoritma Sistem.
- **Bagian 8:** Rencana Implementasi, Pengujian, Deployment, Operasional, dan Maintenance.
- **Bagian 9:** Rencana Pengembangan, Struktur Repository, Coding Standard, CI/CD, dan Dokumentasi Teknis.
- **Bagian 10:** Checklist Implementasi, Estimasi Proyek, Future Enhancement, Deliverables, Go-Live, dan Penutup.

Dokumen ini siap dijadikan acuan utama untuk memulai desain UI, implementasi backend Google Apps Script, pengembangan frontend React, pengujian, hingga proses deployment ke lingkungan produksi.
