import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms of Service.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await register({ name: fullName, email, password });
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-primary-fixed rounded-full opacity-20 blur-[120px]" />
      <div className="absolute bottom-[-150px] left-[-100px] w-[400px] h-[400px] bg-secondary-fixed rounded-full opacity-20 blur-[100px]" />

      <div className="relative z-10 w-full max-w-[1100px] grid md:grid-cols-2 rounded-3xl overflow-hidden whisper-shadow">
        {/* Left Panel */}
        <div className="relative bg-surface-container-low p-12 lg:p-16 flex flex-col justify-center overflow-hidden">
          {/* Abstract shapes */}
          <div className="absolute top-10 right-10 w-48 h-48 border border-primary/10 rounded-full" />
          <div className="absolute bottom-10 left-[-20px] w-32 h-32 border border-tertiary/10 rounded-full" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-fixed/60 text-primary px-4 py-1.5 rounded-full mb-8">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span className="text-xs font-headline font-bold uppercase tracking-wider">Institutional Access</span>
            </div>

            <h1 className="font-headline font-extrabold text-3xl lg:text-4xl text-on-surface leading-tight mb-6">
              Begin Your<br />
              <span className="text-primary">Intelligence Journey.</span>
            </h1>

            <p className="text-on-surface-variant text-sm leading-relaxed max-w-md font-body mb-10">
              Join a network of elite institutions leveraging AI-driven talent curation to discover, evaluate, and secure
              the world's most exceptional professionals.
            </p>

            {/* Glassmorphism insight card */}
            <div className="glass-insight rounded-2xl p-6 border border-white/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                <span className="text-xs font-headline font-bold text-primary uppercase tracking-wider">Digital Curator Insight</span>
              </div>
              <p className="text-sm text-on-surface-variant italic font-body leading-relaxed">
                "Advanced semantic analysis enables 94% more accurate candidate-role alignment compared to traditional keyword matching."
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-background p-10 lg:p-16 xl:p-20 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="font-headline font-bold text-2xl text-on-surface mb-2">Initialize Credentials</h2>
            <p className="text-on-surface-variant text-sm mb-8 font-body">
              Create your secure access to The Intelligence Ledger platform.
            </p>

            {error && (
              <div className="bg-error-container/30 border border-error/20 text-on-error-container rounded-xl px-4 py-3 mb-6 text-sm font-body">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div className="mb-5">
              <label htmlFor="register-name" className="block text-sm font-semibold text-on-surface mb-2 font-label">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Dr. Jane Smith"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="register-email" className="block text-sm font-semibold text-on-surface mb-2 font-label">
                Email Address
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@institution.edu"
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label htmlFor="register-password" className="block text-sm font-semibold text-on-surface mb-2 font-label">
                  Password
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="register-confirm" className="block text-sm font-semibold text-on-surface mb-2 font-label">
                  Confirm Password
                </label>
                <input
                  id="register-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-primary focus:ring-primary/40 border-outline-variant"
              />
              <span className="text-sm text-on-surface-variant font-body leading-relaxed">
                I accept the{' '}
                <Link to="#" className="text-primary font-semibold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="#" className="text-primary font-semibold hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full btn-gradient py-3.5 rounded-xl font-headline font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
              )}
              {loading ? 'Creating Account...' : 'Register'}
            </button>

            {/* Sign in link */}
            <p className="text-center mt-8 text-sm text-on-surface-variant font-body">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
