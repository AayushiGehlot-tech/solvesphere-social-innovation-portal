import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Star, MapPin } from 'lucide-react';
import { challenges } from '@/data/mockData';
import { PriorityBadge, SectionHeading } from '@/components/ui/Shared';

export function ChallengeDetailPage() {
  const navigate = useNavigate();
  const challenge = challenges[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button onClick={() => navigate('/problems')} className="btn-ghost mb-6">
          ← Back to Challenges
        </button>

        {/* Header */}
        <div className="mb-6 card p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <PriorityBadge priority={challenge.priority} />
            <span className="text-sm font-medium text-teal-600">{challenge.category}</span>
            <span className="text-sm text-gray-400">·</span>
            <span className="text-sm text-gray-500">{challenge.district}, {challenge.state}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">{challenge.title}</h1>
          <p className="mt-3 text-gray-600">{challenge.description}</p>

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">AI Sub-category</p>
              <p className="font-bold text-navy-900">{challenge.aiSubCategory}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Similar Challenges</p>
              <p className="font-bold text-navy-900">{challenge.similarChallenges}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Top Match</p>
              <p className="font-bold text-teal-600">{challenge.topMatch}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">People Affected</p>
              <p className="font-bold text-navy-900">{challenge.peopleAffected.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {/* Required expertise */}
        <div className="mb-6 card p-6">
          <h3 className="mb-3 text-sm font-bold text-navy-900">Required Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {challenge.requiredExpertise.map((exp) => (
              <span key={exp} className="rounded-lg bg-navy-50 px-3 py-1.5 text-sm font-medium text-navy-700">
                {exp}
              </span>
            ))}
          </div>
        </div>

        {/* AI analysis summary */}
        <div className="mb-6 card p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100">
              <svg className="h-4 w-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-navy-900">AI Problem Intelligence</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Classification</p>
              <p className="font-semibold text-navy-900">{challenge.category}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Sub-category</p>
              <p className="font-semibold text-navy-900">{challenge.aiSubCategory}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Priority</p>
              <p className="font-semibold text-amber-600">{challenge.priority}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Matched Providers</p>
              <p className="font-semibold text-navy-900">{challenge.matchedProviders}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => navigate('/ai-matching')} className="btn-accent">
            Find Solution Providers
          </button>
          <button onClick={() => navigate('/compare-proposals')} className="btn-secondary">
            Compare Proposals
          </button>
        </div>
      </div>
    </div>
  );
}
