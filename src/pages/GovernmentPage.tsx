import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { MapPin, TrendingUp, Award, Building2, Lightbulb, Users, FileText } from 'lucide-react';
import { govMetrics, chartData } from '@/data/mockData';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const sidebarItems = [
  { label: 'Overview', icon: TrendingUp, path: '/government' },
  { label: 'Challenges', icon: FileText, path: '/problems' },
  { label: 'Projects', icon: Building2, path: '/projects/smart-irrigation' },
  { label: 'Providers', icon: Users, path: '/providers' },
  { label: 'Impact', icon: Award, path: '/impact' },
];

export function GovernmentPage() {
  const topMetrics = [
    { label: 'Total Challenges', value: govMetrics.totalChallenges, color: 'text-navy-900' },
    { label: 'Resolved', value: govMetrics.resolved, color: 'text-emerald-600' },
    { label: 'In Progress', value: govMetrics.inProgress, color: 'text-teal-600' },
    { label: 'Pending', value: govMetrics.pending, color: 'text-amber-600' },
    { label: 'Universities', value: govMetrics.universities, color: 'text-cyan-600' },
    { label: 'Industry Partners', value: govMetrics.industryPartners, color: 'text-navy-700' },
  ];

  return (
    <DashboardLayout title="Government Command Center" sidebarItems={sidebarItems} roleLabel="Government">
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {topMetrics.map((m, i) => (<div key={i} className="card p-4 text-center animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}><p className={`text-2xl font-extrabold lg:text-3xl ${m.color}`}><AnimatedCounter value={m.value} duration={1500} /></p><p className="mt-1 text-xs text-gray-400">{m.label}</p></div>))}
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-5"><h3 className="mb-4 text-sm font-bold text-navy-900">Challenges by Domain</h3><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={chartData.challengesByDomain} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40} paddingAngle={2}>{chartData.challengesByDomain.map((entry, i) => <Cell key={i} fill={entry.fill} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>
        <div className="card p-5"><h3 className="mb-4 text-sm font-bold text-navy-900">Project Completion Funnel</h3><ResponsiveContainer width="100%" height={250}><BarChart data={chartData.projectCompletion} layout="vertical" margin={{ left: 20 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} /><XAxis type="number" tick={{ fontSize: 11 }} /><YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={70} /><Tooltip /><Bar dataKey="value" fill="#0d9488" radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="card p-5"><h3 className="mb-4 text-sm font-bold text-navy-900">Monthly Trends</h3><ResponsiveContainer width="100%" height={250}><AreaChart data={chartData.monthlyTrend}><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0891b2" stopOpacity={0.3} /><stop offset="100%" stopColor="#0891b2" stopOpacity={0} /></linearGradient><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.3} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Area type="monotone" dataKey="challenges" stroke="#0891b2" fill="url(#cg)" strokeWidth={2} /><Area type="monotone" dataKey="solutions" stroke="#10b981" fill="url(#sg)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
        <div className="card p-5"><h3 className="mb-4 text-sm font-bold text-navy-900">University Participation</h3><ResponsiveContainer width="100%" height={250}><BarChart data={chartData.universityParticipation}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend /><Bar dataKey="projects" fill="#2c4878" radius={[6, 6, 0, 0]} /><Bar dataKey="deployments" fill="#14b8a6" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div>
      </div>

      <div className="mb-6 card p-5"><h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-navy-900"><MapPin className="h-4 w-4 text-teal-600" />Challenge Density by District — Jharkhand</h3><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{chartData.districtData.map((d, i) => (<div key={i} className="rounded-xl border border-gray-100 p-4"><div className="flex items-center justify-between"><p className="text-sm font-semibold text-navy-900">{d.district}</p><div className="h-3 w-3 rounded-full" style={{ backgroundColor: `rgba(13, 148, 136, ${0.2 + (d.challenges / 420) * 0.8})` }} /></div><p className="mt-2 text-2xl font-extrabold text-navy-900">{d.challenges}</p><p className="text-xs text-gray-400">{d.resolved} resolved</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-teal-500" style={{ width: `${(d.resolved / d.challenges) * 100}%` }} /></div></div>))}</div></div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">{[{ icon: Lightbulb, label: 'Patents', value: govMetrics.patents }, { icon: Building2, label: 'Startups Created', value: govMetrics.startupsCreated }, { icon: MapPin, label: 'Villages Covered', value: govMetrics.villagesCovered }, { icon: Users, label: 'People Benefited', value: govMetrics.peopleBenefited }].map((m, i) => { const Icon = m.icon; return <div key={i} className="card p-5 text-center"><Icon className="mx-auto mb-2 h-6 w-6 text-teal-600" /><p className="text-2xl font-extrabold text-navy-900"><AnimatedCounter value={m.value} duration={1500} /></p><p className="mt-1 text-xs text-gray-400">{m.label}</p></div>; })}</div>
    </DashboardLayout>
  );
}
