import React from 'react';
import { Link } from 'react-router-dom';

const Overview = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* ===================== HERO SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — 7 cols */}
          <div className="lg:col-span-7">
            <p className="text-tertiary font-bold uppercase tracking-widest text-sm font-headline mb-4">
              The Digital Curator
            </p>
            <h1 className="font-headline font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface leading-tight mb-6">
              Precision Talent<br />Curation.
            </h1>
            <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed max-w-xl font-body mb-10">
              Harness AI-driven intelligence to discover, evaluate, and secure exceptional professionals. 
              Our advanced semantic analysis engine transforms how organizations approach talent acquisition.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/cv"
                className="btn-gradient px-8 py-4 rounded-xl font-headline font-bold text-sm no-underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">analytics</span>
                Explore Matching
              </Link>
              <a
                href="#methodology"
                className="btn-outlined px-8 py-4 rounded-xl font-headline font-semibold text-sm no-underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">play_circle</span>
                How it Works
              </a>
            </div>
          </div>

          {/* Right — 5 cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square bg-gradient-to-br from-primary-fixed via-secondary-fixed to-tertiary-fixed">
              {/* Abstract visual pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-4 border-white/30 absolute top-[-20px] left-[-20px]" />
                  <div className="w-32 h-32 rounded-full bg-primary/20 absolute top-[40px] left-[40px]" />
                  <div className="w-64 h-64 rounded-full border-2 border-white/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-7xl" style={{fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48"}}>
                      psychology
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Glassmorphism overlay card */}
            <div className="absolute bottom-6 left-6 right-6 glass-insight rounded-2xl p-5 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                <span className="text-xs font-headline font-bold text-primary uppercase tracking-wider">AI Insight</span>
              </div>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                Deep semantic indexing processes 1.4M tokens per candidate profile for unprecedented match accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== METHODOLOGY SECTION ===================== */}
      <section id="methodology" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-primary font-bold uppercase tracking-widest text-xs font-headline mb-3">Our Process</p>
          <h2 className="font-headline font-extrabold text-3xl lg:text-4xl text-on-surface">
            The Curation Methodology
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 — Ingest */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl hover:bg-surface-container-high transition-all group cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-primary-fixed flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Ingest</h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-6">
              Upload CVs and job descriptions in PDF, DOCX, or structured JSON format. Our system indexes every data point.
            </p>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-1000 group-hover:w-full" style={{width: '33%'}} />
            </div>
          </div>

          {/* Card 2 — Analyze */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl hover:bg-surface-container-high transition-all group cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary text-3xl">psychology</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Analyze</h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-6">
              AI processes semantic meaning, skills taxonomy, cultural indicators, and experience depth through multi-layered analysis.
            </p>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full transition-all duration-1000 group-hover:w-full" style={{width: '66%'}} />
            </div>
          </div>

          {/* Card 3 — Match */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl hover:bg-surface-container-high transition-all group cursor-default">
            <div className="w-16 h-16 rounded-2xl bg-secondary-fixed flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl">hub</span>
            </div>
            <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Match</h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-6">
              Precision matching delivers ranked candidates with confidence scores, breakdown analysis, and actionable insights.
            </p>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-1000 group-hover:w-full" style={{width: '100%'}} />
            </div>
          </div>
        </div>
      </section>

      {/* ===================== METRICS SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-secondary-fixed via-primary-fixed to-tertiary-fixed relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary/30 text-[120px]" style={{fontVariationSettings: "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 48"}}>
                  person
                </span>
              </div>
            </div>
            {/* Glassmorphism badge */}
            <div className="absolute bottom-6 left-6 glass-insight rounded-2xl px-5 py-4 border border-white/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">verified</span>
              </div>
              <div>
                <p className="font-headline font-black text-2xl text-on-surface">98%</p>
                <p className="text-xs text-on-surface-variant font-body">Match Accuracy</p>
              </div>
            </div>
          </div>

          {/* Right — Stats (7 cols) */}
          <div className="lg:col-span-7">
            <p className="text-primary font-bold uppercase tracking-widest text-xs font-headline mb-3">Performance Metrics</p>
            <h2 className="font-headline font-extrabold text-3xl lg:text-4xl text-on-surface mb-4 leading-tight">
              Intelligence That<br />Delivers Results.
            </h2>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed max-w-lg mb-10">
              Our AI engine has analyzed over 2.4 million candidate profiles, consistently outperforming traditional recruitment metrics.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { value: '2.4M+', label: 'Profiles Analyzed', color: 'bg-primary' },
                { value: '98.4%', label: 'Match Accuracy', color: 'bg-tertiary' },
                { value: '3.2×', label: 'Hire Quality Improvement', color: 'bg-secondary' },
                { value: '< 2min', label: 'Average Analysis Time', color: 'bg-primary-container' },
              ].map((stat, i) => (
                <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl flex items-start gap-4">
                  <div className={`w-1 h-12 rounded-full ${stat.color}`} />
                  <div>
                    <p className="font-headline font-black text-2xl text-on-surface">{stat.value}</p>
                    <p className="text-xs text-on-surface-variant font-body mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA RAIL ===================== */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative bg-surface-container-lowest rounded-[48px] p-12 lg:p-20 text-center overflow-hidden">
          {/* Blurred blob decorations */}
          <div className="absolute top-[-60px] left-[-60px] w-[200px] h-[200px] bg-primary-fixed rounded-full opacity-40 blur-[80px]" />
          <div className="absolute bottom-[-60px] right-[-60px] w-[200px] h-[200px] bg-tertiary-fixed rounded-full opacity-30 blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary-fixed rounded-full opacity-10 blur-[100px]" />

          <div className="relative z-10">
            <h2 className="font-headline font-extrabold text-3xl lg:text-4xl text-on-surface mb-4">
              Ready to Transform Your Talent Strategy?
            </h2>
            <p className="text-on-surface-variant text-base font-body max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of organizations leveraging The Intelligence Ledger for precision talent curation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/register"
                className="btn-gradient px-8 py-4 rounded-xl font-headline font-bold text-sm no-underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">rocket_launch</span>
                Get Started
              </Link>
              <Link
                to="#"
                className="btn-outlined px-8 py-4 rounded-xl font-headline font-semibold text-sm no-underline flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">contact_support</span>
                Contact Consultant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
