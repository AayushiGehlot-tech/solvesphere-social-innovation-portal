import { useEffect, useState } from 'react';

const nodes = [
  { label: 'Community Problem', x: 50, y: 50, isCenter: true },
  { label: 'AI Intelligence', x: 22, y: 25 },
  { label: 'Smart Matching', x: 78, y: 25 },
  { label: 'Solution Providers', x: 22, y: 75 },
  { label: 'Deployment', x: 78, y: 75 },
  { label: 'Impact', x: 50, y: 92 },
];

const connections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [2, 4], [4, 5], [3, 5],
];

const floatingCards = [
  { label: '94% Match Found', x: 8, y: 15, delay: 0, color: 'teal' },
  { label: '7 Similar Challenges', x: 85, y: 12, delay: 0.5, color: 'cyan' },
  { label: '1,250 People Benefited', x: 5, y: 60, delay: 1, color: 'emerald' },
  { label: '87/100 Impact Score', x: 88, y: 55, delay: 1.5, color: 'teal' },
  { label: 'Deployment In Progress', x: 40, y: 95, delay: 2, color: 'amber' },
];

const colorMap: Record<string, string> = {
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
};

export function HeroVisual() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          return (
            <line
              key={i}
              x1={n1.x}
              y1={n1.y}
              x2={n2.x}
              y2={n2.y}
              stroke="url(#lineGradient)"
              strokeWidth={0.3}
              strokeDasharray="2 1"
              className={mounted ? 'animate-fade-in' : 'opacity-0'}
              style={{ transitionDelay: `${i * 100}ms` }}
            />
          );
        })}

        {/* Animated pulses along lines */}
        {connections.map(([from, to], i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          return (
            <circle key={`pulse-${i}`} r="0.8" fill="#14b8a6" opacity="0.6">
              <animateMotion
                dur={`${3 + i * 0.3}s`}
                repeatCount="indefinite"
                path={`M${n1.x},${n1.y} L${n2.x},${n2.y}`}
              />
            </circle>
          );
        })}

        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={50} cy={50} r="25" fill="url(#centerGlow)" />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transitionDelay: `${i * 100}ms`,
          }}
        >
          {node.isCenter ? (
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-glow-navy sm:h-32 sm:w-32">
              <div className="text-center">
                <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20">
                  <svg className="h-4 w-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold leading-tight text-white sm:text-xs">{node.label}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-soft">
              <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span className="whitespace-nowrap text-[11px] font-semibold text-navy-700 sm:text-xs">{node.label}</span>
            </div>
          )}
        </div>
      ))}

      {/* Floating cards */}
      {floatingCards.map((card, i) => (
        <div
          key={i}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: `${card.x}%`,
            top: `${card.y}%`,
            transitionDelay: `${600 + i * 200}ms`,
            animation: 'float 6s ease-in-out infinite',
            animationDelay: `${card.delay}s`,
          }}
        >
          <div className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-bold shadow-soft sm:text-xs ${colorMap[card.color]}`}>
            {card.label}
          </div>
        </div>
      ))}
    </div>
  );
}
