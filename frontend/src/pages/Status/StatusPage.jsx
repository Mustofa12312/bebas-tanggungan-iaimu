import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, FileText, AlertCircle } from 'lucide-react';
import { Button, Card, StatusBadge, LoadingSpinner, Alert, EmptyState } from '../../components/ui';
import { apiCheckStatus } from '../../services/api';

export default function StatusPage() {
  const [nim, setNim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!nim.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await apiCheckStatus(nim.trim());
      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.message || 'Data tidak ditemukan.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          Cek Status Pengajuan
        </h1>
        <p className="text-sm text-slate-500">
          Masukkan NIM Anda untuk mengecek status pengajuan surat.
        </p>
      </div>

      {/* Search Form */}
      <Card className="p-6 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value.replace(/\D/g, ''))}
            placeholder="Masukkan NIM Anda"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
            id="input-nim-status"
          />
          <Button type="submit" loading={loading} disabled={!nim.trim()} id="btn-cari">
            <Search className="w-4 h-4" />
            Cari
          </Button>
        </form>
      </Card>

      {/* Loading */}
      {loading && <LoadingSpinner text="Mencari data..." />}

      {/* Error */}
      {error && (
        <Alert type="error" className="animate-fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        </Alert>
      )}

      {/* Result */}
      {result && (
        <Card className="overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-5 text-white">
            <h2 className="text-lg font-bold">Hasil Pencarian</h2>
            <p className="text-xs text-white/70">Data pengajuan surat bebas tanggungan</p>
          </div>

          {/* Data */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Nama</p>
                <p className="text-sm font-semibold text-slate-800">{result.nama}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">NIM</p>
                <p className="text-sm font-semibold text-slate-800">{result.nim}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Program Studi</p>
                <p className="text-sm font-semibold text-slate-800">{result.prodi}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <StatusBadge status={result.status} />
              </div>
            </div>

            {result.nomorSurat && (
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                <p className="text-xs text-emerald-600 mb-1">Nomor Surat</p>
                <p className="text-sm font-bold text-emerald-800">{result.nomorSurat}</p>
              </div>
            )}

            {/* Print Button */}
            {result.status === 'Lunas' && (
              <Link to={`/cetak/${result.nim}`}>
                <Button variant="success" size="lg" className="w-full mt-2">
                  <FileText className="w-5 h-5" />
                  Cetak Surat
                </Button>
              </Link>
            )}

            {result.status === 'Menunggu Verifikasi' && (
              <Alert type="warning">
                Pengajuan Anda sedang diproses. Silakan tunggu verifikasi dari admin.
              </Alert>
            )}

            {result.status === 'Belum Lunas' && (
              <Alert type="error">
                Anda masih memiliki tanggungan keuangan. Silakan selesaikan pembayaran dan hubungi admin.
              </Alert>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
