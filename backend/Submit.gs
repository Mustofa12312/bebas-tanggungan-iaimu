/**
 * Submit.gs - Application submission
 */

function submitApplication(data) {
  // Validate input
  if (!data.nama || !data.nim || !data.prodi || !data.whatsapp) {
    return { success: false, message: 'Semua data wajib diisi.' };
  }

  const nama = data.nama.trim();
  const nim = data.nim.trim();
  const prodi = data.prodi.trim();
  const whatsapp = data.whatsapp.trim();

  // Validate NIM (numbers only)
  if (!/^\d+$/.test(nim)) {
    return { success: false, message: 'NIM hanya boleh angka.' };
  }

  // Validate WhatsApp (numbers only, min 10)
  if (!/^\d{10,}$/.test(whatsapp)) {
    return { success: false, message: 'Nomor WhatsApp hanya boleh angka dan minimal 10 digit.' };
  }

  // Check duplicate NIM
  const sheet = getSheet(SHEET.PENGAJUAN);
  const allData = sheet.getDataRange().getValues();

  for (let i = 1; i < allData.length; i++) {
    if (String(allData[i][3]) === nim) {
      return {
        success: false,
        message: 'NIM ini sudah memiliki pengajuan. Silakan hubungi Admin apabila terdapat kesalahan data atau membutuhkan bantuan.',
      };
    }
  }

  // Generate ID
  const year = new Date().getFullYear();
  const count = allData.length; // includes header
  const id = `SBTK-${year}-${String(count).padStart(6, '0')}`;

  // Save to sheet
  sheet.appendRow([
    id,                        // ID
    new Date(),                // Timestamp
    nama,                      // Nama
    nim,                       // NIM
    prodi,                     // Program Studi
    whatsapp,                  // No WhatsApp
    'Menunggu Verifikasi',     // Status
    '',                        // Nomor Surat
    '',                        // QR Token
    '',                        // Tanggal Validasi
    '',                        // Admin Validator
  ]);

  // Log
  addAuditLog('Sistem', nim, nama, '-', 'Menunggu Verifikasi', 'Pengajuan baru');

  return { success: true, message: 'Pengajuan berhasil dikirim.' };
}
