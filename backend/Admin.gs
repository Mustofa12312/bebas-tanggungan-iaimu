/**
 * Admin.gs - Admin dashboard and management functions
 */

function getDashboard(token) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();

  let menunggu = 0, belumLunas = 0, lunas = 0;
  for (let i = 1; i < data.length; i++) {
    switch (data[i][6]) {
      case 'Menunggu Verifikasi': menunggu++; break;
      case 'Belum Lunas': belumLunas++; break;
      case 'Lunas': lunas++; break;
    }
  }

  return {
    success: true,
    data: {
      total: data.length - 1,
      menunggu,
      belumLunas,
      lunas,
    },
  };
}

function getApplications(token) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();
  const result = [];

  for (let i = 1; i < data.length; i++) {
    result.push({
      id: data[i][0],
      timestamp: data[i][1] ? new Date(data[i][1]).toISOString() : '',
      nama: data[i][2],
      nim: String(data[i][3]),
      prodi: data[i][4],
      whatsapp: String(data[i][5]),
      status: data[i][6],
      nomorSurat: data[i][7] || '',
      qrToken: data[i][8] || '',
      tanggalValidasi: data[i][9] ? Utilities.formatDate(new Date(data[i][9]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
      adminValidator: data[i][10] || '',
    });
  }

  return { success: true, data: result };
}

function getApplication(token, id) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      return {
        success: true,
        data: {
          id: data[i][0],
          timestamp: data[i][1] ? new Date(data[i][1]).toISOString() : '',
          nama: data[i][2],
          nim: String(data[i][3]),
          prodi: data[i][4],
          whatsapp: String(data[i][5]),
          status: data[i][6],
          nomorSurat: data[i][7] || '',
          qrToken: data[i][8] || '',
          tanggalValidasi: data[i][9] ? Utilities.formatDate(new Date(data[i][9]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
          adminValidator: data[i][10] || '',
        },
      };
    }
  }

  return { success: false, message: 'Data tidak ditemukan.' };
}

function updateStatus(token, id, newStatus, keterangan) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const validStatuses = ['Menunggu Verifikasi', 'Belum Lunas', 'Lunas'];
  if (!validStatuses.includes(newStatus)) {
    return { success: false, message: 'Status tidak valid.' };
  }

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      const oldStatus = data[i][6];
      const row = i + 1;

      // Update status
      sheet.getRange(row, 7).setValue(newStatus);

      // If Lunas, generate letter number and QR token
      if (newStatus === 'Lunas' && !data[i][7]) {
        // Use LockService to prevent duplicate numbers
        const lock = LockService.getScriptLock();
        lock.waitLock(10000);

        try {
          const nomorSurat = generateNomorSurat();
          const qrToken = generateQRToken();

          sheet.getRange(row, 8).setValue(nomorSurat);   // Nomor Surat
          sheet.getRange(row, 9).setValue(qrToken);      // QR Token
          sheet.getRange(row, 10).setValue(new Date());   // Tanggal Validasi
          sheet.getRange(row, 11).setValue(admin.username); // Admin Validator
        } finally {
          lock.releaseLock();
        }
      }

      // Audit Log
      addAuditLog(admin.username, String(data[i][3]), data[i][2], oldStatus, newStatus, keterangan || '');

      // Return updated data
      const updatedRow = sheet.getRange(row, 1, 1, 11).getValues()[0];
      return {
        success: true,
        data: {
          id: updatedRow[0],
          timestamp: updatedRow[1] ? new Date(updatedRow[1]).toISOString() : '',
          nama: updatedRow[2],
          nim: String(updatedRow[3]),
          prodi: updatedRow[4],
          whatsapp: String(updatedRow[5]),
          status: updatedRow[6],
          nomorSurat: updatedRow[7] || '',
          qrToken: updatedRow[8] || '',
          tanggalValidasi: updatedRow[9] ? Utilities.formatDate(new Date(updatedRow[9]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
          adminValidator: updatedRow[10] || '',
        },
      };
    }
  }

  return { success: false, message: 'Data tidak ditemukan.' };
}

function generateNomorSurat() {
  const settingsSheet = getSheet(SHEET.PENGATURAN);
  const settings = settingsSheet.getDataRange().getValues();

  let tahun = new Date().getFullYear();
  let lastNumber = 0;
  let format = '{nomor}/A2/IAIMU/{tahun}';

  for (let i = 1; i < settings.length; i++) {
    if (settings[i][0] === 'Tahun Aktif') tahun = settings[i][1];
    if (settings[i][0] === 'Nomor Surat Terakhir') lastNumber = parseInt(settings[i][1]) || 0;
    if (settings[i][0] === 'Format Nomor Surat') format = settings[i][1];
  }

  const newNumber = lastNumber + 1;

  // Update last number in settings
  for (let i = 1; i < settings.length; i++) {
    if (settings[i][0] === 'Nomor Surat Terakhir') {
      settingsSheet.getRange(i + 1, 2).setValue(newNumber);
      break;
    }
  }

  return format
    .replace('{nomor}', String(newNumber).padStart(3, '0'))
    .replace('{tahun}', tahun);
}

function generateQRToken() {
  const uuid = Utilities.getUuid().replace(/-/g, '');
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, uuid);
  return 'TKN-' + bytes.slice(0, 6).map(b => {
    let hex = (b & 0xFF).toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
