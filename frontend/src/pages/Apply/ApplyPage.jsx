import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, ArrowLeft, AlertCircle, CheckSquare, Square, User, CreditCard, BookOpen, Phone } from 'lucide-react';
import { Button, Card, Alert } from '../../components/ui';
import { apiSubmit } from '../../services/api';
import { PRODI_LIST } from '../../constants/config';

const schema = z.object({
  nama: z.string().min(1, 'Nama wajib diisi').max(100, 'Maksimal 100 karakter').trim(),
  nim: z.string().min(1, 'NIM wajib diisi').regex(/^\d+$/, 'NIM hanya boleh angka'),
  prodi: z.string().min(1, 'Program Studi wajib diisi').max(100, 'Maksimal 100 karakter'),
  whatsapp: z.string().min(1, 'Nomor WhatsApp wajib diisi').regex(/^\d+$/, 'Hanya boleh angka').min(10, 'Minimal 10 digit'),
});

export default function ApplyPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nama: '', nim: '', prodi: '', whatsapp: '' },
  });

  const onSubmit = async (data) => {
    if (!agreed) return;
    setLoading(true);
    setError('');

    try {
      const result = await apiSubmit(data);
      if (result.success) {
        navigate('/sukses', {
          state: {
            nama: data.nama,
            nim: data.nim,
            prodi: data.prodi,
            whatsapp: data.whatsapp,
          },
        });
      } else {
        setError(result.message || 'Gagal mengirim pengajuan.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl border-2 text-sm transition-all duration-200 outline-none bg-slate-50/50 ${
      hasError
        ? 'border-red-300 bg-red-50/50 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10'
        : 'border-slate-200 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10'
    }`;

  const iconClass = (hasError) => 
    `absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
      hasError ? 'text-red-400' : 'text-slate-400 peer-focus:text-primary-500'
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl animate-fade-in px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Beranda
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Formulir Pengajuan
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Pastikan data yang Anda masukkan sesuai dengan sistem akademik.
          </p>
        </div>

        {error && (
          <Alert type="error" className="mb-6 animate-slide-in shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          </Alert>
        )}

        <Card className="shadow-xl shadow-slate-200/50 border-0 ring-1 ring-slate-200/50 bg-white sm:rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Nama */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nama Lengkap <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('nama')}
                    type="text"
                    placeholder="Sesuai KTP / Ijazah"
                    className={`peer ${inputClass(errors.nama)}`}
                  />
                  <User className={iconClass(errors.nama)} />
                </div>
                {errors.nama && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nama.message}
                  </p>
                )}
              </div>

              {/* NIM */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor Induk Mahasiswa (NIM) <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('nim')}
                    type="text"
                    placeholder="Contoh: 2020123456"
                    className={`peer ${inputClass(errors.nim)}`}
                  />
                  <CreditCard className={iconClass(errors.nim)} />
                </div>
                {errors.nim && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.nim.message}
                  </p>
                )}
              </div>

              {/* Program Studi */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Program Studi <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('prodi')}
                    className={`peer appearance-none ${inputClass(errors.prodi)}`}
                  >
                    <option value="" disabled>Pilih Program Studi</option>
                    {PRODI_LIST.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <BookOpen className={iconClass(errors.prodi)} />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {errors.prodi && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.prodi.message}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Nomor WhatsApp Aktif <span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('whatsapp')}
                    type="text"
                    placeholder="Contoh: 081234567890"
                    className={`peer ${inputClass(errors.whatsapp)}`}
                  />
                  <Phone className={iconClass(errors.whatsapp)} />
                </div>
                {errors.whatsapp && (
                  <p className="mt-2 text-xs text-red-500 flex items-center gap-1.5 font-medium animate-fade-in">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                {/* Checkbox */}
                <div
                  onClick={() => setAgreed(!agreed)}
                  className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    agreed
                      ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {agreed ? (
                      <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white shadow-sm animate-scale-in">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-md border-2 border-slate-300 flex items-center justify-center bg-white text-transparent transition-colors">
                        <Square className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Saya menyatakan bahwa <span className="font-semibold text-slate-900">seluruh data yang saya isi adalah benar</span>. Segala bentuk kesalahan penulisan data sepenuhnya menjadi tanggung jawab saya.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  disabled={!agreed}
                  className="w-full text-base py-4 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Kirim Pengajuan
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
