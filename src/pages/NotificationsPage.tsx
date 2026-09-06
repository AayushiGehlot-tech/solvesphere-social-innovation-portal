import { FileText, Handshake, Target, CheckCircle2, Upload, Users, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { notifications } from '@/data/mockData';

const typeIcons: Record<string, typeof FileText> = {
  proposal: FileText,
  mentorship: Handshake,
  match: Target,
  milestone: CheckCircle2,
  report: Upload,
  funding: FileText,
  team: Users,
};

const typeColors: Record<string, string> = {
  proposal: 'bg-cyan-50 text-cyan-600',
  mentorship: 'bg-teal-50 text-teal-600',
  match: 'bg-emerald-50 text-emerald-600',
  milestone: 'bg-amber-50 text-amber-600',
  report: 'bg-navy-50 text-navy-600',
  funding: 'bg-emerald-50 text-emerald-600',
  team: 'bg-cyan-50 text-cyan-600',
};

export function NotificationsPage() {
  const { markAllRead, unreadCount } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-navy-700" />
            <h1 className="text-2xl font-extrabold text-navy-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{unreadCount} new</span>
            )}
          </div>
          <button onClick={markAllRead} className="btn-ghost text-sm">
            Mark all read
          </button>
        </div>

        <div className="space-y-2">
          {notifications.map((n, i) => {
            const Icon = typeIcons[n.type] || Bell;
            return (
              <div
                key={n.id}
                className={`card flex items-center gap-4 p-4 animate-fade-in-up transition-all ${
                  n.read ? 'opacity-70' : 'border-teal-200'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${typeColors[n.type] || 'bg-gray-100'}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${n.read ? 'text-gray-500' : 'font-semibold text-navy-900'}`}>{n.message}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{n.date}</p>
                </div>
                {!n.read && <div className="h-2 w-2 flex-shrink-0 rounded-full bg-teal-500" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
