import React, { useState } from 'react';

const allJDs = [
  {
    id: 1,
    title: 'Principal Systems Architect',
    location: 'Remote · Tech-Infra',
    icon: 'code',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    confidence: 89,
    candidates: 14,
  },
  {
    id: 2,
    title: 'Lead Product Designer',
    location: 'New York · UX Studio',
    icon: 'palette',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
    status: 'Evaluating',
    statusColor: 'bg-gray-100 text-gray-600',
    confidence: 72,
    candidates: 8,
  },
  {
    id: 3,
    title: 'VP of Global Fintech',
    location: 'London · Finance Core',
    icon: 'payments',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-secondary',
    status: 'Urgent',
    statusColor: 'bg-amber-100 text-amber-700',
    confidence: 94,
    candidates: 22,
  },
  {
    id: 4,
    title: 'Senior Data Engineer',
    location: 'Berlin · Data Platform',
    icon: 'storage',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    confidence: 85,
    candidates: 11,
  },
  {
    id: 5,
    title: 'Head of AI Research',
    location: 'San Francisco · AI Lab',
    icon: 'psychology',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    confidence: 91,
    candidates: 19,
  },
  {
    id: 6,
    title: 'DevOps Infrastructure Lead',
    location: 'Remote · Cloud Ops',
    icon: 'cloud',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-secondary',
    status: 'Archived',
    statusColor: 'bg-gray-100 text-gray-500',
    confidence: 68,
    candidates: 6,
  },
];

const statusFilters = ['All', 'Active', 'Evaluating', 'Urgent', 'Archived'];

const JobList = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = allJDs.filter((jd) => {
    const matchesSearch = jd.title.toLowerCase().includes(search.toLowerCase()) ||
                          jd.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'All' || jd.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="font-headline font-extrabold text-3xl text-on-surface">Active Campaigns</h1>
            <p className="text-on-surface-variant text-sm font-body mt-1">
              {filtered.length} campaign{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search campaigns..."
                className="pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all w-64"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-headline font-bold transition-all cursor-pointer border-none ${
                    activeFilter === filter
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">search_off</span>
              <p className="font-headline font-bold text-lg text-on-surface mb-2">No campaigns found</p>
              <p className="text-sm text-on-surface-variant font-body">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            filtered.map((jd, index) => (
              <div
                key={jd.id}
                className={`flex items-center gap-4 px-6 lg:px-8 py-5 hover:bg-surface-container-high/50 transition-all cursor-pointer group ${
                  index !== filtered.length - 1 ? 'border-b border-outline-variant/10' : ''
                }`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl ${jd.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${jd.iconColor} text-2xl`}>{jd.icon}</span>
                </div>

                {/* Title & Location */}
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors truncate">
                    {jd.title}
                  </p>
                  <p className="text-sm text-on-surface-variant font-body truncate">{jd.location}</p>
                </div>

                {/* Status badge (hidden on smallest screens) */}
                <span className={`hidden sm:inline-flex text-xs font-headline font-bold px-3 py-1.5 rounded-full flex-shrink-0 ${jd.statusColor}`}>
                  {jd.status}
                </span>

                {/* Candidate count */}
                <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">group</span>
                  <span className="text-sm font-body text-on-surface-variant">{jd.candidates}</span>
                </div>

                {/* AI Confidence */}
                <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                  <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${jd.confidence >= 90 ? 'bg-primary' : jd.confidence >= 80 ? 'bg-secondary' : 'bg-amber-500'}`}
                      style={{ width: `${jd.confidence}%` }}
                    />
                  </div>
                  <span className="font-headline font-bold text-sm text-on-surface w-10 text-right">{jd.confidence}%</span>
                </div>

                {/* Chevron */}
                <span className="material-symbols-outlined text-on-surface-variant text-xl group-hover:text-primary transition-colors flex-shrink-0">
                  chevron_right
                </span>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filtered.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="btn-outlined px-8 py-3 rounded-xl font-headline font-semibold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">expand_more</span>
              Load More Campaigns
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
