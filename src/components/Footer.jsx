import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low py-12 px-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + App Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
            </div>
            <div>
              <h3 className="font-headline font-black tracking-tighter text-on-surface text-base m-0">
                The Intelligence Ledger
              </h3>
              <p className="text-xs text-on-surface-variant mt-0.5">Precision Talent Curation</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors font-body no-underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors font-body no-underline"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-sm text-on-surface-variant hover:text-primary transition-colors font-body no-underline"
            >
              Help Center
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-on-surface-variant font-body">
            © 2024 The Intelligence Ledger. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
