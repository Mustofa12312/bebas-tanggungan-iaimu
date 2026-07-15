import { useState, useEffect } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { Card, Button, Alert, LoadingSpinner } from '../../components/ui';
import { apiGetSettings, apiSaveSettings } from '../../services/api';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    tahunAktif: '', nomorSuratTerakhir: '', waAdmin1: '', waAdmin2: '', waAdmin3: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiGetSettings();
        if (res.success) setSettings(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await apiSaveSettings(settings);
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-sm focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all";

  if (loading) return <LoadingSpinner text="Memuat pengaturan..." />;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {saved && (
        <Alert type="success" className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <p>Pengaturan berhasil disimpan.</p>
          </div>
        </Alert>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Pengaturan Umum</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Tahun Aktif</label>
              <input type="text" value={settings.tahunAktif} onChange={(e) => setSettings({...settings, tahunAktif: e.target.value})} className={inputClass} id="input-tahun" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-2">Nomor Surat Terakhir</label>
              <input type="text" value={settings.nomorSuratTerakhir} onChange={(e) => setSettings({...settings, nomorSuratTerakhir: e.target.value})} className={inputClass} id="input-nomor-terakhir" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-bold text-slate-800 mb-4">Nomor WhatsApp Admin</h3>
          <div className="space-y-4">
            {['waAdmin1', 'waAdmin2', 'waAdmin3'].map((key, i) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Nomor WA Admin {i + 1} {i === 0 && <span className="text-red-500">*</span>}
                </label>
                <input type="text" value={settings[key]} onChange={(e) => setSettings({...settings, [key]: e.target.value})} placeholder="Contoh: 628123456789" className={inputClass} />
              </div>
            ))}
          </div>
        </Card>

        <Button type="submit" variant="primary" size="lg" loading={saving} className="w-full" id="btn-save-settings">
          <Save className="w-4 h-4" />
          Simpan Pengaturan
        </Button>
      </form>
    </div>
  );
}
