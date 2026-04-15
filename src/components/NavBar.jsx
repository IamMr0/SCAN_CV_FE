import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Role-based navigation:
  // Employee  → Overview, Job List, CV Upload, Matching
  // Admin/HR  → Overview, Job List, JD Upload, Matching
  const isAdmin = user?.role === 'admin';

  const navLinks = [
    { label: 'Overview', path: '/', icon: 'dashboard' },
    { label: 'Job List', path: '/jobs', icon: 'work' },
    // 3rd item differs by role
    isAdmin
      ? { label: 'JD Upload', path: '/jobs/upload', icon: 'upload_file' }
      : { label: 'CV Upload', path: '/cv', icon: 'cloud_upload' },
    { label: 'Matching', path: '/matching', icon: 'analytics' },
  ];

  return (
    <>
      {/* Desktop / Tablet Top Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-outline-variant/30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left — Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
            </div>
            <span className="font-headline font-black tracking-tighter text-on-surface text-lg hidden sm:block">
              The Intelligence Ledger
            </span>
          </Link>

          {/* Center — Nav Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-headline font-semibold transition-all no-underline ${
                    isActive
                      ? 'text-primary bg-primary-fixed/40'
                      : 'text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high/50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right — Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <button
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container-high transition-colors"
                  aria-label="Notifications"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                </button>
                <div className="relative group">
                  <button
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white font-headline font-bold text-sm cursor-pointer"
                    aria-label="User menu"
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </button>
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-lg border border-outline-variant/20 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-4 py-2 border-b border-outline-variant/20">
                      <p className="text-sm font-semibold text-on-surface">{user?.name || 'User'}</p>
                      <p className="text-xs text-on-surface-variant">{user?.email}</p>
                      <p className="text-xs text-primary font-semibold mt-1 capitalize">{user?.role || 'user'}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-container/30 transition-colors cursor-pointer bg-transparent border-none"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="btn-gradient px-5 py-2.5 rounded-xl font-headline font-semibold text-sm no-underline"
              >
                Sign In
              </Link>
            )}
            {/* Mobile hamburger */}
            <button
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-surface-container-high transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-on-surface">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-outline-variant/20 pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-headline font-semibold transition-all no-underline ${
                    isActive
                      ? 'text-primary bg-primary-fixed/40'
                      : 'text-on-surface/60 hover:text-on-surface hover:bg-surface-container-high/50'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-outline-variant/30 px-2 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-xs font-headline transition-all no-underline ${
                  isActive
                    ? 'text-primary bg-blue-50/50'
                    : 'text-on-surface/50'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
