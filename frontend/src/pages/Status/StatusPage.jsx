import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, FileText, AlertCircle, Shield } from 'lucide-react';
import { Button, Card, StatusBadge, LoadingSpinner, Alert } from '../../components/ui';
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
    <div className="min-h-screen bg-slate-50 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto px-4 animate-fade-in">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-8 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Cek Status Pengajuan
          </h1>
          <p className="text-base text-slate-500 max-w-lg mx-auto">
            Masukkan Nomor Induk Mahasiswa (NIM) untuk melihat perkembangan status pengajuan surat Anda.
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 shadow-xl shadow-slate-200/50 border-0 ring-1 ring-slate-200/50 mb-8 bg-white">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value.replace(/\D/g, ''))}
                placeholder="Masukkan NIM Anda..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-base focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 outline-none transition-all"
              />
            </div>
            <Button type="submit" size="lg" loading={loading} disabled={!nim.trim()} className="py-4 px-8 shadow-lg shadow-primary-500/20">
              Cek Status
            </Button>
          </form>
        </Card>

        {/* Error */}
        {error && (
          <Alert type="error" className="animate-slide-in shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-12">
            <LoadingSpinner text="Mencari data pengajuan..." size="lg" />
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <Card className="overflow-hidden shadow-xl shadow-slate-200/50 border-0 ring-1 ring-slate-200/50 animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-blue-200" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Hasil Pencarian</h2>
                <p className="text-sm text-slate-300">Detail status pengajuan surat Anda</p>
              </div>
            </div>

            {/* Data */}
            <div className="p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</p>
                  <p className="text-base font-bold text-slate-900">{result.nama}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">NIM</p>
                  <p className="text-base font-bold text-slate-900">{result.nim}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Program Studi</p>
                  <p className="text-base font-bold text-slate-900">{result.prodi}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Status Saat Ini</p>
                  <StatusBadge status={result.status} />
                </div>
              </div>

              {result.nomorSurat && (
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 flex items-start gap-4">
                  <Shield className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wider mb-1">Nomor Surat Resmi</p>
                    <p className="text-lg font-extrabold text-emerald-900 tracking-tight">{result.nomorSurat}</p>
                  </div>
                </div>
              )}

              <hr className="border-slate-100" />

              {/* Status Actions */}
              <div className="pt-2">
                {result.status === 'Lunas' && (
                  <Link to={`/cetak/${result.nim}`} className="block">
                    <Button variant="success" size="lg" className="w-full py-4 text-base shadow-lg shadow-emerald-500/30">
                      <FileText className="w-5 h-5 mr-2" />
                      Unduh & Cetak Surat
                    </Button>
                  </Link>
                )}

                {result.status === 'Menunggu Verifikasi' && (
                  <Alert type="warning" className="border-amber-200 bg-amber-50 text-amber-800">
                    <p className="font-medium">Pengajuan Anda sedang dalam antrean verifikasi. Mohon tunggu proses validasi oleh admin.</p>
                  </Alert>
                )}

                {result.status === 'Belum Lunas' && (
                  <Alert type="error" className="border-red-200 bg-red-50 text-red-800">
                    <p className="font-medium">Sistem mendeteksi adanya tanggungan keuangan. Silakan selesaikan administrasi di bagian keuangan kampus.</p>
                  </Alert>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
