import axios from 'axios';
import { APP_CONFIG } from '../constants/config';

const api = axios.create({
  baseURL: APP_CONFIG.apiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'text/plain',
  },
});

// Helper to make GAS-compatible requests
const gasRequest = async (action, payload = {}) => {
  try {
    const response = await api.post('', JSON.stringify({ action, ...payload }));
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('Gagal mengirim data. Periksa koneksi internet Anda.');
    }
    throw new Error('Terjadi gangguan pada server. Silakan coba beberapa saat lagi.');
  }
};

const gasGet = async (action, params = {}) => {
  try {
    const response = await api.get('', { params: { action, ...params } });
    return response.data;
  } catch (error) {
    if (!navigator.onLine) {
      throw new Error('Gagal mengambil data. Periksa koneksi internet Anda.');
    }
    throw new Error('Terjadi gangguan pada server. Silakan coba beberapa saat lagi.');
  }
};

// ==================== PUBLIC API ====================

export const submitApplication = async (data) => {
  return gasRequest('submit', data);
};

export const checkStatus = async (nim) => {
  return gasGet('status', { nim });
};

export const verifyQR = async (token) => {
  return gasGet('verify', { token });
};

// ==================== ADMIN API ====================

export const adminLogin = async (username, password) => {
  return gasRequest('login', { username, password });
};

export const getDashboard = async (token) => {
  return gasGet('dashboard', { token });
};

export const getApplications = async (token, params = {}) => {
  return gasGet('applications', { token, ...params });
};

export const getApplication = async (token, id) => {
  return gasGet('application', { token, id });
};

export const updateStatus = async (token, id, status, keterangan = '') => {
  return gasRequest('updateStatus', { token, id, status, keterangan });
};

export const getAuditLogs = async (token) => {
  return gasGet('auditLogs', { token });
};

export const getSettings = async (token) => {
  return gasGet('settings', { token });
};

export const saveSettings = async (token, settings) => {
  return gasRequest('saveSettings', { token, ...settings });
};

// ==================== MOCK DATA (for development) ====================

const MOCK_DATA = [
  {
    id: 'SBTK-2026-000001',
    timestamp: '2026-07-01T10:00:00',
    nama: 'Ahmad Fauzi',
    nim: '22010001',
    prodi: 'Pendidikan Agama Islam (PAI)',
    whatsapp: '628123456001',
    status: 'Lunas',
    nomorSurat: '075/A2/IAIMU/2026',
    qrToken: 'TKN-A1B2C3D4E5',
    tanggalValidasi: '2026-07-05',
    adminValidator: 'admin',
  },
  {
    id: 'SBTK-2026-000002',
    timestamp: '2026-07-02T11:00:00',
    nama: 'Siti Aminah',
    nim: '22010002',
    prodi: 'Hukum Keluarga Islam (HKI)',
    whatsapp: '628123456002',
    status: 'Belum Lunas',
    nomorSurat: '',
    qrToken: '',
    tanggalValidasi: '',
    adminValidator: '',
  },
  {
    id: 'SBTK-2026-000003',
    timestamp: '2026-07-03T09:30:00',
    nama: 'Muhammad Rizki',
    nim: '22010003',
    prodi: 'Manajemen Dakwah (MD)',
    whatsapp: '628123456003',
    status: 'Menunggu Verifikasi',
    nomorSurat: '',
    qrToken: '',
    tanggalValidasi: '',
    adminValidator: '',
  },
  {
    id: 'SBTK-2026-000004',
    timestamp: '2026-07-04T14:15:00',
    nama: 'Fatimah Zahra',
    nim: '22010004',
    prodi: 'Bimbingan dan Penyuluhan Islam (BPI)',
    whatsapp: '628123456004',
    status: 'Menunggu Verifikasi',
    nomorSurat: '',
    qrToken: '',
    tanggalValidasi: '',
    adminValidator: '',
  },
  {
    id: 'SBTK-2026-000005',
    timestamp: '2026-07-05T08:45:00',
    nama: 'Abdullah Rahman',
    nim: '22010005',
    prodi: 'Ekonomi Syariah (ES)',
    whatsapp: '628123456005',
    status: 'Lunas',
    nomorSurat: '076/A2/IAIMU/2026',
    qrToken: 'TKN-F6G7H8I9J0',
    tanggalValidasi: '2026-07-07',
    adminValidator: 'admin',
  },
];

const USE_MOCK = !APP_CONFIG.apiUrl || APP_CONFIG.apiUrl.includes('XXXXXXXX');

// Mock implementations
export const mockSubmitApplication = async (data) => {
  await new Promise(r => setTimeout(r, 1000));
  const exists = MOCK_DATA.find(d => d.nim === data.nim);
  if (exists) {
    return { success: false, message: 'NIM ini sudah memiliki pengajuan. Silakan hubungi Admin apabila terdapat kesalahan data atau membutuhkan bantuan.' };
  }
  const newEntry = {
    id: `SBTK-2026-${String(MOCK_DATA.length + 1).padStart(6, '0')}`,
    timestamp: new Date().toISOString(),
    nama: data.nama,
    nim: data.nim,
    prodi: data.prodi,
    whatsapp: data.whatsapp,
    status: 'Menunggu Verifikasi',
    nomorSurat: '',
    qrToken: '',
    tanggalValidasi: '',
    adminValidator: '',
  };
  MOCK_DATA.push(newEntry);
  return { success: true, message: 'Pengajuan berhasil dikirim.' };
};

