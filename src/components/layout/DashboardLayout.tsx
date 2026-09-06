import { type ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Lightbulb,
  Award,
  Bell,
  Search,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  sidebarItems: { label: string; icon: typeof LayoutDashboard; path: string; badge?: number }[];
  roleLabel: string;
}

export function DashboardLayout({ children, title, sidebarItems, roleLabel }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { unreadCount } = useApp();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-800 to-navy-950">
              <span className="text-sm font-bold text-teal-400">S</span>
            </div>
            <span className="text-sm font-extrabold text-navy-900">SolveSphere</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="px-3 py-4">
          <div className="mb-4 rounded-xl bg-navy-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Viewing as</p>
            <p className="text-sm font-bold text-navy-900">{roleLabel}</p>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-400 hover:text-navy-700"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-navy-950/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-lg sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5 text-navy-700" />
            </button>
            <h1 className="text-lg font-bold text-navy-900">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-navy-600 hover:bg-navy-50">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/notifications" className="relative rounded-lg p-2 text-navy-600 hover:bg-navy-50">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">
              {roleLabel.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function getDashboardConfig(role: UserRole): { title: string; items: { label: string; icon: typeof LayoutDashboard; path: string; badge?: number }[]; roleLabel: string } {
  const configs = {
    citizen: {
      title: 'My Challenges',
      roleLabel: 'Citizen',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/citizen' },
        { label: 'My Challenges', icon: FolderKanban, path: '/dashboard/citizen' },
        { label: 'Post a Problem', icon: Lightbulb, path: '/post-problem' },
        { label: 'Discover', icon: Search, path: '/problems' },
        { label: 'Providers', icon: Users, path: '/providers' },
        { label: 'Impact', icon: Award, path: '/impact' },
      ],
    },
    student: {
      title: 'Problems You Can Solve',
      roleLabel: 'Student',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/student' },
        { label: 'My Projects', icon: FolderKanban, path: '/dashboard/student' },
        { label: 'My Team', icon: Users, path: '/dashboard/student' },
        { label: 'Mentors', icon: Award, path: '/dashboard/student' },
        { label: 'Achievements', icon: Award, path: '/dashboard/student' },
        { label: 'Impact Created', icon: Award, path: '/impact' },
      ],
    },
    university: {
      title: 'University Dashboard',
      roleLabel: 'University',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/university' },
        { label: 'Assigned Challenges', icon: FolderKanban, path: '/dashboard/university' },
        { label: 'Active Projects', icon: FolderKanban, path: '/dashboard/university' },
        { label: 'Student Teams', icon: Users, path: '/dashboard/university' },
        { label: 'Faculty Mentors', icon: Award, path: '/dashboard/university' },
        { label: 'Industry Collabs', icon: Users, path: '/dashboard/university' },
        { label: 'Submitted Proposals', icon: Lightbulb, path: '/dashboard/university' },
      ],
    },
    industry: {
      title: 'Industry & Funding',
      roleLabel: 'Industry',
      items: [
        { label: 'Overview', icon: LayoutDashboard, path: '/industry-funding' },
        { label: 'Projects', icon: FolderKanban, path: '/industry-funding' },
        { label: 'Providers', icon: Users, path: '/providers' },
        { label: 'Impact', icon: Award, path: '/impact' },
      ],
    },
    government: {
      title: 'Government Command Center',
      roleLabel: 'Government',
      items: [
        { label: 'Overview', icon: LayoutDashboard, path: '/government' },
        { label: 'Challenges', icon: FolderKanban, path: '/problems' },
        { label: 'Projects', icon: FolderKanban, path: '/projects/smart-irrigation' },
        { label: 'Providers', icon: Users, path: '/providers' },
        { label: 'Impact', icon: Award, path: '/impact' },
      ],
    },
  };
  return configs[role];
}
