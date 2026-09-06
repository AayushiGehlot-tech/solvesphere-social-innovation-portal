import { useEffect, useState } from 'react';
import { Users, TrendingUp, TrendingDown, ArrowLeft, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { impactData } from '@/data/mockData';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

export function ImpactDashboardPage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const data = impactData[0];
  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now(); const duration = 1500;
      const animate = () => { const progress = Math.min((Date.now() - start) / duration, 1); setScore(data.impactScore * (1 - Math.pow(1 - progress, 3))); if (progress < 1) requestAnimationFrame(animate); else setScore(data.impactScore); };
      animate();
    }, 200); return () => clearTimeout(timer);
  }, [data.impactScore]);
  const radius = 130; const circumference = 2 * Math.PI * radius; const offset = circumference - (score / 100) * circumference;
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50/30 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/projects/smart-irrigation')} className="btn-ghost mb-6"><ArrowLeft className="h-4 w-4" /> Back to Project</button>
        <div className="mb-8 text-center"><p className="mb-3 text-sm font-bold uppercase tracking-wider text-teal-600">Impact Dashboard</p><h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">Measure What Changed</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">We don't just track projects. We measure whether people's lives actually improved.</p></div>
        <div className="mb-6 text-center"><h2 className="text-xl font-bold text-navy-900">{data.projectName}</h2></div>
        <div className="mb-8 flex justify-center"><div className="relative inline-flex items-center justify-center" style={{ width: 300, height: 300 }}><svg width="300" height="300" className="-rotate-90"><circle cx="150" cy="150" r={radius} fill="none" stroke="#e5e7eb" strokeWidth={14} /><circle cx="150" cy="150" r={radius} fill="none" stroke="url(#impactGrad)" strokeWidth={14} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.3s ease' }} /><defs><linearGradient id="impactGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#14b8a6" /><stop offset="100%" stopColor="#0891b2" /></linearGradient></defs></svg><div className="absolute flex flex-col items-center"><span className="text-6xl font-extrabold text-navy-900">{Math.round(score)}</span><span className="text-lg font-bold text-gray-400">/ 100</span><span className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal-600">Social Impact Score</span></div></div></div>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="card p-5 text-center"><Users className="mx-auto mb-2 h-6 w-6 text-teal-600" /><p className="text-3xl font-extrabold text-navy-900"><AnimatedCounter value={data.peopleBenefited} duration={1500} /></p><p className="mt-1 text-xs text-gray-400">People Benefited</p></div>
          <div className="card p-5 text-center"><TrendingUp className="mx-auto mb-2 h-6 w-6 text-emerald-600" /><p className="text-3xl font-extrabold text-emerald-600">{data.metrics[0].value}</p><p className="mt-1 text-xs text-gray-400">{data.metrics[0].label}</p></div>
          <div className="card p-5 text-center"><TrendingDown className="mx-auto mb-2 h-6 w-6 text-cyan-600" /><p className="text-3xl font-extrabold text-cyan-600">{data.metrics[1].value}</p><p className="mt-1 text-xs text-gray-400">{data.metrics[1].label}</p></div>
          <div className="card p-5 text-center"><Heart className="mx-auto mb-2 h-6 w-6 text-amber-500" /><p className="text-3xl font-extrabold text-amber-500">{data.communitySatisfaction}%</p><p className="mt-1 text-xs text-gray-400">Community Satisfaction</p></div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{data.metrics.slice(2).map((m, i) => <div key={i} className="card p-4 text-center"><p className="text-2xl font-extrabold text-navy-900">{m.value}</p><p className="mt-1 text-xs text-gray-400">{m.label}</p></div>)}<div className="card p-4 text-center"><p className="text-2xl font-extrabold text-navy-900">{data.villagesCovered}</p><p className="mt-1 text-xs text-gray-400">Villages Covered</p></div></div>
        <div className="mb-6 card p-6"><h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-navy-900"><Award className="h-5 w-5 text-teal-600" />Before & After Comparison</h3><div className="space-y-3">{data.beforeAfter.map((ba, i) => <div key={i} className="grid grid-cols-3 items-center gap-4 rounded-xl border border-gray-100 p-4"><p className="text-sm font-semibold text-navy-900">{ba.metric}</p><div className="text-center"><span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">{ba.before}</span></div><div className="text-center"><span className="rounded-lg bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">{ba.after}</span></div></div>)}</div></div>
        <div className="rounded-2xl bg-navy-950 p-8 text-center"><p className="text-xl font-bold text-white">We don't just track projects. We measure whether people's lives actually improved.</p></div>
      </div>
    </div>
  );
}
