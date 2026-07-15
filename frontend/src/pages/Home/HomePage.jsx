import { Link } from 'react-router-dom';
import { FileText, Search, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white flex-1 flex items-center min-h-[500px]">
        {/* Modern Geometric Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-primary-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm mb-8 backdrop-blur-md shadow-lg">
              <Shield className="w-4 h-4 text-blue-200" />
              <span className="font-medium tracking-wide">Sistem Digital IAIMU Pamekasan</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
              Surat Keterangan <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent drop-shadow-sm">
                Bebas Tanggungan Keuangan
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Ajukan surat bebas tanggungan keuangan secara online. Proses terintegrasi, transparan, dan dapat diverifikasi melalui QR Code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/ajukan" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto bg-white text-primary-800 hover:bg-blue-50 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all">
                  <FileText className="w-5 h-5 mr-2" />
                  Ajukan Surat Sekarang
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/status" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all hover:-translate-y-0.5">
                  <Search className="w-5 h-5 mr-2" />
                  Cek Status Pengajuan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">
              Prosedur Pengajuan
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Sistem yang dirancang untuk mempermudah mahasiswa dalam menyelesaikan administrasi secara digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: FileText,
                title: '1. Isi Formulir',
                desc: 'Lengkapi data identitas dan akademik Anda pada formulir pengajuan tanpa perlu melakukan login.',
                color: 'bg-blue-50 text-blue-600 ring-blue-100',
              },
              {
                icon: Zap,
                title: '2. Verifikasi Sistem',
                desc: 'Admin akan melakukan validasi status keuangan Anda berdasarkan data dari bagian keuangan.',
                color: 'bg-amber-50 text-amber-600 ring-amber-100',
              },
              {
                icon: CheckCircle,
                title: '3. Cetak Dokumen',
                desc: 'Setelah dinyatakan lunas, Anda dapat mengunduh dan mencetak surat resmi berlengkapi QR Code.',
                color: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
              },
            ].map(({ icon: Icon, title, desc, color }, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/60"
              >
                <div className={`w-14 h-14 rounded-2xl ${color} ring-4 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
