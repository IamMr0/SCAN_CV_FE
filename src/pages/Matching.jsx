import React, { useState, useMemo } from 'react';

const matchResults = [
  { candidate: 'Dr. Julian Thorne', role: 'Systems Architect', jd: 'Principal Systems Architect', score: 98.4, status: 'Excellent' },
  { candidate: 'Elena Rodriguez', role: 'Product Designer', jd: 'Lead Product Designer', score: 92.1, status: 'Strong' },
  { candidate: 'Marcus Chen', role: 'Data Engineer', jd: 'Senior Data Engineer', score: 87.5, status: 'Good' },
  { candidate: 'Sarah Kim', role: 'DevOps Engineer', jd: 'DevOps Infrastructure Lead', score: 81.2, status: 'Good' },
  { candidate: 'James Okafor', role: 'ML Researcher', jd: 'Head of AI Research', score: 76.8, status: 'Moderate' },
];

const Matching = () => {
  const [selectedJob, setSelectedJob] = useState('All Jobs');

  const filteredResults = useMemo(() => {
    let results = [...matchResults];
    if (selectedJob !== 'All Jobs') {
      results = results.filter(r => r.jd === selectedJob);
    }
    return results.sort((a, b) => b.score - a.score);
  }, [selectedJob]);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <p className="text-primary font-bold uppercase tracking-widest text-xs font-headline mb-1">Intelligence Engine</p>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">Matching Analytics</h1>
        <p className="text-on-surface-variant text-sm font-body mt-1">AI-driven candidate-to-role alignment dashboard</p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Matches', value: '142', icon: 'hub', color: 'text-primary', bg: 'bg-primary-fixed' },
            { label: 'Avg. Score', value: '87.2%', icon: 'analytics', color: 'text-secondary', bg: 'bg-secondary-fixed' },
            { label: 'High Matches', value: '38', icon: 'trending_up', color: 'text-green-700', bg: 'bg-green-100' },
            { label: 'Pending Review', value: '12', icon: 'pending', color: 'text-amber-700', bg: 'bg-amber-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <span className={`material-symbols-outlined ${stat.color} text-xl`}>{stat.icon}</span>
              </div>
              <p className="font-headline font-black text-2xl text-on-surface">{stat.value}</p>
              <p className="text-xs text-on-surface-variant font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Match Results Table */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
          <div className="px-8 py-6 border-b border-outline-variant/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="font-headline font-bold text-lg text-on-surface">Recent Match Results</h2>
              <span className="bg-primary-fixed text-primary text-xs font-headline font-bold px-3 py-1 rounded-full">
                {filteredResults.length} results
              </span>
            </div>
            <div>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="px-4 py-2 bg-white rounded-xl border border-outline-variant/50 text-on-surface text-sm font-body outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
              >
                {['All Jobs', ...Array.from(new Set(matchResults.map(r => r.jd)))].map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-3 bg-surface-container-low/50 border-b border-outline-variant/10">
            <div className="col-span-3 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Candidate</div>
            <div className="col-span-3 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Matched JD</div>
            <div className="col-span-3 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Score</div>
            <div className="col-span-2 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Status</div>
            <div className="col-span-1"></div>
          </div>

          {/* Rows */}
          {filteredResults.map((result, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 items-center px-8 py-5 hover:bg-surface-container-high/50 transition-all cursor-pointer group ${
                i !== filteredResults.length - 1 ? 'border-b border-outline-variant/10' : ''
              }`}
            >
              {/* Candidate */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {result.candidate.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-headline font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">{result.candidate}</p>
                  <p className="text-xs text-on-surface-variant font-body">{result.role}</p>
                </div>
              </div>

              {/* Matched JD */}
              <div className="md:col-span-3">
                <p className="text-sm font-body text-on-surface">{result.jd}</p>
              </div>

              {/* Score */}
              <div className="md:col-span-3 flex items-center gap-3">
                <div className="w-20 h-2 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      result.score >= 90 ? 'bg-primary' : result.score >= 80 ? 'bg-secondary' : 'bg-amber-500'
                    }`}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <span className="font-headline font-bold text-sm text-on-surface">{result.score}%</span>
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <span className={`text-xs font-headline font-bold px-3 py-1.5 rounded-full ${
                  result.score >= 90
                    ? 'bg-green-100 text-green-700'
                    : result.score >= 80
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {result.status}
                </span>
              </div>

              {/* Chevron */}
              <div className="md:col-span-1 flex justify-end">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matching;
