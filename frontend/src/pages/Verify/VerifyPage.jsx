import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, ShieldX, AlertCircle } from 'lucide-react';
import { Card, LoadingSpinner, StatusBadge } from '../../components/ui';
import { apiVerifyQR } from '../../services/api';

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || searchParams.get('id') || '';
  const [data, setData] = useState(null);
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setValid(false);
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await apiVerifyQR(token);
        if (res.valid) {
          setValid(true);
          setData(res);
        } else {
          setValid(false);
        }
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token]);

  if (loading) return <LoadingSpinner text="Memverifikasi surat..." />;

  return (
    <div className="max-w-lg mx-auto px-4 py-12 md:py-20 animate-fade-in">
      <Card className="overflow-hidden">
        {valid ? (
          <>
            {/* Valid Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-bold mb-1">Surat Valid ✓</h1>
              <p className="text-sm text-white/80">Surat Valid dan Terdaftar di Sistem</p>
            </div>

            {/* Data */}
            <div className="p-6 space-y-4">
              {[
                { label: 'Nomor Surat', value: data.nomorSurat },
                { label: 'Nama', value: data.nama },
                { label: 'NIM', value: data.nim },
                { label: 'Program Studi', value: data.prodi },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs text-slate-500">{label}</span>
                  <span className="text-sm font-semibold text-slate-800">{value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-slate-500">Status</span>
                <StatusBadge status={data.status} />
              </div>
              {data.tanggalValidasi && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-slate-500">Tanggal Terbit</span>
                  <span className="text-sm font-semibold text-slate-800">{data.tanggalValidasi}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Invalid Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-scale-in">
                <ShieldX className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-bold mb-1">Surat Tidak Valid ✗</h1>
              <p className="text-sm text-white/80">Surat Tidak Valid atau Tidak Terdaftar di Sistem</p>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-800 mb-1">Verifikasi Gagal</p>
                  <p className="text-xs text-red-600">
                    Dokumen tidak ditemukan dalam sistem. Pastikan QR Code yang dipindai berasal dari surat resmi IAIMU Pamekasan.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
