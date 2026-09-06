import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Sprout, HeartPulse, GraduationCap, Trash2, Zap, Leaf, Users, Building2, Rocket, TrendingUp, ShieldCheck } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { ImpactStats } from '@/components/landing/ImpactStats';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { JourneyStorytelling } from '@/components/landing/JourneyStorytelling';
import { SectionHeading } from '@/components/ui/Shared';
import { categories } from '@/data/mockData';

const iconMap: Record<string, typeof Droplets> = {
  Droplets, Sprout, HeartPulse, GraduationCap, Trash2, Zap, Leaf,
};

const features = [
  { icon: Users, title: 'Citizen-First', description: 'Anyone can report a problem — no technical knowledge required.' },
  { icon: Rocket, title: 'AI-Powered', description: 'AI understands, classifies, and matches problems to experts automatically.' },
  { icon: Building2, title: 'Ecosystem', description: 'Universities, startups, industries, and government on one platform.' },
  { icon: TrendingUp, title: 'Impact Measured', description: 'We track whether lives actually improved, not just project completion.' },
];

const roles = [
  { label: 'Citizens', description: 'Report problems and track progress', icon: Users, color: 'bg-cyan-50 text-cyan-700' },
  { label: 'Students', description: 'Find problems matching your skills', icon: GraduationCap, color: 'bg-teal-50 text-teal-700' },
  { label: 'Universities', description: 'Lead research and mentor teams', icon: Building2, color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Industry', description: 'Fund, mentor, and deploy solutions', icon: Rocket, color: 'bg-navy-50 text-navy-700' },
  { label: 'Government', description: 'Oversee district-wide impact', icon: ShieldCheck, color: 'bg-amber-50 text-amber-700' },
];

export function LandingPage() {
  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            eyebrow="Problem Domains"
            title="Challenges across every domain"
            subtitle="From water quality to education, SolveSphere covers the full spectrum of societal challenges."
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Droplets;
              return (
                <Link
                  key={i}
                  to="/problems"
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-50 to-teal-50 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy-900">{cat.name}</p>
                    <p className="mt-0.5 text-[10px] text-gray-400">{cat.count} challenges</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ImpactStats />

      <HowItWorks />

      {/* Features */}
      <section className="section-padding bg-navy-50/30">
        <div className="container-max">
          <SectionHeading
            eyebrow="Why SolveSphere"
            title="More than a complaint portal"
            subtitle="A complete ecosystem that transforms how society solves problems."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="card p-6 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-glow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy-900">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <JourneyStorytelling />

      {/* Roles */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <SectionHeading
            eyebrow="Built for Everyone"
            title="One platform, many perspectives"
            subtitle="Every stakeholder in the innovation ecosystem has a role to play."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <Link
                  key={i}
                  to="/post-problem"
                  className="group card card-hover p-6 text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${role.color} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900">{role.label}</h3>
                  <p className="mt-1 text-xs text-gray-500">{role.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy-950 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Ready to solve what matters?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-300">
            Join the movement. Report a problem, offer your expertise, or fund a solution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/post-problem" className="btn-accent text-base">
              Post a Problem
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/problems" className="inline-flex items-center justify-center gap-2 rounded-xl border border-navy-700 bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-navy-600 hover:bg-navy-800">
              Explore Challenges
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
