import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const stats = [
  { value: 2481, label: 'Challenges', suffix: '' },
  { value: 412, label: 'Solutions Deployed', suffix: '' },
  { value: 126, label: 'Universities', suffix: '' },
  { value: 48, label: 'Industry Partners', suffix: '' },
  { value: 87, label: 'Average Impact Score', suffix: '/100' },
];

export function ImpactStats() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-teal-400">Real Numbers, Real Impact</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            A platform already making a difference
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-navy-800 bg-navy-900/50 p-6 text-center transition-all duration-300 hover:border-teal-700/50 hover:bg-navy-900 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl font-extrabold text-white lg:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <p className="mt-2 text-sm font-medium text-navy-300">{stat.label}</p>
              <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-teal-500 transition-all duration-500 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
