import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  IndianRupee,
  Award,
  Users,
  Target,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { proposals } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { MatchScoreRing } from '@/components/ui/MatchScoreRing';

export function CompareProposalsPage() {
  const navigate = useNavigate();
  const { showToast } = useApp();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [shortlisted, setShortlisted] = useState<string[]>([]);

  const toggleShortlist = (id: string) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    showToast('Shortlist updated', 'info');
  };

  const handleAccept = (name: string) => {
    showToast(`Proposal from ${name} accepted!`, 'success');
    setTimeout(() => navigate('/projects/smart-irrigation'), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50/30 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Proposal Comparison</span>
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Compare Solution Proposals
          </h1>
          <p className="mt-3 text-gray-500">
            Review proposals from matched providers side by side. Shortlist, compare, and accept the best fit.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-8 overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Provider</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Expertise</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Timeline</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Est. Cost</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">AI Match</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal, i) => (
                <tr key={proposal.id} className="border-b border-gray-100 transition-colors hover:bg-navy-50/30">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-bold text-navy-900">{proposal.providerName}</p>
                      <p className="text-xs text-gray-400">{proposal.providerType}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-navy-700">{proposal.expertise}</td>
                  <td className="px-4 py-4 text-sm text-navy-700">{proposal.timeline}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-navy-900">{proposal.estimatedCost}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {proposal.rating}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-bold text-teal-600">{proposal.aiMatch}%</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => toggleShortlist(proposal.id)}
                        className={`rounded-lg p-1.5 transition-colors ${
                          shortlisted.includes(proposal.id)
                            ? 'bg-amber-100 text-amber-600'
                            : 'text-gray-400 hover:bg-gray-100'
                        }`}
                        title="Shortlist"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAccept(proposal.providerName)}
                        className="rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition-colors hover:bg-teal-100"
                      >
                        Accept
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed proposal cards */}
        <div className="space-y-4">
          {proposals.map((proposal, i) => (
            <div
              key={proposal.id}
              className="card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header row */}
              <button
                onClick={() => setExpanded(expanded === proposal.id ? null : proposal.id)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-navy-50/30"
              >
                <div className="flex items-center gap-4">
                  <MatchScoreRing score={proposal.aiMatch} size={70} strokeWidth={6} delay={i * 150} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-navy-900">{proposal.providerName}</h3>
                      {shortlisted.includes(proposal.id) && (
                        <span className="badge badge-medium">Shortlisted</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{proposal.providerType} · {proposal.timeline} · {proposal.estimatedCost}</p>
                  </div>
                </div>
                {expanded === proposal.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </button>

              {/* Expanded details */}
              {expanded === proposal.id && (
                <div className="animate-fade-in border-t border-gray-100 p-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <Target className="h-3.5 w-3.5" /> Approach
                        </p>
                        <p className="text-sm leading-relaxed text-navy-700">{proposal.approach}</p>
                      </div>
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <Users className="h-3.5 w-3.5" /> Team
                        </p>
                        <p className="text-sm text-navy-700">{proposal.team}</p>
                      </div>
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <Award className="h-3.5 w-3.5" /> Previous Experience
                        </p>
                        <p className="text-sm text-navy-700">{proposal.previousExperience}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">Technology</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proposal.technology.map((tech) => (
                            <span key={tech} className="rounded-md bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Expected Outcomes
                        </p>
                        <ul className="space-y-1.5">
                          {proposal.expectedOutcomes.map((outcome, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-navy-700">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                    <button
                      onClick={() => toggleShortlist(proposal.id)}
                      className="btn-secondary text-sm"
                    >
                      {shortlisted.includes(proposal.id) ? 'Remove from Shortlist' : 'Shortlist'}
                    </button>
                    <button
                      onClick={() => handleAccept(proposal.providerName)}
                      className="btn-accent text-sm"
                    >
                      Accept Proposal
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-8 flex items-center justify-between">
          <button onClick={() => navigate('/ai-matching')} className="btn-secondary">
            <ArrowLeft className="h-4 w-4" />
            Back to Matching
          </button>
          <button onClick={() => navigate('/projects/smart-irrigation')} className="btn-primary">
            View Project Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
