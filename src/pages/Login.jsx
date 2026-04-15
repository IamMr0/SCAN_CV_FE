import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-primary-fixed rounded-full opacity-30 blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-tertiary-fixed rounded-full opacity-20 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-fixed rounded-full opacity-10 blur-[150px]" />

      <div className="relative z-10 w-full max-w-[1100px] grid md:grid-cols-2 rounded-3xl overflow-hidden whisper-shadow">
        {/* Left Panel */}
        <div className="relative bg-primary text-on-primary p-12 lg:p-16 flex flex-col justify-between overflow-hidden">
          {/* Abstract background overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay">
            <div className="absolute top-10 right-10 w-64 h-64 border border-white/20 rounded-full" />
            <div className="absolute bottom-20 left-[-30px] w-48 h-48 border border-white/10 rounded-full" />
            <div className="absolute top-1/2 right-[-20px] w-32 h-32 bg-white/5 rounded-full" />
          </div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
              </div>
              <span className="font-headline font-black tracking-tighter text-lg">The Intelligence Ledger</span>
            </div>

            {/* Headline */}
            <h1 className="font-headline font-extrabold text-4xl lg:text-5xl leading-tight mb-6">
              Redefining<br />
              Talent Intelligence.
            </h1>
            <p className="text-on-primary/70 text-base leading-relaxed max-w-sm font-body">
              Access the precision-engineered talent curation platform trusted by forward-thinking organizations worldwide.
            </p>
          </div>

          {/* Insight of the day */}
          <div className="relative z-10 mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-white/60 font-headline font-semibold mb-2">
              Insight of the Day
            </p>
            <p className="text-sm text-white/90 italic font-body leading-relaxed">
              "Organizations using AI-driven talent curation see a 3.2× improvement in hire quality metrics within the first quarter of adoption."
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-surface-container-lowest p-10 lg:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant text-sm mb-8 font-body">
              Sign in to access your talent intelligence dashboard.
            </p>

            {error && (
              <div className="bg-error-container/30 border border-error/20 text-on-error-container rounded-xl px-4 py-3 mb-6 text-sm font-body">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="login-email" className="block text-sm font-semibold text-on-surface mb-2 font-label">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-semibold text-on-surface font-label">
                  Password
                </label>
                <button className="text-xs text-primary hover:text-primary-container font-semibold font-label cursor-pointer bg-transparent border-none">
                  Forgot Password?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Remember */}
            <label className="flex items-center gap-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary/40 border-outline-variant"
              />
              <span className="text-sm text-on-surface-variant font-body">Remember this device for 30 days</span>
            </label>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full btn-gradient py-3.5 rounded-xl font-headline font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              )}
              {loading ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-outline-variant/40" />
              <span className="text-xs text-on-surface-variant font-label">New to the Ledger?</span>
              <div className="flex-1 h-px bg-outline-variant/40" />
            </div>

            {/* Register link */}
            <Link
              to="/register"
              className="block w-full text-center py-3.5 rounded-xl btn-outlined font-headline font-semibold text-sm no-underline"
            >
              Create Professional Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
