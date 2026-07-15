import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, ArrowLeft, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { Button, Card, Alert } from '../../components/ui';
import { apiSubmit } from '../../services/api';
import { PRODI_LIST, WA_TEMPLATE, DEFAULT_WA_ADMIN } from '../../constants/config';

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
    getValues,
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
    `w-full px-4 py-3 rounded-xl border-2 text-sm transition-all duration-200 outline-none ${
      hasError
        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-slate-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100'
    }`;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </button>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          Formulir Pengajuan
        </h1>
        <p className="text-sm text-slate-500">
          Lengkapi data berikut untuk mengajukan Surat Keterangan Bebas Tanggungan Keuangan.
        </p>
      </div>

      {error && (
        <Alert type="error" className="mb-6 animate-fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        </Alert>
      )}

      <Card className="p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nama */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              {...register('nama')}
              type="text"
              placeholder="Masukkan nama lengkap"
              className={inputClass(errors.nama)}
              id="input-nama"
            />
            {errors.nama && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.nama.message}
              </p>
            )}
          </div>

          {/* NIM */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              NIM <span className="text-red-500">*</span>
            </label>
            <input
              {...register('nim')}
              type="text"
              placeholder="Masukkan NIM"
              className={inputClass(errors.nim)}
              id="input-nim"
            />
            {errors.nim && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.nim.message}
              </p>
            )}
          </div>

          {/* Program Studi */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Program Studi <span className="text-red-500">*</span>
            </label>
            <select
              {...register('prodi')}
              className={inputClass(errors.prodi)}
              id="input-prodi"
            >
              <option value="">Pilih Program Studi</option>
              {PRODI_LIST.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.prodi && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.prodi.message}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              {...register('whatsapp')}
              type="text"
              placeholder="Contoh: 628123456789"
              className={inputClass(errors.whatsapp)}
              id="input-whatsapp"
            />
            {errors.whatsapp && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div
            onClick={() => setAgreed(!agreed)}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              agreed
                ? 'bg-primary-50 border-primary-300'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            {agreed ? (
              <CheckSquare className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            )}
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Saya telah memastikan seluruh data yang saya isi sudah benar.</strong> Data yang telah dikirim tidak dapat diubah. Kesalahan penulisan menjadi tanggung jawab saya.
            </p>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!agreed}
            className="w-full"
            id="btn-submit"
          >
            <Send className="w-4 h-4" />
            Kirim Pengajuan
          </Button>
        </form>
      </Card>
    </div>
  );
}
