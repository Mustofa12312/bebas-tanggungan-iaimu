import { FileText, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Surat Bebas Tanggungan Keuangan</h3>
              <p className="text-xs text-white/60">IAIMU Pamekasan</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-xs text-white/50 flex items-center gap-1">
              © {new Date().getFullYear()} IAIMU Pamekasan. Dibuat dengan
              <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
