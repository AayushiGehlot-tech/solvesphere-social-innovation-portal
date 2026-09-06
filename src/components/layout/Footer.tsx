import { Link } from 'react-router-dom';
import { Globe, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-900">
                <Globe className="h-5 w-5 text-teal-400" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-white">SolveSphere</span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-teal-400">
                  Social Innovation Platform
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-300">
              Every Problem Deserves a Solution. Connecting citizens, universities, startups, and industry to solve real societal challenges.
            </p>
            <div className="mt-4 flex gap-3">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-800 text-navy-300 transition-colors hover:bg-navy-700 hover:text-teal-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Discover Problems', to: '/problems' },
                { label: 'Solution Providers', to: '/providers' },
                { label: 'Post a Problem', to: '/post-problem' },
                { label: 'How It Works', to: '/how-it-works' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-navy-300 transition-colors hover:text-teal-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Dashboards</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Citizen', to: '/dashboard/citizen' },
                { label: 'Student', to: '/dashboard/student' },
                { label: 'University', to: '/dashboard/university' },
                { label: 'Government', to: '/government' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-navy-300 transition-colors hover:text-teal-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Impact</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Impact Dashboard', to: '/impact' },
                { label: 'Industry & Funding', to: '/industry-funding' },
                { label: 'About', to: '/about' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-navy-300 transition-colors hover:text-teal-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-6 sm:flex-row">
          <p className="text-xs text-navy-400">
            © 2026 SolveSphere — Built for Smart India Hackathon 2026 · Problem Statement 43
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-400">
            <span>Demo Mode — All data is simulated</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
