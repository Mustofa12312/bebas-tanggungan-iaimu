/**
 * Audit.gs - Audit logging
 */

function addAuditLog(admin, nim, nama, statusLama, statusBaru, keterangan) {
  const sheet = getSheet(SHEET.AUDIT);
  sheet.appendRow([
    new Date(),    // Timestamp
    admin,         // Admin
    nim,           // NIM
    nama,          // Nama
    statusLama,    // Status Lama
    statusBaru,    // Status Baru
    keterangan,    // Keterangan
  ]);
}

function getAuditLogs(token) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.AUDIT);
  const data = sheet.getDataRange().getValues();
  const result = [];

  for (let i = 1; i < data.length; i++) {
    result.push({
      timestamp: data[i][0] ? new Date(data[i][0]).toISOString() : '',
      admin: data[i][1],
      nim: String(data[i][2]),
      nama: data[i][3],
      statusLama: data[i][4],
      statusBaru: data[i][5],
      keterangan: data[i][6] || '',
    });
  }

  // Return newest first
  result.reverse();

  return { success: true, data: result };
}
