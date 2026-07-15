import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Clock, XCircle, CheckCircle, Search, RefreshCw,
  Eye, FileText, ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import { Card, Button, StatCard, StatusBadge, LoadingSpinner, EmptyState } from '../../components/ui';
import { apiGetDashboard, apiGetApplications } from '../../services/api';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dashRes, appRes] = await Promise.all([
        apiGetDashboard(),
        apiGetApplications(),
      ]);
      if (dashRes.success) setStats(dashRes.data);
      if (appRes.success) setApplications(appRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter & Search
  const filtered = useMemo(() => {
    let result = [...applications];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.nama.toLowerCase().includes(q) ||
          a.nim.includes(q) ||
          a.prodi.toLowerCase().includes(q)
      );
    }
    if (filterStatus) {
      result = result.filter((a) => a.status === filterStatus);
    }
    return result;
  }, [applications, search, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterStatus]);

  if (loading) return <LoadingSpinner text="Memuat dashboard..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard icon={LayoutDashboard} label="Total Pengajuan" value={stats?.total || 0} color="primary" />
        <StatCard icon={Clock} label="Menunggu Verifikasi" value={stats?.menunggu || 0} color="warning" />
        <StatCard icon={XCircle} label="Belum Lunas" value={stats?.belumLunas || 0} color="danger" />
        <StatCard icon={CheckCircle} label="Lunas" value={stats?.lunas || 0} color="success" />
      </div>

      {/* Data Table */}
      <Card>
        <div className="p-4 md:p-6 border-b border-slate-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-800">Data Pengajuan</h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama, NIM, prodi..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all"
                  id="input-search"
                />
              </div>
              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 focus:border-primary-400 outline-none appearance-none bg-white cursor-pointer"
                  id="select-filter"
                >
                  <option value="">Semua Status</option>
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Belum Lunas">Belum Lunas</option>
                  <option value="Lunas">Lunas</option>
                </select>
              </div>
              {/* Refresh */}
              <Button variant="ghost" size="sm" onClick={fetchData} id="btn-refresh">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Nama</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">NIM</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Program Studi</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 px-6 py-3">Nomor Surat</th>
                <th className="text-center text-xs font-semibold text-slate-500 px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((app) => (
                <tr key={app.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{app.nama}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.nim}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.prodi}</td>
                  <td className="px-6 py-4"><StatusBadge status={app.status} /></td>
                  <td className="px-6 py-4 text-sm text-slate-600">{app.nomorSurat || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/admin/detail/${app.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                        Detail
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3">
          {paginated.map((app) => (
            <Link
              key={app.id}
              to={`/admin/detail/${app.id}`}
              className="block p-4 rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app.nama}</p>
                  <p className="text-xs text-slate-500">{app.nim} · {app.prodi}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
              {app.nomorSurat && (
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {app.nomorSurat}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {paginated.length === 0 && (
          <EmptyState
            icon={Search}
            title="Tidak Ada Data"
            description="Tidak ada pengajuan yang sesuai dengan filter pencarian."
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Menampilkan {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filtered.length)} dari {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