export const mockCheckStatus = async (nim) => {
  await new Promise(r => setTimeout(r, 800));
  const found = MOCK_DATA.find(d => d.nim === nim);
  if (!found) return { success: false, message: 'Data tidak ditemukan.' };
  return {
    success: true,
    data: {
      nama: found.nama,
      nim: found.nim,
      prodi: found.prodi,
      status: found.status,
      nomorSurat: found.nomorSurat,
      qrToken: found.qrToken,
      tanggalValidasi: found.tanggalValidasi,
    },
  };
};

export const mockVerifyQR = async (token) => {
  await new Promise(r => setTimeout(r, 800));
  const found = MOCK_DATA.find(d => d.qrToken === token);
  if (!found) return { valid: false };
  return {
    valid: true,
    nama: found.nama,
    nim: found.nim,
    prodi: found.prodi,
    nomorSurat: found.nomorSurat,
    status: found.status,
    tanggalValidasi: found.tanggalValidasi,
  };
};

export const mockAdminLogin = async (username, password) => {
  await new Promise(r => setTimeout(r, 800));
  if (username === 'admin' && password === 'admin123') {
    return { success: true, token: 'mock-token-123', nama: 'Administrator' };
  }
  return { success: false, message: 'Username atau Password tidak sesuai.' };
};

export const mockGetDashboard = async () => {
  await new Promise(r => setTimeout(r, 500));
  return {
    success: true,
    data: {
      total: MOCK_DATA.length,
      menunggu: MOCK_DATA.filter(d => d.status === 'Menunggu Verifikasi').length,
      belumLunas: MOCK_DATA.filter(d => d.status === 'Belum Lunas').length,
      lunas: MOCK_DATA.filter(d => d.status === 'Lunas').length,
    },
  };
};

export const mockGetApplications = async () => {
  await new Promise(r => setTimeout(r, 500));
  return { success: true, data: [...MOCK_DATA] };
};

export const mockGetApplication = async (id) => {
  await new Promise(r => setTimeout(r, 500));
  const found = MOCK_DATA.find(d => d.id === id);
  if (!found) return { success: false };
  return { success: true, data: { ...found } };
};

export const mockUpdateStatus = async (id, status) => {
  await new Promise(r => setTimeout(r, 800));
  const idx = MOCK_DATA.findIndex(d => d.id === id);
  if (idx === -1) return { success: false };
  MOCK_DATA[idx].status = status;
  if (status === 'Lunas') {
    const lastNum = MOCK_DATA.filter(d => d.nomorSurat).length + 75;
    MOCK_DATA[idx].nomorSurat = `${String(lastNum).padStart(3, '0')}/A2/IAIMU/2026`;
    MOCK_DATA[idx].qrToken = `TKN-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
    MOCK_DATA[idx].tanggalValidasi = new Date().toISOString().split('T')[0];
    MOCK_DATA[idx].adminValidator = 'admin';
  }
  return { success: true, data: { ...MOCK_DATA[idx] } };
};

export const mockGetAuditLogs = async () => {
  await new Promise(r => setTimeout(r, 500));
  return {
    success: true,
    data: [
      { timestamp: '2026-07-05T10:20:00', admin: 'admin', nim: '22010001', nama: 'Ahmad Fauzi', statusLama: 'Menunggu Verifikasi', statusBaru: 'Lunas', keterangan: 'Verifikasi pembayaran' },
      { timestamp: '2026-07-07T14:30:00', admin: 'admin', nim: '22010005', nama: 'Abdullah Rahman', statusLama: 'Belum Lunas', statusBaru: 'Lunas', keterangan: '' },
      { timestamp: '2026-07-03T09:45:00', admin: 'admin', nim: '22010002', nama: 'Siti Aminah', statusLama: 'Menunggu Verifikasi', statusBaru: 'Belum Lunas', keterangan: 'Masih ada tunggakan' },
    ],
  };
};

export const mockGetSettings = async () => {
  await new Promise(r => setTimeout(r, 500));
  return {
    success: true,
    data: {
      tahunAktif: '2026',
      nomorSuratTerakhir: '76',
      waAdmin1: '628123456789',
      waAdmin2: '',
      waAdmin3: '',
    },
  };
};

export const mockSaveSettings = async (settings) => {
  await new Promise(r => setTimeout(r, 800));
  return { success: true, message: 'Pengaturan berhasil disimpan.' };
};

// Export the right functions based on mode
export const apiSubmit = USE_MOCK ? mockSubmitApplication : submitApplication;
export const apiCheckStatus = USE_MOCK ? mockCheckStatus : checkStatus;
export const apiVerifyQR = USE_MOCK ? mockVerifyQR : verifyQR;
export const apiLogin = USE_MOCK ? mockAdminLogin : adminLogin;
export const apiGetDashboard = USE_MOCK ? mockGetDashboard : getDashboard;
export const apiGetApplications = USE_MOCK ? mockGetApplications : getApplications;
export const apiGetApplication = USE_MOCK ? mockGetApplication : getApplication;
export const apiUpdateStatus = USE_MOCK ? mockUpdateStatus : updateStatus;
export const apiGetAuditLogs = USE_MOCK ? mockGetAuditLogs : getAuditLogs;
export const apiGetSettings = USE_MOCK ? mockGetSettings : getSettings;
export const apiSaveSettings = USE_MOCK ? mockSaveSettings : saveSettings;
