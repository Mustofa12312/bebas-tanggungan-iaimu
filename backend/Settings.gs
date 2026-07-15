/**
 * Settings.gs - System settings management
 */

function getSettings(token) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.PENGATURAN);
  const data = sheet.getDataRange().getValues();
  const settings = {};

  for (let i = 1; i < data.length; i++) {
    const key = data[i][0];
    const value = data[i][1];
    switch (key) {
      case 'Tahun Aktif': settings.tahunAktif = String(value); break;
      case 'Nomor Surat Terakhir': settings.nomorSuratTerakhir = String(value); break;
      case 'Nomor WA 1': settings.waAdmin1 = String(value); break;
      case 'Nomor WA 2': settings.waAdmin2 = String(value || ''); break;
      case 'Nomor WA 3': settings.waAdmin3 = String(value || ''); break;
    }
  }

  return { success: true, data: settings };
}

function saveSettings(token, data) {
  const admin = validateToken(token);
  if (!admin) return { success: false, message: 'Sesi tidak valid.' };

  const sheet = getSheet(SHEET.PENGATURAN);
  const rows = sheet.getDataRange().getValues();

  const mapping = {
    'Tahun Aktif': data.tahunAktif,
    'Nomor Surat Terakhir': data.nomorSuratTerakhir,
    'Nomor WA 1': data.waAdmin1,
    'Nomor WA 2': data.waAdmin2,
    'Nomor WA 3': data.waAdmin3,
  };

  for (let i = 1; i < rows.length; i++) {
    const key = rows[i][0];
    if (mapping[key] !== undefined) {
      sheet.getRange(i + 1, 2).setValue(mapping[key]);
    }
  }

  // Audit log
  addAuditLog(admin.username, '-', '-', '-', '-', 'Pengaturan diperbarui');

  return { success: true, message: 'Pengaturan berhasil disimpan.' };
}
