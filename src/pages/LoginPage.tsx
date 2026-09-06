import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { UserRole } from '@/types';

const roleDashboards: Record<UserRole, string> = {
  citizen: '/dashboard/citizen',
  student: '/dashboard/student',
  university: '/dashboard/university',
  industry: '/industry-funding',
  government: '/government',
};

export function LoginPage() {
  const navigate = useNavigate();
  const { setRole, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');

  const handleLogin = () => {
    setRole(selectedRole);
    showToast(`Logged in as ${selectedRole}`, 'success');
    navigate(roleDashboards[selectedRole]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 shadow-glow-navy">
            <Globe className="h-7 w-7 text-teal-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900">SolveSphere</h1>
          <p className="mt-1 text-sm text-gray-500">Every Problem Deserves a Solution.</p>
        </div>

        <div className="card p-8">
          <h2 className="mb-1 text-xl font-bold text-navy-900">Welcome Back</h2>
          <p className="mb-6 text-sm text-gray-500">Login to your SolveSphere account</p>

          <div className="space-y-4">
            <div>
              <label className="label-text">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input type="email" placeholder="you@example.com" className="input-field pl-10" defaultValue="demo@solvesphere.in" />
              </div>
            </div>
            <div>
              <label className="label-text">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input type="password" placeholder="••••••••" className="input-field pl-10" defaultValue="demo1234" />
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label className="label-text">Explore as (Demo Mode)</label>
              <div className="grid grid-cols-3 gap-2">
                {(['citizen', 'student', 'university', 'industry', 'government'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-colors ${
                      selectedRole === r ? 'border-teal-300 bg-teal-50 text-teal-700' : 'border-gray-200 text-navy-600 hover:bg-navy-50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleLogin} className="btn-primary w-full text-base">
              Login
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              New to SolveSphere?{' '}
              <button onClick={() => navigate('/post-problem')} className="font-semibold text-teal-600 hover:text-teal-700">
                Get Started
              </button>
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Demo Mode — No real authentication. All data is simulated.
        </p>
      </div>
    </div>
  );
}
