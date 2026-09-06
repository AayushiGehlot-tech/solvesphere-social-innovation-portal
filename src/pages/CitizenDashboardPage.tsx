import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Sparkles, Clock } from 'lucide-react';
import { DashboardLayout, getDashboardConfig } from '@/components/layout/DashboardLayout';
import { ChallengeCard } from '@/components/ui/Shared';
import { challenges } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function CitizenDashboardPage() {
  const navigate = useNavigate();
  const { role } = useApp();
  const config = getDashboardConfig(role);

  const myChallenges = challenges.slice(0, 4);

  return (
    <DashboardLayout title={config.title} sidebarItems={config.items} roleLabel={config.roleLabel}>
      {/* Welcome */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-navy-800 to-navy-950 p-6">
        <h2 className="text-xl font-bold text-white">Welcome back, Ramesh</h2>
        <p className="mt-1 text-sm text-navy-300">You have {myChallenges.length} active challenges being worked on.</p>
        <button onClick={() => navigate('/post-problem')} className="btn-accent mt-4 text-sm">
          <Sparkles className="h-4 w-4" />
          Post a New Problem
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'My Challenges', value: '4', icon: Sparkles },
          { label: 'Matched Providers', value: '23', icon: Users },
          { label: 'In Progress', value: '2', icon: Clock },
          { label: 'Resolved', value: '1', icon: ArrowRight },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="card p-4">
              <Icon className="mb-2 h-5 w-5 text-teal-600" />
              <p className="text-2xl font-extrabold text-navy-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* My challenges */}
      <h3 className="mb-4 text-lg font-bold text-navy-900">My Challenges</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myChallenges.map((c, i) => (
          <div key={c.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <ChallengeCard
              challenge={c}
              onClick={() => navigate(`/projects/smart-irrigation`)}
              showProgress
            />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
