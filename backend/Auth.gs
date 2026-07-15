/**
 * Auth.gs - Authentication functions
 */

// Simple session tokens (stored in memory/cache)
const SESSION_CACHE = CacheService.getScriptCache();

function login(username, password) {
  if (!username || !password) {
    return { success: false, message: 'Username dan Password wajib diisi.' };
  }

  const sheet = getSheet(SHEET.ADMIN);
  const data = sheet.getDataRange().getValues();
  const hashedPassword = hashPassword(password);

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === username && data[i][1] === hashedPassword && data[i][3] === 'Aktif') {
      const token = generateToken();
      // Store session for 30 minutes
      SESSION_CACHE.put(token, JSON.stringify({
        username: username,
        nama: data[i][2],
      }), 1800);

      // Log login
      addAuditLog(username, '-', '-', '-', 'Login', 'Login berhasil');

      return {
        success: true,
        token: token,
        nama: data[i][2],
      };
    }
  }

  return { success: false, message: 'Username atau Password tidak sesuai.' };
}

function validateToken(token) {
  if (!token) return null;
  const cached = SESSION_CACHE.get(token);
  if (!cached) return null;
  return JSON.parse(cached);
}

function hashPassword(password) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password);
  return bytes.map(b => {
    let hex = (b & 0xFF).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function generateToken() {
  return Utilities.getUuid().replace(/-/g, '').substring(0, 24);
}
