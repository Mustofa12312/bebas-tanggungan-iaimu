import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeft, Download, Printer, AlertCircle } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { Button, Card, LoadingSpinner, Alert } from '../../components/ui';
import { apiCheckStatus } from '../../services/api';
import { APP_CONFIG } from '../../constants/config';
import logoImg from '../../assets/logo.jpg';

export default function PrintPage() {
  const { nim } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiCheckStatus(nim);
        if (res.success && res.data.status === 'Lunas') {
          setData(res.data);
        } else if (res.success && res.data.status !== 'Lunas') {
          setError('Surat hanya dapat dicetak setelah status menjadi Lunas.');
        } else {
          setError(res.message || 'Data tidak ditemukan.');
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [nim]);

  const handlePrint = (e) => {
    e.preventDefault();
    window.print();
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    if (isDownloading) return;
    
    setIsDownloading(true);
    try {
      const element = printRef.current;
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `Surat_Bebas_Tanggungan_${data.nim}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('Download error:', err);
      alert('Gagal mengunduh PDF. Silakan coba menggunakan tombol Print lalu Save as PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const verifyUrl = `${window.location.origin}/verifikasi?token=${data?.qrToken || ''}`;

  if (loading) return <LoadingSpinner text="Memuat data surat..." />;

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <Alert type="error">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold mb-1">Tidak Dapat Mencetak Surat</p>
              <p>{error}</p>
            </div>
          </div>
        </Alert>
        <div className="mt-4 text-center">
          <Link to="/status">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Cek Status
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 no-print">
        <Link
          to="/status"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button type="button" variant="primary" onClick={handleDownload} loading={isDownloading}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Letter Preview */}
      <Card className="overflow-hidden shadow-lg">
        <div
          ref={printRef}
          className="bg-white p-8 md:p-12 lg:p-16 relative"
          style={{ fontFamily: "'Times New Roman', Times, serif", color: '#000' }}
        >
          {/* Kop Surat */}
          <div className="flex items-center gap-4 mb-4">
            {/* Logo */}
            <div className="w-24 shrink-0 flex justify-center">
              <img src={logoImg} alt="Logo IAIMU" className="w-20 h-auto" onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            {/* Kop Text */}
            <div className="flex-1 text-center pr-12">
              <p className="text-sm tracking-wide" style={{ fontSize: '13px' }}>
                Yayasan Waqof, Sosial, Pendidikan dan Dakwah Islamiyah &quot;Al-Miftah&quot;
              </p>
              <h2 className="font-bold text-teal-800" style={{ fontSize: '18px', color: '#006666', lineHeight: '1.2', marginTop: '2px', marginBottom: '2px' }}>
                INSTITUT AGAMA ISLAM MIFTAHUL ULUM<br/>PAMEKASAN
              </h2>
              <p className="text-sm" style={{ fontSize: '13px' }}>
                Alamat : Jl. Raya Palengaan Km 11 Pamekasan Madura
              </p>
              <p className="text-sm" style={{ fontSize: '13px' }}>
                Hp. 0823 3638 8410 website : www.iaimu.ac.id
              </p>
            </div>
          </div>
          
          {/* Garis Kop */}
          <div className="mb-8">
            <div className="border-b-[3px] border-black w-full mb-[2px]"></div>
            <div className="border-b-[1px] border-black w-full"></div>
          </div>

          {/* Judul Surat */}
          <div className="text-center mb-10">
            <h1 className="font-bold mb-1" style={{ fontSize: '16px' }}>
              SURAT KETERANGAN BEBAS TANGGUNGAN
            </h1>
            <p style={{ fontSize: '14px' }}>
              Nomor : {data?.nomorSurat || '075/A2/IAIMU/2026'}
            </p>
          </div>

          {/* Isi Surat */}
          <div className="space-y-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p>Yang bertanda tangan dibawah ini:</p>

            <table className="w-full max-w-lg mb-2">
              <tbody>
                <tr>
                  <td className="w-32 py-1 align-top">Nama</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">MUCHLIS, M.H</td>
                </tr>
                <tr>
                  <td className="w-32 py-1 align-top">Jabatan</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">Biro Administrasi Umum</td>
                </tr>
                <tr>
                  <td className="w-32 py-1 align-top">Intitusi</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">IAIMU Pamekasan</td>
                </tr>
              </tbody>
            </table>

            <p>Menerangkan bahwa :</p>

            <table className="w-full max-w-lg mb-4">
              <tbody>
                <tr>
                  <td className="w-32 py-1 align-top">Nama</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1 font-bold">{data?.nama}</td>
                </tr>
                <tr>
                  <td className="w-32 py-1 align-top">NIM</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{data?.nim}</td>
                </tr>
                <tr>
                  <td className="w-32 py-1 align-top">Prodi</td>
                  <td className="w-4 py-1 align-top">:</td>
                  <td className="py-1">{data?.prodi}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-justify indent-10">
              Telah menyelesaikan semua jenis pembayaran administrasi keuangan dan yang bersangkutan telah bebas dari tanggungan keuangan IAIMU Pamekasan.
            </p>

            <p className="text-justify indent-10">
              Demikian surat keterangan ini dibuat untuk persyaratan mendapatkan ijazah IAIMU Pamekasan.
            </p>
          </div>

          {/* Tanda Tangan */}
          <div className="flex justify-between items-end mt-16" style={{ fontSize: '14px' }}>
            {/* QR Code (Tetap dipertahankan untuk keamanan, diletakkan di kiri bawah) */}
            <div className="flex flex-col items-center">
              <QRCode value={verifyUrl} size={70} level="M" />
              <p className="text-[9px] text-gray-500 mt-1">Scan QR untuk verifikasi</p>
            </div>

            {/* TTD Block */}
            <div className="text-left w-64">
              <p>Pamekasan, {formatDate(data?.tanggalValidasi || new Date())}</p>
              <p>Biro Administrasi Umum (BAU)</p>
              <div className="h-24" />
              <p className="font-bold underline text-black">MUCHLIS, M.H</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
