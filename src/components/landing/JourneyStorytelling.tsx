import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const journeySteps = [
  {
    num: '01',
    title: 'Problem',
    description: 'A citizen reports a real community challenge',
    icon: '📢',
  },
  {
    num: '02',
    title: 'AI Intelligence',
    description: 'AI understands, classifies, and structures the problem',
    icon: '🧠',
  },
  {
    num: '03',
    title: 'Smart Match',
    description: 'AI finds the right experts and organizations',
    icon: '🎯',
  },
  {
    num: '04',
    title: 'Collaboration',
    description: 'Teams form, proposals are submitted and reviewed',
    icon: '🤝',
  },
  {
    num: '05',
    title: 'Deployment',
    description: 'Solution moves through prototype to deployment',
    icon: '🚀',
  },
  {
    num: '06',
    title: 'Impact',
    description: 'We measure whether lives actually improved',
    icon: '📊',
  },
];

const oldWay = [
  'Citizen reports problem',
  'Complaint gets stored in a database',
  'Limited visibility and no action',
];

const newWay = [
  'Citizen reports problem',
  'AI understands and structures it',
  'AI finds the right experts',
  'Teams collaborate and build',
  'Solution gets deployed',
  'Impact gets measured',
];

export function JourneyStorytelling() {
  const [visibleStep, setVisibleStep] = useState(-1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleStep(idx);
          }
        });
      },
      { threshold: 0.5 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-padding bg-gradient-to-b from-white to-navy-50/30">
      <div className="container-max">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-teal-600">The Transformation</p>
          <h2 className="text-3xl font-bold text-navy-900 sm:text-4xl">From Problem to Impact</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            We don't just store complaints. We turn them into deployed solutions with measurable impact.
          </p>
        </div>

        {/* Journey timeline */}
        <div className="mb-16">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-300 via-teal-300 to-emerald-300" />

            <div className="space-y-12">
              {journeySteps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  data-index={i}
                  className={`relative flex items-center gap-8 transition-all duration-700 ${
                    visibleStep >= i ? 'opacity-100 translate-x-0' : 'opacity-0'
                  } ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <div className={`card p-6 ${visibleStep >= i ? 'shadow-card' : ''}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{step.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-teal-600">{step.num}</span>
                            <h3 className="text-lg font-bold text-navy-900">{step.title}</h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className={`relative z-10 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    visibleStep >= i ? 'bg-teal-500 scale-100' : 'bg-gray-300 scale-75'
                  }`}>
                    {visibleStep >= i && (
                      <div className="absolute h-4 w-4 animate-ping rounded-full bg-teal-400 opacity-40" />
                    )}
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Old Way vs SolveSphere */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <div className="mb-6">
              <span className="badge badge-neutral">OLD WAY</span>
              <h3 className="mt-3 text-xl font-bold text-gray-600">Traditional Complaint Portal</h3>
            </div>
            <div className="space-y-3">
              {oldWay.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-400">
                    {i + 1}
                  </span>
                  {step}
                  {i < oldWay.length - 1 && <ArrowRight className="h-3 w-3 text-gray-300" />}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 p-8">
            <div className="mb-6">
              <span className="badge badge-info">SOLVESPHERE</span>
              <h3 className="mt-3 text-xl font-bold text-navy-900">AI-Powered Innovation Pipeline</h3>
            </div>
            <div className="space-y-3">
              {newWay.map((step, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-navy-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                  {i < newWay.length - 1 && <ArrowRight className="h-3 w-3 text-teal-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
