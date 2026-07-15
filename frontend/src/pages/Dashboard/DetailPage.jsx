import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { ArrowLeft, Printer, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, Button, StatusBadge, LoadingSpinner, Modal, Alert } from '../../components/ui';
import { apiGetApplication, apiUpdateStatus } from '../../services/api';
import { STATUS } from '../../constants/config';
import { useAuth } from '../../context/AuthContext';

export default function DetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchDetail(); }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const res = await apiGetApplication(user?.token, id);
      if (res.success) setData(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleStatusChange = (s) => { setPendingStatus(s); setShowConfirm(true); };

  const confirmStatusChange = async () => {
    setUpdating(true);
    try {
      const res = await apiUpdateStatus(user?.token, id, pendingStatus);
      if (res.success) { setData(res.data); setShowConfirm(false); }
    } catch (err) { console.error(err); }
    finally { setUpdating(false); }
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric' }) : '-';
  const fmtDT = (d) => d ? new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '-';

  if (loading) return <LoadingSpinner text="Memuat detail..." />;
  if (!data) return <Alert type="error">Data tidak ditemukan.</Alert>;

  const verifyUrl = `${window.location.origin}/verifikasi?token=${data.qrToken}`;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <Link to="/admin/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{data.nama}</h1>
          <p className="text-sm text-slate-500">ID: {data.id}</p>
        </div>
        <StatusBadge status={data.status} />
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Informasi Pengajuan</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ['Nama Lengkap', data.nama], ['NIM', data.nim],
            ['Program Studi', data.prodi], ['Nomor WhatsApp', data.whatsapp],
            ['Tanggal Pengajuan', fmtDT(data.timestamp)], ['Nomor Surat', data.nomorSurat || '-'],
            ['Tanggal Validasi', fmt(data.tanggalValidasi)], ['Admin Validator', data.adminValidator || '-'],
          ].map(([label, value]) => (
            <div key={label} className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1">{label}</p>
              <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
          ))}
        </div>
        {data.qrToken && (
          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-4">
            <QRCode value={verifyUrl} size={80} level="M" />
            <div>
              <p className="text-sm font-semibold text-emerald-800">QR Code Verifikasi</p>
              <p className="text-xs text-emerald-600 mt-1 break-all">{verifyUrl}</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Aksi</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {data.status !== STATUS.BELUM_LUNAS && (
            <Button variant="warning" size="sm" onClick={() => handleStatusChange(STATUS.BELUM_LUNAS)}>Belum Lunas</Button>
          )}
          {data.status !== STATUS.LUNAS && (
            <Button variant="success" size="sm" onClick={() => handleStatusChange(STATUS.LUNAS)}>
              <CheckCircle className="w-4 h-4" /> Lunas
            </Button>
          )}
          {data.status !== STATUS.MENUNGGU && (
            <Button variant="secondary" size="sm" onClick={() => handleStatusChange(STATUS.MENUNGGU)}>Menunggu Verifikasi</Button>
          )}
        </div>
        {data.status === STATUS.LUNAS && (
          <Button variant="primary" onClick={() => window.open(`/cetak/${data.nim}`, '_blank')}>
            <Printer className="w-4 h-4" /> Cetak Surat
          </Button>
        )}
      </Card>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Konfirmasi Perubahan Status">
        <div className="space-y-4">
          {pendingStatus === STATUS.LUNAS && (
            <Alert type="warning">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Perhatian!</p>
                  <p className="text-xs mt-1">Mengubah status menjadi <strong>Lunas</strong> akan membuat nomor surat otomatis.</p>
                </div>
              </div>
            </Alert>
          )}
          <div className="p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-2">Perubahan status:</p>
            <div className="flex items-center gap-3">
              <StatusBadge status={data.status} />
              <span className="text-slate-400">→</span>
              <StatusBadge status={pendingStatus} />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowConfirm(false)}>Batal</Button>
            <Button variant={pendingStatus === STATUS.LUNAS ? 'success' : 'primary'} className="flex-1" loading={updating} onClick={confirmStatusChange}>Konfirmasi</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
