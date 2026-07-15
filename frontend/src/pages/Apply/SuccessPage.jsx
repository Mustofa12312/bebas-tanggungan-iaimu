import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import { WA_TEMPLATE, DEFAULT_WA_ADMIN } from '../../constants/config';

export default function SuccessPage() {
  const { state } = useLocation();

  if (!state || !state.nama) {
    return <Navigate to="/ajukan" replace />;
  }

  const waUrl = `https://wa.me/${DEFAULT_WA_ADMIN}?text=${WA_TEMPLATE(state.nama, state.nim, state.prodi)}`;

  return (
    <div className="max-w-lg mx-auto px-4 py-12 md:py-20 animate-fade-in">
      <Card className="p-8 md:p-10 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Pengajuan Berhasil Dikirim! 🎉
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Data Anda telah tersimpan dan sedang menunggu verifikasi admin.
        </p>

        {/* Data Summary */}
        <div className="bg-slate-50 rounded-xl p-5 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Nama</span>
            <span className="text-sm font-medium text-slate-800">{state.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">NIM</span>
            <span className="text-sm font-medium text-slate-800">{state.nim}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Program Studi</span>
            <span className="text-sm font-medium text-slate-800">{state.prodi}</span>
          </div>
          <hr className="border-slate-200" />
          <div className="flex justify-between">
            <span className="text-xs text-slate-500">Status</span>
            <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              Menunggu Verifikasi
            </span>
          </div>
        </div>

        {/* WhatsApp Button */}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="block mb-3">
          <Button variant="success" size="lg" className="w-full !bg-[#25D366] hover:!bg-[#1da851]">
            <MessageCircle className="w-5 h-5" />
            Hubungi Admin via WhatsApp
            <ArrowRight className="w-4 h-4" />
          </Button>
        </a>

        <div className="flex gap-3">
          <Link to="/status" className="flex-1">
            <Button variant="outline" size="md" className="w-full">
              Cek Status
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button variant="ghost" size="md" className="w-full">
              <Home className="w-4 h-4" />
              Beranda
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
