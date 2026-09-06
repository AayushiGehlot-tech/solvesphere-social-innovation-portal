import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, Award, Rocket, Target, ArrowRight, CheckCircle2 } from 'lucide-react';
import { DashboardLayout, getDashboardConfig } from '@/components/layout/DashboardLayout';
import { MatchScoreRing } from '@/components/ui/MatchScoreRing';
import { challenges, studentSkills } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function StudentDashboardPage() {
  const navigate = useNavigate();
  const { role, showToast } = useApp();
  const config = getDashboardConfig(role);

  const matchedChallenges = challenges.slice(0, 3).map((c, i) => ({
    ...c,
    skillMatch: [92, 88, 81][i],
    matchedSkills: [
      ['AI/ML', 'IoT', 'Data Science'],
      ['IoT', 'Web Development', 'Data Science'],
      ['Web Development', 'Data Science', 'AI/ML'],
    ][i],
  }));

  return (
    <DashboardLayout title={config.title} sidebarItems={config.items} roleLabel={config.roleLabel}>
      {/* Welcome */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-700 p-6">
        <h2 className="text-xl font-bold text-white">Welcome, Aman!</h2>
        <p className="mt-1 text-sm text-teal-100">Your skills: AI/ML, IoT, Web Development, Data Science</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {studentSkills.map((s) => (
            <span key={s} className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-medium text-white">{s}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'My Projects', value: '3', icon: Rocket },
          { label: 'My Team', value: '5', icon: Users },
          { label: 'Mentors', value: '2', icon: Award },
          { label: 'Achievements', value: '7', icon: Target },
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

      {/* Skill-matched challenges */}
      <h3 className="mb-4 text-lg font-bold text-navy-900">Problems You Can Solve</h3>
      <div className="space-y-4">
        {matchedChallenges.map((c, i) => (
          <div key={c.id} className="card card-hover p-5 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <MatchScoreRing score={c.skillMatch} size={90} strokeWidth={7} label="SKILL MATCH" delay={i * 200} />
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-xs font-medium text-teal-600">{c.category}</span>
                  <span className="badge badge-high">{c.priority}</span>
                </div>
                <h4 className="font-bold text-navy-900">{c.title}</h4>
                <p className="mt-1 text-xs text-gray-500">{c.district}, {c.state}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.matchedSkills.map((s) => (
                    <span key={s} className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate(`/problems/${c.id}`)} className="btn-secondary text-sm">View Challenge</button>
                <button onClick={() => showToast('Join request sent!', 'success')} className="btn-accent text-sm">
                  Request to Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h3 className="mb-4 mt-8 text-lg font-bold text-navy-900">My Achievements</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'SIH 2025 Finalist', icon: Award },
          { label: '3 Projects Deployed', icon: Rocket },
          { label: 'Top Contributor', icon: Sparkles },
          { label: '500+ People Impacted', icon: Users },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <div key={i} className="card p-4 text-center">
              <Icon className="mx-auto mb-2 h-6 w-6 text-amber-500" />
              <p className="text-sm font-semibold text-navy-900">{a.label}</p>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
