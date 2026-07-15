import { Link } from 'react-router-dom';
import { FileText, Search, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-2xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-6 backdrop-blur-sm">
              <Shield className="w-4 h-4" />
              <span>Sistem Digital IAIMU Pamekasan</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Surat Keterangan<br />
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Bebas Tanggungan Keuangan
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
              Ajukan surat bebas tanggungan keuangan secara online. Proses cepat, mudah, dan tanpa perlu datang ke kampus.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/ajukan">
                <Button variant="primary" size="lg" className="!bg-white !text-primary-700 hover:!bg-blue-50 !shadow-xl w-full sm:w-auto">
                  <FileText className="w-5 h-5" />
                  Ajukan Surat
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/status">
                <Button variant="outline" size="lg" className="!border-white/30 !text-white hover:!bg-white/10 w-full sm:w-auto">
                  <Search className="w-5 h-5" />
                  Cek Status
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Cara Kerja Sistem
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Tiga langkah mudah untuk mendapatkan Surat Bebas Tanggungan Keuangan
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              icon: FileText,
              title: 'Isi Formulir',
              desc: 'Lengkapi data diri Anda pada formulir pengajuan. Tidak perlu membuat akun atau login.',
              color: 'from-blue-500 to-blue-600',
              step: '01',
            },
            {
              icon: Zap,
              title: 'Verifikasi Admin',
              desc: 'Admin akan memverifikasi status tanggungan keuangan Anda. Proses cepat dan transparan.',
              color: 'from-amber-500 to-amber-600',
              step: '02',
            },
            {
              icon: CheckCircle,
              title: 'Cetak Surat',
              desc: 'Setelah dinyatakan lunas, unduh dan cetak surat resmi dengan QR Code verifikasi.',
              color: 'from-emerald-500 to-emerald-600',
              step: '03',
            },
          ].map(({ icon: Icon, title, desc, color, step }) => (
            <div
              key={step}
              className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className="absolute -top-3 -left-2 text-5xl font-black text-slate-100 select-none group-hover:text-primary-100 transition-colors">
                {step}
              </div>
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Banner */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6 md:p-8 border border-primary-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-500 flex items-center justify-center shadow-md shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-primary-800 mb-1">Surat Dilengkapi QR Code</h3>
              <p className="text-sm text-primary-600/80">
                Setiap surat yang diterbitkan dilengkapi QR Code untuk memverifikasi keaslian dokumen secara online.
              </p>
            </div>
            <Link to="/status">
              <Button variant="primary" size="md">
                Cek Status Surat
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
