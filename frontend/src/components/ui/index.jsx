import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 'md', text = 'Memuat...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className={`${sizes[size]} text-primary-500 animate-spin`} />
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    'Menunggu Verifikasi': 'bg-amber-100 text-amber-800 border-amber-200',
    'Belum Lunas': 'bg-red-100 text-red-800 border-red-200',
    'Lunas': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {status === 'Lunas' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />}
      {status === 'Belum Lunas' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />}
      {status === 'Menunggu Verifikasi' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 animate-pulse" />}
      {status}
    </span>
  );
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }) {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30',
    secondary: 'bg-primary-50 hover:bg-primary-100 text-primary-700',
    success: 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-md shadow-emerald-500/20',
    danger: 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-md shadow-red-500/20',
    warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-md',
    outline: 'border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] outline-none focus:ring-4 focus:ring-primary-500/20 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-slate-400" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-slate-500 max-w-sm">{description}</p>}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, color = 'primary' }) {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-emerald-500 to-emerald-600',
    warning: 'from-amber-500 to-amber-600',
    danger: 'from-red-500 to-red-600',
  };

  const bgColors = {
    primary: 'bg-primary-50',
    success: 'bg-emerald-50',
    warning: 'bg-amber-50',
    danger: 'bg-red-50',
  };

  return (
    <div className={`${bgColors[color]} rounded-2xl p-5 border border-white/50 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          {title && <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}

export function Alert({ type = 'info', children, className = '' }) {
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-red-50 text-red-800 border-red-200',
  };

  return (
    <div className={`p-4 rounded-xl border text-sm ${styles[type]} ${className}`}>
      {children}
    </div>
  );
}
