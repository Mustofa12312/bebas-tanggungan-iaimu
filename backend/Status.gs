/**
 * Status.gs - Check status by NIM
 */

function checkStatus(nim) {
  if (!nim) return { success: false, message: 'NIM wajib diisi.' };

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][3]) === nim) {
      return {
        success: true,
        data: {
          nama: data[i][2],
          nim: String(data[i][3]),
          prodi: data[i][4],
          status: data[i][6],
          nomorSurat: data[i][7] || '',
          qrToken: data[i][8] || '',
          tanggalValidasi: data[i][9] ? Utilities.formatDate(new Date(data[i][9]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
        },
      };
    }
  }

  return { success: false, message: 'Data tidak ditemukan.' };
}

/**
 * Verify QR Code token
 */
function verifyQRCode(token) {
  if (!token) return { valid: false };

  const sheet = getSheet(SHEET.PENGAJUAN);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][8] === token) {
      return {
        valid: true,
        nama: data[i][2],
        nim: String(data[i][3]),
        prodi: data[i][4],
        nomorSurat: data[i][7],
        status: data[i][6],
        tanggalValidasi: data[i][9] ? Utilities.formatDate(new Date(data[i][9]), 'Asia/Jakarta', 'yyyy-MM-dd') : '',
      };
    }
  }

  return { valid: false };
}
