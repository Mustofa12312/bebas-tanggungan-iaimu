/**
 * Setup.gs - Initial spreadsheet setup
 * Run this function ONCE to create all sheets with headers
 */

function setupSpreadsheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // Sheet 1: Pengajuan
  let sheet = ss.getSheetByName(SHEET.PENGAJUAN) || ss.insertSheet(SHEET.PENGAJUAN);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'ID', 'Timestamp', 'Nama', 'NIM', 'Program Studi',
      'No WhatsApp', 'Status', 'Nomor Surat', 'QR Token',
      'Tanggal Validasi', 'Admin Validator'
    ]);
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#e8eaed');
  }

  // Sheet 2: Admin
  sheet = ss.getSheetByName(SHEET.ADMIN) || ss.insertSheet(SHEET.ADMIN);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Username', 'Password Hash', 'Nama', 'Status']);
    sheet.getRange(1, 1, 1, 4).setFontWeight('bold').setBackground('#e8eaed');

    // Add default admin (password: admin123)
    const defaultHash = hashPassword('admin123');
    sheet.appendRow(['admin', defaultHash, 'Administrator', 'Aktif']);
  }

  // Sheet 3: Pengaturan
  sheet = ss.getSheetByName(SHEET.PENGATURAN) || ss.insertSheet(SHEET.PENGATURAN);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Key', 'Value']);
    sheet.getRange(1, 1, 1, 2).setFontWeight('bold').setBackground('#e8eaed');
    sheet.appendRow(['Tahun Aktif', new Date().getFullYear()]);
    sheet.appendRow(['Nomor Surat Terakhir', 0]);
    sheet.appendRow(['Nomor WA 1', '628123456789']);
    sheet.appendRow(['Nomor WA 2', '']);
    sheet.appendRow(['Nomor WA 3', '']);
    sheet.appendRow(['Format Nomor Surat', '{nomor}/A2/IAIMU/{tahun}']);
  }

  // Sheet 4: Audit Log
  sheet = ss.getSheetByName(SHEET.AUDIT) || ss.insertSheet(SHEET.AUDIT);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Admin', 'NIM', 'Nama', 'Status Lama', 'Status Baru', 'Keterangan']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#e8eaed');
  }

  // Remove default Sheet1 if exists
  const defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  return 'Setup selesai! Spreadsheet siap digunakan.';
}
