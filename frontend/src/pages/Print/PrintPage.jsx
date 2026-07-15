import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeft, Download, Printer, AlertCircle } from 'lucide-react';
import { Button, Card, LoadingSpinner, Alert } from '../../components/ui';
import { apiCheckStatus } from '../../services/api';
import { APP_CONFIG } from '../../constants/config';

export default function PrintPage() {
  const { nim } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    const html2pdf = (await import('html2pdf.js')).default;
    const element = printRef.current;
    const opt = {
      margin: 0,
      filename: `Surat_Bebas_Tanggungan_${data.nim}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
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
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Letter Preview */}
      <Card className="overflow-hidden shadow-lg">
        <div
          ref={printRef}
          className="bg-white p-8 md:p-12 lg:p-16"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {/* Kop Surat */}
          <div className="text-center border-b-4 border-double border-black pb-4 mb-6">
            <h2 className="text-lg font-bold tracking-wider" style={{ fontSize: '18px' }}>
              INSTITUT AGAMA ISLAM AL-KHAIRAT
            </h2>
            <h3 className="text-base font-bold" style={{ fontSize: '16px' }}>
              (IAIMU) PAMEKASAN
            </h3>
            <p className="text-xs mt-1" style={{ fontSize: '11px' }}>
              Jl. Raya Pamekasan | Telp. (0324) XXXXXX
            </p>
          </div>

          {/* Judul Surat */}
          <div className="text-center mb-8">
            <h1 className="text-base font-bold underline mb-1" style={{ fontSize: '15px' }}>
              SURAT KETERANGAN BEBAS TANGGUNGAN
            </h1>
            <p className="text-sm" style={{ fontSize: '13px' }}>
              Nomor : {data.nomorSurat}
            </p>
          </div>

          {/* Isi Surat */}
          <div className="space-y-4 text-sm leading-relaxed" style={{ fontSize: '13px' }}>
            <p>Yang bertanda tangan dibawah ini:</p>

            <table className="ml-8">
              <tbody>
                <tr>
                  <td className="pr-4 py-1 align-top">Nama</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1 font-semibold">{APP_CONFIG.institution.bau.name}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-1 align-top">Jabatan</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1">{APP_CONFIG.institution.bau.jabatan}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-1 align-top">Institusi</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1">{APP_CONFIG.institution.name}</td>
                </tr>
              </tbody>
            </table>

            <p>Menerangkan bahwa :</p>

            <table className="ml-8">
              <tbody>
                <tr>
                  <td className="pr-4 py-1 align-top">Nama</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1 font-semibold">{data.nama}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-1 align-top">NIM</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1">{data.nim}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-1 align-top">Prodi</td>
                  <td className="pr-2 py-1 align-top">:</td>
                  <td className="py-1">{data.prodi}</td>
                </tr>
              </tbody>
            </table>

            <p className="text-justify">
              Telah menyelesaikan semua jenis pembayaran administrasi keuangan dan yang bersangkutan telah bebas dari tanggungan keuangan {APP_CONFIG.institution.name}.
            </p>

            <p>
              Demikian surat keterangan ini dibuat untuk persyaratan mendapatkan ijazah {APP_CONFIG.institution.name}.
            </p>
          </div>

          {/* Tanda Tangan */}
          <div className="flex justify-between items-end mt-12">
            {/* QR Code */}
            <div className="flex flex-col items-center">
              <QRCode value={verifyUrl} size={80} level="M" />
              <p className="text-[9px] text-slate-400 mt-1">Scan untuk verifikasi</p>
            </div>

            {/* TTD */}
            <div className="text-center" style={{ fontSize: '13px' }}>
              <p>Pamekasan, {formatDate(data.tanggalValidasi)}</p>
              <p>{APP_CONFIG.institution.bau.jabatan} (BAU)</p>
              <div className="h-20" />
              <p className="font-bold underline">{APP_CONFIG.institution.bau.name}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
