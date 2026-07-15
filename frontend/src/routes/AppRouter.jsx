import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AdminLayout from '../components/layout/AdminLayout';
import { LoadingSpinner } from '../components/ui';

// Pages
import HomePage from '../pages/Home/HomePage';
import ApplyPage from '../pages/Apply/ApplyPage';
import SuccessPage from '../pages/Apply/SuccessPage';
import StatusPage from '../pages/Status/StatusPage';
import PrintPage from '../pages/Print/PrintPage';
import VerifyPage from '../pages/Verify/VerifyPage';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import DetailPage from '../pages/Dashboard/DetailPage';
import AuditLogPage from '../pages/Dashboard/AuditLogPage';
import SettingsPage from '../pages/Dashboard/SettingsPage';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AdminRoute({ children }) {
  return (
    <ProtectedRoute>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/ajukan" element={<PublicLayout><ApplyPage /></PublicLayout>} />
          <Route path="/sukses" element={<PublicLayout><SuccessPage /></PublicLayout>} />
          <Route path="/status" element={<PublicLayout><StatusPage /></PublicLayout>} />
          <Route path="/cetak/:nim" element={<PublicLayout><PrintPage /></PublicLayout>} />
          <Route path="/verifikasi" element={<PublicLayout><VerifyPage /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
          <Route path="/admin/detail/:id" element={<AdminRoute><DetailPage /></AdminRoute>} />
          <Route path="/admin/audit" element={<AdminRoute><AuditLogPage /></AdminRoute>} />
          <Route path="/admin/pengaturan" element={<AdminRoute><SettingsPage /></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
