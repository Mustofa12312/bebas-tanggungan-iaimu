/**
 * Google Apps Script - Surat Bebas Tanggungan IAIMU
 * Main entry point for REST API
 * 
 * SETUP:
 * 1. Buat Google Spreadsheet baru
 * 2. Buat 4 sheet: Pengajuan, Admin, Pengaturan, Audit Log
 * 3. Salin kode ini ke Google Apps Script Editor
 * 4. Ganti SPREADSHEET_ID dengan ID Spreadsheet Anda
 * 5. Deploy sebagai Web App (Execute as: Me, Access: Anyone)
 */

const SPREADSHEET_ID = 'GANTI_DENGAN_SPREADSHEET_ID_ANDA';

// Sheet names
const SHEET = {
  PENGAJUAN: 'Pengajuan',
  ADMIN: 'Admin',
  PENGATURAN: 'Pengaturan',
  AUDIT: 'Audit Log',
};

// Get spreadsheet
function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(name) {
  return getSpreadsheet().getSheetByName(name);
}

// ==================== REST API ====================

function doGet(e) {
  const action = e.parameter.action;
  let result;

  try {
    switch (action) {
      case 'status':
        result = checkStatus(e.parameter.nim);
        break;
      case 'verify':
        result = verifyQRCode(e.parameter.token);
        break;
      case 'dashboard':
        result = getDashboard(e.parameter.token);
        break;
      case 'applications':
        result = getApplications(e.parameter.token);
        break;
      case 'application':
        result = getApplication(e.parameter.token, e.parameter.id);
        break;
      case 'auditLogs':
        result = getAuditLogs(e.parameter.token);
        break;
      case 'settings':
        result = getSettings(e.parameter.token);
        break;
      default:
        result = { success: false, message: 'Invalid action' };
    }
  } catch (err) {
    result = { success: false, message: err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Invalid request' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const action = data.action;
  let result;

  try {
    switch (action) {
      case 'submit':
        result = submitApplication(data);
        break;
      case 'login':
        result = login(data.username, data.password);
        break;
      case 'updateStatus':
        result = updateStatus(data.token, data.id, data.status, data.keterangan);
        break;
      case 'saveSettings':
        result = saveSettings(data.token, data);
        break;
      default:
        result = { success: false, message: 'Invalid action' };
    }
  } catch (err) {
    result = { success: false, message: err.message };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
