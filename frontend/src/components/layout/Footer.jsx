import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="no-print print:hidden bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center border border-slate-700 shadow-md shadow-black/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Sistem Bebas Tanggungan Keuangan</h3>
              <p className="text-sm text-slate-400">Institut Agama Islam Miftahul Ulum (IAIMU) Pamekasan</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-slate-500">
              &copy; {year} IAIMU Pamekasan.
            </p>
            <p className="text-xs text-slate-600 mt-1">
              Seluruh Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
