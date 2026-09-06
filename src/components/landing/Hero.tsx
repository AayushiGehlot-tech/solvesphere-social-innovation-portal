import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/50 via-white to-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Decorative gradients */}
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl" />
      <div className="absolute -top-20 -left-40 h-80 w-80 rounded-full bg-cyan-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                AI-Powered Social Innovation
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              Every Problem
              <br />
              Deserves a{' '}
              <span className="gradient-text">Solution.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500">
              Turning real community challenges into collaborative innovation projects by connecting people
              with the right universities, student teams, startups, industries and government partners.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/post-problem" className="btn-primary text-base">
                Post a Problem
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/problems" className="btn-secondary text-base">
                Explore Challenges
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span>Across Jharkhand</span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>2,481 challenges active</span>
              </div>
            </div>
          </div>

          {/* Right: Hero visual */}
          <div className="animate-fade-in-up animate-stagger-2">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
