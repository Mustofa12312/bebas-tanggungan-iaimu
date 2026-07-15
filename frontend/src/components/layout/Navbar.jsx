import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, Home, Search, LogIn } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-primary-700 leading-tight">SBTK</h1>
              <p className="text-[10px] text-slate-500 leading-tight">IAIMU Pamekasan</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(to)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-2 border-primary-200 text-primary-600 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {links.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(to)
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 hover:bg-primary-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 border-t border-slate-100 mt-1 pt-3"
              >
                <LogIn className="w-4 h-4" />
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
