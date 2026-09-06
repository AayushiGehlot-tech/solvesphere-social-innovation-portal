import { Link } from 'react-router-dom';
import { Target, Users, Brain, BarChart3, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/Shared';

export function AboutPage() {
  return (
    <div className="section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="About SolveSphere"
          title="A digital marketplace for societal innovation"
          subtitle="SolveSphere connects citizens, universities, startups, industries, and government to turn real community challenges into deployed, measured solutions."
        />

        <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600">
          <p>
            Traditional complaint portals store problems in databases and hope someone solves them.
            SolveSphere does something fundamentally different — it uses AI to understand each problem,
            find the right experts, and guide the solution from idea to deployment to measurable impact.
          </p>
          <p>
            Built for the <strong>Smart India Hackathon 2026 — Problem Statement 43</strong>, SolveSphere
            is a prototype of what a national-scale social innovation platform could look like. Every
            interaction in this demo uses realistic mock data designed to showcase the complete journey
            from problem submission to impact measurement.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Brain, title: 'AI Problem Intelligence', description: 'AI understands, classifies, and estimates priority for every submitted challenge.' },
            { icon: Users, title: 'Smart Matching', description: 'AI finds the best universities, startups, and teams to solve each problem.' },
            { icon: BarChart3, title: 'Impact Measurement', description: 'We track whether lives actually improved — not just whether a project was completed.' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="card p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl bg-navy-950 p-8 text-center lg:p-12">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-teal-400" />
          <h3 className="text-2xl font-bold text-white">Every Problem Deserves a Solution.</h3>
          <p className="mx-auto mt-3 max-w-lg text-navy-300">
            This is a prototype for SIH 2026. All data is simulated for demonstration purposes.
          </p>
          <Link to="/post-problem" className="btn-accent mt-6">
            Try the Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
