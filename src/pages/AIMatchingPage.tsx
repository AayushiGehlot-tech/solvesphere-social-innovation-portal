import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Users, AlertCircle, Brain, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { MatchScoreRing } from '@/components/ui/MatchScoreRing';
import { useApp } from '@/context/AppContext';
import { challenges, providers } from '@/data/mockData';

export function AIMatchingPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const challenge = challenges[0];

  const matchedProviders = providers
    .filter((p) => p.matchScore)
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50/30 to-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">AI Matching Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Find the Right People to Solve It
          </h1>
          <p className="mt-3 text-gray-500">
            Our AI has analyzed the challenge and ranked the best-matched solution providers.
          </p>
        </div>

        {/* Selected challenge */}
        <div className="mb-8 card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="badge badge-high">{challenge.priority}</span>
                <span className="text-xs font-medium text-teal-600">{challenge.category}</span>
              </div>
              <h2 className="text-xl font-bold text-navy-900">{challenge.title}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {challenge.district}, {challenge.state}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-4 w-4" /> {challenge.peopleAffected.toLocaleString('en-IN')} affected
                </span>
                <span className="inline-flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" /> {challenge.similarChallenges} similar challenges
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-teal-50 px-6 py-4">
              <span className="text-3xl font-extrabold text-teal-600">{challenge.topMatch}%</span>
              <span className="text-xs font-medium text-teal-600">Top Match</span>
            </div>
          </div>
        </div>

        {/* Matched providers */}
        <div className="mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5 text-teal-600" />
          <h3 className="text-lg font-bold text-navy-900">Ranked Solution Providers</h3>
        </div>

        <div className="space-y-4">
          {matchedProviders.map((provider, i) => (
            <div
              key={provider.id}
              className="card card-hover p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                {/* Match score ring */}
                <div className="flex flex-col items-center">
                  <MatchScoreRing score={provider.matchScore || 0} size={110} delay={i * 200} />
                </div>

                {/* Provider info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h4 className="text-lg font-bold text-navy-900">{provider.name}</h4>
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="mb-3 text-sm text-gray-500">{provider.type} · {provider.location}</p>

                  <div className="mb-3">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">Expertise</p>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.expertise.map((exp) => (
                        <span key={exp} className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-600">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Previous Projects</p>
                      <p className="font-bold text-navy-900">{provider.projectsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Rating</p>
                      <p className="font-bold text-navy-900">{provider.rating}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Availability</p>
                      <p className={`font-bold ${provider.availability === 'Available' ? 'text-emerald-600' : provider.availability === 'Limited' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {provider.availability}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/providers/${provider.id}`)}
                    className="btn-secondary text-sm"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      showToast(`Invitation sent to ${provider.name}`, 'success');
                    }}
                    className="btn-primary text-sm"
                  >
                    Invite to Solve
                  </button>
                </div>
              </div>

              {/* Why this match */}
              {provider.matchReasons && (
                <div className="mt-4 rounded-xl bg-teal-50/50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-teal-600">Why this match?</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.matchReasons.map((reason, j) => (
                      <span key={j} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-teal-700">
                        <CheckCircle2 className="h-3 w-3" />
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div className="mt-8 flex items-center justify-between">
          <button onClick={() => navigate('/post-problem')} className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to Problem
          </button>
          <button onClick={() => navigate('/compare-proposals')} className="btn-accent text-base">
            Compare Proposals
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
