import { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { Card, StatusBadge, LoadingSpinner, EmptyState } from '../../components/ui';
import { apiGetAuditLogs } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function AuditLogPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiGetAuditLogs(user?.token);
        if (res.success) setLogs(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, [user]);

  const fmtDT = (d) => new Date(d).toLocaleDateString('id-ID', {
    day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'
  });

  if (loading) return <LoadingSpinner text="Memuat audit log..." />;

  return (
    <div className="animate-fade-in">
      <Card>
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-800">Audit Log</h3>
          <p className="text-xs text-slate-500 mt-1">Riwayat seluruh perubahan status pengajuan</p>
        </div>

        {logs.length === 0 ? (
          <EmptyState icon={ClipboardList} title="Belum Ada Log" description="Belum ada aktivitas yang tercatat." />
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Waktu</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Admin</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">NIM</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Nama</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Status Lama</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Status Baru</th>
                    <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-3 text-xs text-slate-600">{fmtDT(log.timestamp)}</td>
                      <td className="px-6 py-3 text-xs font-medium text-slate-800">{log.admin}</td>
                      <td className="px-6 py-3 text-xs text-slate-600">{log.nim}</td>
                      <td className="px-6 py-3 text-xs text-slate-600">{log.nama}</td>
                      <td className="px-6 py-3"><StatusBadge status={log.statusLama} /></td>
                      <td className="px-6 py-3"><StatusBadge status={log.statusBaru} /></td>
                      <td className="px-6 py-3 text-xs text-slate-500">{log.keterangan || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden p-4 space-y-3">
              {logs.map((log, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">{fmtDT(log.timestamp)}</span>
                    <span className="font-medium text-slate-700">{log.admin}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">{log.nama} ({log.nim})</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={log.statusLama} />
                    <span className="text-slate-400 text-xs">→</span>
                    <StatusBadge status={log.statusBaru} />
                  </div>
                  {log.keterangan && <p className="text-xs text-slate-500">{log.keterangan}</p>}
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
