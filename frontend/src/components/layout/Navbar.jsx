import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Home, Search, LogIn, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Beranda', icon: Home },
    { to: '/ajukan', label: 'Ajukan Surat', icon: FileText },
    { to: '/status', label: 'Cek Status', icon: Search },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight">IAIMU Pamekasan</h1>
              <p className="text-[10px] sm:text-xs text-primary-600 font-semibold uppercase tracking-wider">Bebas Tanggungan</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(to) ? 'text-primary-600' : 'text-slate-400'}`} />
                {label}
              </Link>
            ))}
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-4 py-6 space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                isActive(to)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive(to) ? 'text-primary-600' : 'text-slate-400'}`} />
              {label}
            </Link>
          ))}
          <div className="h-px bg-slate-100 my-4"></div>
          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl text-base font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md"
          >
            <LogIn className="w-5 h-5" />
            Login Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
