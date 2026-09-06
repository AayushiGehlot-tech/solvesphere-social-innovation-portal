import { useEffect, useState } from 'react';

interface MatchScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  delay?: number;
}

export function MatchScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label = 'MATCH',
  delay = 0,
}: MatchScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = Date.now();
      const duration = 1500;
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setAnimatedScore(score * easeOut);
        if (progress < 1) requestAnimationFrame(animate);
        else setAnimatedScore(score);
      };
      animate();
    }, delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  const getColor = (s: number) => {
    if (s >= 90) return '#059669';
    if (s >= 80) return '#0891b2';
    if (s >= 70) return '#d97706';
    return '#dc2626';
  };

  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {Math.round(animatedScore)}%
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{label}</span>
      </div>
    </div>
  );
}
