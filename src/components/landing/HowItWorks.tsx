import { useEffect, useRef, useState } from 'react';
import {
  Megaphone,
  Brain,
  Target,
  Users,
  Rocket,
  BarChart3,
  ArrowRight,
} from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'REPORT',
    icon: Megaphone,
    description: 'A citizen or community submits a real-world challenge.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    num: '02',
    title: 'UNDERSTAND',
    icon: Brain,
    description: 'AI converts the unstructured report into structured problem intelligence.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    num: '03',
    title: 'MATCH',
    icon: Target,
    description: 'AI identifies organizations and teams capable of solving it.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    num: '04',
    title: 'COLLABORATE',
    icon: Users,
    description: 'Providers submit proposals and stakeholders form teams.',
    color: 'from-navy-500 to-navy-600',
  },
  {
    num: '05',
    title: 'DEPLOY',
    icon: Rocket,
    description: 'The selected solution moves through prototype, testing and deployment.',
    color: 'from-cyan-600 to-teal-600',
  },
  {
    num: '06',
    title: 'MEASURE',
    icon: BarChart3,
    description: 'The platform measures actual social impact.',
    color: 'from-teal-600 to-emerald-600',
  },
];

export function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleSteps((prev) => [...prev, idx]);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-teal-600">The Process</p>
          <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">How SolveSphere Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Six stages that transform a citizen's complaint into a deployed, measured solution.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={sectionRef}>
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-200 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isVisible = visibleSteps.includes(i);
              return (
                <div
                  key={i}
                  data-index={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon circle */}
                    <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                      <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-navy-900 shadow-md">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-bold uppercase tracking-wider text-navy-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow between steps (desktop) */}
                  {i < steps.length - 1 && (
                    <div className="absolute -right-3 top-8 z-10 hidden lg:block">
                      <ArrowRight className="h-4 w-4 text-teal-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
