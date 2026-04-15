import React, { useState } from 'react';

const sampleJDs = [
  {
    id: 1,
    title: 'Principal Systems Architect',
    location: 'Remote · Tech-Infra',
    icon: 'code',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    status: 'High Match',
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
];

const UploadJD = () => {
  const [jdText, setJdText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [jdTab, setJdTab] = useState('active');
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    if (!jdText || !jobTitle || !workLocation || !department) return;
    setProcessing(true);
    // Simulate processing
    setTimeout(() => setProcessing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-3xl text-on-surface">Job Descriptions</h1>
            <p className="text-on-surface-variant text-sm font-body mt-1">Manage and process job description campaigns</p>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Upload Panel (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-low rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline font-bold text-xl text-on-surface">Upload Job Description</h2>
                <span className="bg-primary-fixed text-primary text-xs font-headline font-bold px-3 py-1 rounded-full">
                  Editor v2.4
                </span>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-headline font-bold text-on-surface mb-2">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Lead Product Designer"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-headline font-bold text-on-surface mb-2">Work Location</label>
                  <input
                    type="text"
                    value={workLocation}
                    onChange={(e) => setWorkLocation(e.target.value)}
                    placeholder="e.g. New York, Remote"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-headline font-bold text-on-surface mb-2">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. UX Studio"
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              {/* Textarea */}
              <label className="block text-sm font-headline font-bold text-on-surface mb-2">Job Description</label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the full job description here..."
                className="w-full h-64 px-5 py-4 rounded-2xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm font-body resize-none focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all leading-relaxed"
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleProcess}
                  disabled={processing || !jdText || !jobTitle || !workLocation || !department}
                  className="btn-gradient flex items-center gap-3 px-6 py-3.5 rounded-xl font-headline font-bold text-sm disabled:opacity-50 ml-auto"
                >
                  {processing ? (
                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                  ) : (
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                  )}
                  {processing ? 'Processing...' : 'Process Ledger'}
                </button>
              </div>
            </div>
          </div>

          {/* Right — Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Configuration Card */}
            <div className="bg-white rounded-3xl p-8">
              <h3 className="font-headline font-bold text-base text-on-surface mb-6">Configuration</h3>

              {/* Server notifications toggle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-body text-on-surface">Server Notifications</span>
                <button
                  onClick={() => setNotificationsOn(!notificationsOn)}
                  className={`relative w-12 h-6 rounded-full transition-all cursor-pointer border-none ${
                    notificationsOn ? 'bg-primary' : 'bg-outline-variant'
                  }`}
                  aria-label="Toggle notifications"
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      notificationsOn ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* System load */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-body text-on-surface-variant">System Load</span>
                  <span className="text-sm font-headline font-bold text-on-surface">42%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{width: '42%'}} />
                </div>
                <p className="text-xs text-on-surface-variant mt-2">Active utilization</p>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="glass-insight rounded-3xl p-8 border border-white/30">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                <span className="text-xs font-headline font-bold text-primary uppercase tracking-wider">AI Insight</span>
              </div>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                <span className="text-primary font-bold">Pro tip:</span> Including specific technology stacks and years of experience in your JD improves matching accuracy by up to 34%.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== MANAGE JDs SECTION ===================== */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <h2 className="font-headline font-bold text-xl text-on-surface">Manage JDs</h2>
              <span className="bg-primary-fixed text-primary text-xs font-headline font-bold px-3 py-1 rounded-full">
                {sampleJDs.length} Active
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setJdTab('active')}
                className={`px-4 py-2 rounded-xl text-sm font-headline font-semibold transition-all cursor-pointer border-none ${
                  jdTab === 'active'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setJdTab('archived')}
                className={`px-4 py-2 rounded-xl text-sm font-headline font-semibold transition-all cursor-pointer border-none ${
                  jdTab === 'archived'
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Archived
              </button>
              <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer border-none" aria-label="Filter">
                <span className="material-symbols-outlined text-on-surface-variant">filter_list</span>
              </button>
            </div>
          </div>

          {/* JD Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleJDs.map((jd) => (
              <div
                key={jd.id}
                className="bg-surface-container-lowest p-6 rounded-3xl hover:bg-surface-container-high transition-all cursor-pointer group"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${jd.iconBg} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${jd.iconColor} text-2xl`}>{jd.icon}</span>
                  </div>
                  <span className={`text-xs font-headline font-bold px-3 py-1 rounded-full ${jd.statusColor}`}>
                    {jd.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline font-bold text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {jd.title}
                </h3>
                <p className="text-sm text-on-surface-variant font-body mb-5">{jd.location}</p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between">
                  {/* Candidate avatars */}
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(jd.candidates, 4))].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed border-2 border-white flex items-center justify-center"
                      >
                        <span className="text-xs font-bold text-primary">{String.fromCharCode(65 + i)}</span>
                      </div>
                    ))}
                    {jd.candidates > 4 && (
                      <div className="w-8 h-8 rounded-full bg-surface-container border-2 border-white flex items-center justify-center">
                        <span className="text-xs font-bold text-on-surface-variant">+{jd.candidates - 4}</span>
                      </div>
                    )}
                  </div>
                  {/* Confidence */}
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-lg">trending_up</span>
                    <span className="font-headline font-bold text-sm text-on-surface">{jd.confidence}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadJD;
