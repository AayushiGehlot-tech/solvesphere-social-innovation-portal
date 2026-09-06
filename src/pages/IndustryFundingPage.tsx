import { useNavigate } from 'react-router-dom';
import { TrendingUp, Users, Lightbulb, Cpu, Rocket, MapPin } from 'lucide-react';
import { projects, challenges } from '@/data/mockData';
import { SectionHeading } from '@/components/ui/Shared';
import { useApp } from '@/context/AppContext';

export function IndustryFundingPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const project = projects[0];
  const fundingProjects = challenges.filter((c) => c.status === 'IN_PROGRESS' || c.status === 'DEPLOYMENT' || c.status === 'PROPOSALS_RECEIVED').slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Industry & CSR" title="Projects Looking for Support" subtitle="Fund, mentor, or provide technology for projects that are changing lives." center={false} />

        <div className="mb-6 card overflow-hidden">
          <div className="bg-gradient-to-br from-navy-800 to-navy-950 p-6 text-white">
            <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-xs font-semibold text-teal-400">Featured Project</span>
            <h3 className="mt-3 text-2xl font-extrabold">{project.name}</h3>
            <p className="mt-1 text-sm text-navy-300">{project.challengeTitle}</p>
          </div>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Funding Required</p><p className="text-2xl font-extrabold text-navy-900">₹{(project.fundingRequired / 100000).toFixed(1)} Lakh</p></div>
              <div><p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Current Funding</p><p className="text-2xl font-extrabold text-teal-600">₹{(project.currentFunding / 100000).toFixed(1)} Lakh</p></div>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-sm"><span className="text-gray-500">{Math.round((project.currentFunding / project.fundingRequired) * 100)}% funded</span><span className="font-semibold text-navy-900">₹{((project.fundingRequired - project.currentFunding) / 100000).toFixed(1)} Lakh to go</span></div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-1000" style={{ width: `${(project.currentFunding / project.fundingRequired) * 100}%` }} /></div>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Support Required</p>
              <div className="flex flex-wrap gap-2">{project.supportNeeded.map((s) => (<span key={s} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-600">{s}</span>))}</div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={() => showToast('Sponsorship interest registered!', 'success')} className="btn-accent">Sponsor Project</button>
              <button onClick={() => showToast('Mentorship offered!', 'success')} className="btn-secondary">Offer Mentorship</button>
              <button onClick={() => showToast('Technology support offered!', 'success')} className="btn-secondary">Provide Technology</button>
            </div>
          </div>
        </div>

        <h3 className="mb-4 text-lg font-bold text-navy-900">More Projects Seeking Support</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {fundingProjects.map((c, i) => {
            const funding = 150000 + i * 100000 + 50000;
            const current = Math.floor(funding * 0.6);
            return (
              <div key={c.id} className="card card-hover p-5 animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <h4 className="font-bold text-navy-900">{c.title}</h4>
                <p className="mt-1 text-xs text-gray-400">{c.district}, {c.state}</p>
                <div className="mt-3 flex items-center justify-between text-sm"><span className="text-gray-500">Funding Required</span><span className="font-bold text-navy-900">₹{(funding / 100000).toFixed(1)} L</span></div>
                <div className="mt-1 flex items-center justify-between text-sm"><span className="text-gray-500">Current Funding</span><span className="font-bold text-teal-600">₹{(current / 100000).toFixed(1)} L</span></div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500" style={{ width: `${(current / funding) * 100}%` }} /></div>
                <button onClick={() => showToast('Sponsorship interest registered!', 'success')} className="btn-secondary mt-4 w-full text-sm">Sponsor This Project</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
