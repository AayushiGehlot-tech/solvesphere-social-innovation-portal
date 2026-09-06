import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';
import type { Priority, ProjectStatus } from '@/types';

export function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, string> = {
    URGENT: 'bg-red-100 text-red-700 border border-red-200',
    HIGH: 'bg-amber-50 text-amber-700 border border-amber-200',
    MEDIUM: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    LOW: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[priority]}`}>
      {priority === 'URGENT' && <AlertCircle className="h-3 w-3" />}
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const statusConfig: Record<ProjectStatus, { color: string; icon: typeof CheckCircle2 }> = {
    PROBLEM_IDENTIFIED: { color: 'bg-gray-100 text-gray-700', icon: Circle },
    AI_ANALYZED: { color: 'bg-cyan-50 text-cyan-700', icon: CheckCircle2 },
    MATCHING: { color: 'bg-cyan-50 text-cyan-700', icon: Clock },
    PROPOSALS_RECEIVED: { color: 'bg-teal-50 text-teal-700', icon: CheckCircle2 },
    IN_PROGRESS: { color: 'bg-teal-50 text-teal-700', icon: Clock },
    FIELD_TESTING: { color: 'bg-amber-50 text-amber-700', icon: Clock },
    DEPLOYMENT: { color: 'bg-amber-50 text-amber-700', icon: Clock },
    COMPLETED: { color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
    IMPACT_MEASURED: { color: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
  };
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.color}`}>
      <Icon className="h-3 w-3" />
    </span>
  );
}

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    category: string;
    district: string;
    state: string;
    priority: Priority;
    aiSubCategory: string;
    requiredExpertise: string[];
    similarChallenges: number;
    topMatch: number;
    statusLabel: string;
    peopleAffected?: number;
    progress?: number;
  };
  onClick?: () => void;
  showProgress?: boolean;
}

export function ChallengeCard({ challenge, onClick, showProgress }: ChallengeCardProps) {
  return (
    <div onClick={onClick} className="card card-hover cursor-pointer overflow-hidden p-5">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-bold text-navy-900 leading-snug">{challenge.title}</h3>
          <p className="mt-1 text-xs font-medium text-teal-600">{challenge.category}</p>
        </div>
        <PriorityBadge priority={challenge.priority} />
      </div>

      <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {challenge.district}, {challenge.state}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {challenge.requiredExpertise.map((exp) => (
          <span key={exp} className="rounded-md bg-navy-50 px-2 py-0.5 text-xs font-medium text-navy-600">{exp}</span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-4 text-xs">
          <div><span className="text-gray-400">AI: </span><span className="font-semibold text-navy-700">{challenge.aiSubCategory}</span></div>
          <div><span className="text-gray-400">Similar: </span><span className="font-semibold text-navy-700">{challenge.similarChallenges}</span></div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Top Match</div>
          <div className="text-sm font-bold text-teal-600">{challenge.topMatch}%</div>
        </div>
      </div>

      {showProgress && challenge.progress !== undefined && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium text-navy-600">{challenge.statusLabel}</span>
            <span className="font-bold text-teal-600">{challenge.progress}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-1000" style={{ width: `${challenge.progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

export function VerifiedBadge({ label = 'Verified' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
      <CheckCircle2 className="h-3 w-3" />{label}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: string; subtitle?: string; center?: boolean }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-wider text-teal-600">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className={`mt-4 text-lg text-gray-500 ${center ? 'mx-auto max-w-2xl' : ''}`}>{subtitle}</p>}
    </div>
  );
}

export function CTAButton({ to, children, variant = 'primary' }: { to: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'accent' }) {
  const styles = { primary: 'btn-primary', secondary: 'btn-secondary', accent: 'btn-accent' };
  return <Link to={to} className={styles[variant]}>{children}</Link>;
}
