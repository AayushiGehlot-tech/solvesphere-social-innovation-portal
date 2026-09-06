import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, Menu, X, Bell, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Discover Problems', path: '/problems' },
  { label: 'Solution Providers', path: '/providers' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Impact', path: '/impact' },
  { label: 'About', path: '/about' },
];

const roleLabels: Record<UserRole, string> = {
  citizen: 'Citizen',
  student: 'Student',
  university: 'University',
  industry: 'Industry',
  government: 'Government',
};

const roleDashboards: Record<UserRole, string> = {
  citizen: '/dashboard/citizen',
  student: '/dashboard/student',
  university: '/dashboard/university',
  industry: '/industry-funding',
  government: '/government',
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, unreadCount, notifications, markAllRead } = useApp();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setRoleMenuOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    navigate(roleDashboards[newRole]);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'glass border-b border-gray-200/60 shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-glow-navy">
              <Globe className="h-5 w-5 text-teal-400" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold tracking-tight text-navy-900">SolveSphere</span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-teal-600">
                Social Innovation Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-teal-600'
                    : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 sm:inline-flex">
              SIH 2026 · PS43
            </span>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative rounded-lg p-2 text-navy-600 transition-colors hover:bg-navy-50"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card animate-scale-in">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                    <span className="text-sm font-bold text-navy-900">Notifications</span>
                    <button onClick={markAllRead} className="text-xs font-medium text-teal-600 hover:text-teal-700">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`flex gap-3 border-b border-gray-50 px-4 py-3 ${
                          n.read ? '' : 'bg-teal-50/30'
                        }`}
                      >
                        <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${n.read ? 'bg-gray-300' : 'bg-teal-500'}`} />
                        <div>
                          <p className="text-sm text-navy-800">{n.message}</p>
                          <p className="mt-0.5 text-xs text-gray-400">{n.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-300"
              >
                <User className="h-4 w-4" />
                {roleLabels[role]}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-card animate-scale-in">
                  <div className="border-b border-gray-100 px-4 py-2.5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Demo Mode — Explore as</p>
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                        role === r ? 'bg-teal-50 font-semibold text-teal-700' : 'text-navy-700 hover:bg-navy-50'
                      }`}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      {roleLabels[r]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/login" className="hidden btn-ghost sm:inline-flex">
              Login
            </Link>
            <Link to="/post-problem" className="hidden btn-primary sm:inline-flex">
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-navy-700 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(link.path) ? 'bg-teal-50 text-teal-600' : 'text-navy-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-gray-100" />
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Demo Mode — Explore as</p>
              <div className="grid grid-cols-2 gap-2 px-3 py-2">
                {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleSwitch(r)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                      role === r ? 'border-teal-300 bg-teal-50 text-teal-700' : 'border-gray-200 text-navy-700'
                    }`}
                  >
                    {roleLabels[r]}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 px-3 pt-2">
                <Link to="/login" className="btn-secondary flex-1">Login</Link>
                <Link to="/post-problem" className="btn-primary flex-1">Get Started</Link>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="h-16" />
    </>
  );
}
