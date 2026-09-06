import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Award, Building2, Cpu } from 'lucide-react';
import { providers } from '@/data/mockData';
import { VerifiedBadge } from '@/components/ui/Shared';
import { useApp } from '@/context/AppContext';

export function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useApp();
  const provider = providers.find((p) => p.id === id) || providers[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/providers')} className="btn-ghost mb-6"><ArrowLeft className="h-4 w-4" /> Back to Providers</button>

        <div className="mb-6 card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-950 text-2xl font-bold text-teal-400">{provider.name.charAt(0)}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-navy-900">{provider.name}</h1>
                  {provider.verified && <VerifiedBadge label="Verified Solution Provider" />}
                </div>
                <p className="mt-1 text-sm text-gray-500">{provider.type} · {provider.location}</p>
                <div className="mt-2 inline-flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" /><span className="text-sm font-bold text-navy-900">{provider.rating}</span><span className="text-sm text-gray-400">/ 5.0</span></div>
              </div>
            </div>
            <button onClick={() => showToast(`Invitation sent to ${provider.name}`, 'success')} className="btn-accent">Invite to Solve Challenge</button>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">{provider.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <div className="mb-3 flex items-center gap-2"><Award className="h-5 w-5 text-teal-600" /><h3 className="font-bold text-navy-900">Expertise</h3></div>
            <div className="flex flex-wrap gap-2">{provider.expertise.map((exp) => (<span key={exp} className="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-700">{exp}</span>))}</div>
          </div>
          <div className="card p-5">
            <div className="mb-3 flex items-center gap-2"><Cpu className="h-5 w-5 text-cyan-600" /><h3 className="font-bold text-navy-900">Technologies</h3></div>
            <div className="flex flex-wrap gap-2">{provider.technologies.map((tech) => (<span key={tech} className="rounded-lg bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700">{tech}</span>))}</div>
          </div>
          <div className="card p-5">
            <div className="mb-3 flex items-center gap-2"><Star className="h-5 w-5 text-emerald-600" /><h3 className="font-bold text-navy-900">Track Record</h3></div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-2xl font-extrabold text-navy-900">{provider.projectsCompleted}</p><p className="text-xs text-gray-400">Projects</p></div>
              <div><p className="text-2xl font-extrabold text-navy-900">{provider.successfulDeployments}</p><p className="text-xs text-gray-400">Deployments</p></div>
              <div><p className="text-2xl font-extrabold text-navy-900">{provider.rating}</p><p className="text-xs text-gray-400">Rating</p></div>
            </div>
          </div>
          <div className="card p-5">
            <div className="mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-navy-600" /><h3 className="font-bold text-navy-900">Districts Served</h3></div>
            <div className="flex flex-wrap gap-2">{provider.districtsServed.map((d) => (<span key={d} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-700">{d}</span>))}</div>
          </div>
          {provider.resources && (
            <div className="card p-5 sm:col-span-2">
              <div className="mb-3 flex items-center gap-2"><Building2 className="h-5 w-5 text-amber-600" /><h3 className="font-bold text-navy-900">Resources</h3></div>
              <div className="flex flex-wrap gap-2">{provider.resources.map((r) => (<span key={r} className="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700">{r}</span>))}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
