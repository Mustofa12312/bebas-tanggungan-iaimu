export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Surat Bebas Tanggungan IAIMU',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || '',
  institution: {
    name: 'IAIMU Pamekasan',
    fullName: 'Institut Agama Islam Miftahul Ulum Pamekasan',
    address: 'Jl. Raya Pamekasan',
    bau: {
      name: 'MUCHLIS, M.H',
      jabatan: 'Biro Administrasi Umum',
    },
  },
};

export const STATUS = {
  MENUNGGU: 'Menunggu Verifikasi',
  BELUM_LUNAS: 'Belum Lunas',
  LUNAS: 'Lunas',
};

export const STATUS_COLORS = {
  [STATUS.MENUNGGU]: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  [STATUS.BELUM_LUNAS]: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  [STATUS.LUNAS]: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
};

export const WA_TEMPLATE = (nama, nim, prodi) =>
  `Assalamu'alaikum Admin.%0A%0ASaya telah mengajukan Surat Keterangan Bebas Tanggungan Keuangan.%0A%0ANama : ${nama}%0ANIM : ${nim}%0AProgram Studi : ${prodi}%0A%0AMohon dilakukan verifikasi.%0A%0ATerima kasih.`;

export const DEFAULT_WA_ADMIN = '628123456789';

export const PRODI_LIST = [
  'Pendidikan Agama Islam',
  'Hukum Keluarga Islam',
  'Komunikasi dan Penyiaran Islam',
  'Pendidikan Guru Madrasah Ibtidaiyah',
  'Manajemen Pendidikan Islam',
  'Ekonomi Syariah',
];
