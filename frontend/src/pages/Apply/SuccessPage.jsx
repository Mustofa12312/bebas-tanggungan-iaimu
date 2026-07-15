import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight, Home, FileText } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { WA_TEMPLATE, DEFAULT_WA_ADMIN } from '../../constants/config';

export default function SuccessPage() {
  const { state } = useLocation();

  if (!state || !state.nama) {
    return <Navigate to="/ajukan" replace />;
  }

  const waUrl = `https://wa.me/${DEFAULT_WA_ADMIN}?text=${WA_TEMPLATE(state.nama, state.nim, state.prodi)}`;

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4 animate-scale-in">
        <Card className="shadow-2xl shadow-slate-200/50 border-0 ring-1 ring-slate-200/50 bg-white sm:rounded-3xl overflow-hidden text-center p-8 sm:p-12">
          
          {/* Success Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse-glow" />
            <div className="absolute inset-2 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Pengajuan Berhasil!
          </h1>
          <p className="text-base text-slate-500 mb-10 max-w-sm mx-auto">
            Data Anda telah tersimpan dan sedang menunggu verifikasi admin keuangan.
          </p>

          {/* Data Summary */}
          <div className="bg-slate-50/50 rounded-2xl p-6 mb-10 text-left border border-slate-100 space-y-4 shadow-inner">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Nama Lengkap</span>
              <span className="text-sm font-bold text-slate-900 text-right">{state.nama}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">NIM</span>
              <span className="text-sm font-bold text-slate-900 text-right">{state.nim}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-200/60">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Program Studi</span>
              <span className="text-sm font-bold text-slate-900 text-right">{state.prodi}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status</span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-200/60">
                Menunggu Verifikasi
              </span>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="space-y-4">
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="success" size="lg" className="w-full py-4 text-base bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-[#25D366]/30 border-0">
                <MessageCircle className="w-5 h-5 mr-2" />
                Konfirmasi ke Admin via WhatsApp
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/status" className="flex-1">
                <Button variant="outline" size="md" className="w-full py-3">
                  <FileText className="w-4 h-4 mr-2 text-slate-400" />
                  Cek Status
                </Button>
              </Link>
              <Link to="/" className="flex-1">
                <Button variant="ghost" size="md" className="w-full py-3 bg-slate-50 hover:bg-slate-100">
                  <Home className="w-4 h-4 mr-2 text-slate-400" />
                  Beranda
                </Button>
              </Link>
            </div>
          </div>

        </Card>
      </div>
    </div>
  );
}
