import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, SlidersHorizontal } from 'lucide-react';
import { providers } from '@/data/mockData';
import { SectionHeading, VerifiedBadge } from '@/components/ui/Shared';
import type { ProviderType } from '@/types';

const providerTypes: (ProviderType | 'All')[] = ['All', 'University', 'Student Team', 'Startup', 'MSME', 'Industry', 'Research Lab', 'NGO'];

export function ProvidersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const filtered = providers.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedType !== 'All' && p.type !== selectedType) return false;
    if (p.rating < minRating) return false;
    return true;
  });

  const availColors: Record<string, string> = {
    Available: 'text-emerald-600 bg-emerald-50',
    Busy: 'text-gray-500 bg-gray-100',
    Limited: 'text-amber-600 bg-amber-50',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Marketplace" title="Solution Providers" subtitle="Universities, student teams, startups, industries, research labs, and NGOs — all verified and ready to solve." center={false} />

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search organizations..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary"><SlidersHorizontal className="h-4 w-4" />Filters</button>
        </div>

        {showFilters && (
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 animate-fade-in">
            <label className="label-text">Minimum Rating</label>
            <div className="flex gap-2">
              {[0, 4.0, 4.5, 4.8].map((r) => (
                <button key={r} onClick={() => setMinRating(r)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${minRating === r ? 'bg-navy-900 text-white' : 'bg-gray-100 text-navy-600 hover:bg-gray-200'}`}>{r === 0 ? 'Any' : `${r}+`}</button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {providerTypes.map((type) => (
            <button key={type} onClick={() => setSelectedType(type)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${selectedType === type ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 hover:bg-navy-50'}`}>{type === 'All' ? 'All Providers' : type}</button>
          ))}
        </div>

        <p className="mb-4 text-sm text-gray-500">Showing <strong className="text-navy-900">{filtered.length}</strong> providers</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider, i) => (
            <div key={provider.id} className="card card-hover p-5 animate-fade-in-up cursor-pointer" style={{ animationDelay: `${i * 80}ms` }} onClick={() => navigate(`/providers/${provider.id}`)}>
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-950 text-lg font-bold text-teal-400">{provider.name.charAt(0)}</div>
                  <div>
                    <h3 className="font-bold text-navy-900 leading-tight">{provider.name}</h3>
                    <p className="text-xs text-gray-400">{provider.type}</p>
                  </div>
                </div>
                {provider.verified && <VerifiedBadge />}
              </div>
              <p className="mb-3 text-xs text-gray-500 line-clamp-2">{provider.description}</p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {provider.expertise.slice(0, 3).map((exp) => (
                  <span key={exp} className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-600">{exp}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-center">
                <div><p className="text-xs text-gray-400">Projects</p><p className="text-sm font-bold text-navy-900">{provider.projectsCompleted}</p></div>
                <div><p className="text-xs text-gray-400">Deployed</p><p className="text-sm font-bold text-navy-900">{provider.successfulDeployments}</p></div>
                <div><p className="text-xs text-gray-400">Rating</p><p className="inline-flex items-center gap-0.5 text-sm font-bold text-navy-900"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{provider.rating}</p></div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500"><MapPin className="h-3 w-3" />{provider.districtsServed.length} districts</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${availColors[provider.availability]}`}>{provider.availability}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
