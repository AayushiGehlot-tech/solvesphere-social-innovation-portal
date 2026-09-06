import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Droplets, Sprout, HeartPulse, GraduationCap, Trash2, Zap, Leaf } from 'lucide-react';
import { challenges, categories } from '@/data/mockData';
import { ChallengeCard, SectionHeading } from '@/components/ui/Shared';
import type { Priority } from '@/types';

const iconMap: Record<string, typeof Droplets> = {
  Droplets, Sprout, HeartPulse, GraduationCap, Trash2, Zap, Leaf,
};

export function ProblemsMarketplacePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = challenges.filter((c) => {
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    if (selectedPriority !== 'all' && c.priority !== selectedPriority) return false;
    if (selectedStatus !== 'all' && c.statusLabel !== selectedStatus) return false;
    return true;
  });

  const statuses = [...new Set(challenges.map((c) => c.statusLabel))];
  const priorities: Priority[] = ['URGENT', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            eyebrow="Marketplace"
            title="Problems Waiting to Be Solved"
            subtitle="Browse real community challenges. Each one has been analyzed by AI and is ready for solution providers."
            center={false}
          />
        </div>

        {/* Search & filter toggle */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 grid gap-4 rounded-2xl border border-gray-100 bg-white p-5 animate-fade-in sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label-text">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Priority</label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="input-field"
              >
                <option value="all">All Priorities</option>
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Statuses</option>
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPriority('all');
                  setSelectedStatus('all');
                  setSearch('');
                }}
                className="btn-ghost w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Category pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === 'all' ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 hover:bg-navy-50'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Droplets;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat.name ? 'bg-navy-900 text-white' : 'bg-white text-navy-600 hover:bg-navy-50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-gray-500">
          Showing <strong className="text-navy-900">{filtered.length}</strong> challenges
        </p>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((challenge, i) => (
            <div key={challenge.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <ChallengeCard
                challenge={challenge}
                onClick={() => navigate(`/problems/${challenge.id}`)}
                showProgress
              />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
            <p className="text-gray-400">No challenges match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
