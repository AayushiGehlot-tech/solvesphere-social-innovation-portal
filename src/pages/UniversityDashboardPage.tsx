import { useNavigate } from 'react-router-dom';
import { Rocket, Users, Award, Building2, FileText, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { DashboardLayout, getDashboardConfig } from '@/components/layout/DashboardLayout';
import { challenges, providers } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function UniversityDashboardPage() {
  const navigate = useNavigate();
  const { role, showToast } = useApp();
  const config = getDashboardConfig(role);

  const assignedChallenges = challenges.slice(0, 3);
  const studentTeams = [
    { name: 'TechForGood', members: 5, status: 'Active' },
    { name: 'AquaSensors', members: 4, status: 'Active' },
    { name: 'EduReach', members: 6, status: 'Active' },
  ];

  return (
    <DashboardLayout title={config.title} sidebarItems={config.items} roleLabel={config.roleLabel}>
      {/* Welcome */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-navy-800 to-navy-950 p-6">
        <h2 className="text-xl font-bold text-white">BIT Mesra Innovation Lab</h2>
        <p className="mt-1 text-sm text-navy-300">3 active projects · 3 student teams · 2 faculty mentors</p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: 'Assigned', value: '6', icon: Lightbulb },
          { label: 'Active Projects', value: '3', icon: Rocket },
          { label: 'Faculty Mentors', value: '2', icon: Award },
          { label: 'Student Teams', value: '3', icon: Users },
          { label: 'Industry Collabs', value: '4', icon: Building2 },
          { label: 'Proposals', value: '8', icon: FileText },
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

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { label: 'Accept Challenge', action: () => navigate('/problems') },
          { label: 'Create Team', action: () => showToast('Team creation form — demo', 'info') },
          { label: 'Assign Mentor', action: () => showToast('Mentor assignment — demo', 'info') },
          { label: 'Submit Proposal', action: () => navigate('/compare-proposals') },
          { label: 'Collaborate with Industry', action: () => navigate('/industry-funding') },
        ].map((btn) => (
          <button key={btn.label} onClick={btn.action} className="btn-secondary text-sm">
            {btn.label}
          </button>
        ))}
      </div>

      {/* Assigned challenges */}
      <h3 className="mb-4 text-lg font-bold text-navy-900">Assigned Challenges</h3>
      <div className="mb-6 space-y-3">
        {assignedChallenges.map((c, i) => (
          <div key={c.id} className="card card-hover p-4 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-navy-900">{c.title}</h4>
                  <span className="badge badge-high">{c.priority}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{c.category} · {c.district}, {c.state}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {c.requiredExpertise.map((e) => (
                    <span key={e} className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-600">{e}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => navigate(`/problems/${c.id}`)} className="btn-secondary text-sm">View</button>
            </div>
          </div>
        ))}
      </div>

      {/* Student teams */}
      <h3 className="mb-4 text-lg font-bold text-navy-900">Student Teams</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {studentTeams.map((team, i) => (
          <div key={i} className="card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white">
                {team.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-navy-900">{team.name}</p>
                <p className="text-xs text-gray-400">{team.members} members</p>
              </div>
            </div>
            <span className="badge badge-low">{team.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
