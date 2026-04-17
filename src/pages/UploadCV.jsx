import React, { useState, useRef, useEffect, useCallback } from 'react';
import { uploadCVToS3 } from '../service/api';

const sampleHistory = [
  { id: 1, name: 'Dr. Julian Thorne', role: 'Systems Architect', time: '2 hours ago', match: 98.4, avatar: 'JT' },
  { id: 2, name: 'Elena Rodriguez', role: 'Product Designer', time: '5 hours ago', match: 92.1, avatar: 'ER' },
  { id: 3, name: 'Marcus Chen', role: 'Data Engineer', time: '1 day ago', match: 87.5, avatar: 'MC' },
];

const sampleResult = {
  candidateName: 'Dr. Julian Thorne',
  matchScore: 98.4,
  matchedJD: 'Principal Systems Architect',
  company: 'Tech-Infra Division',
  breakdown: [
    { criterion: 'Technical Skills', score: 96, status: 'Strong', icon: '✅' },
    { criterion: 'Cultural Alignment', score: 91, status: 'Strong', icon: '✅' },
    { criterion: 'Experience Level', score: 88, status: 'Good', icon: '✅' },
    { criterion: 'Leadership Potential', score: 74, status: 'Moderate', icon: '⚠️' },
  ],
  summary: 'Candidate demonstrates exceptional technical depth across distributed systems architecture, cloud-native paradigms, and enterprise-scale infrastructure design. Strong cultural alignment with collaborative, innovation-driven team environments. Leadership potential shows room for growth in cross-functional executive communication.',
};

const availableJobs = [
  { id: 1, title: 'Principal Systems Architect' },
  { id: 2, title: 'Lead Product Designer' },
  { id: 3, title: 'Senior Data Engineer' },
  { id: 4, title: 'DevOps Infrastructure Lead' },
  { id: 5, title: 'Head of AI Research' },
];

const AnimatedCounter = ({ value, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    const incrementTime = duration / (end * 10);
    let current = start;

    const timer = setInterval(() => {
      current += end / (duration / 20);
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(current * 10) / 10);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toFixed(1)}%</span>;
};

const UploadCV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJob, setSelectedJob] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSetFile(file);
  }, []);

  const validateAndSetFile = (file) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/json',
    ];
    if (validTypes.includes(file.type) || file.name.endsWith('.json')) {
      setSelectedFile(file);
      setShowResult(false);
    } else {
      alert('Please select a PDF, DOCX, or JSON file.');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!selectedJob) {
      alert('Please select a target role before initializing the analysis.');
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload CV file through CloudFront → S3 Bucket #2
      await uploadCVToS3(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      setUploading(false);
      setShowResult(true);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <p className="text-primary font-bold uppercase tracking-widest text-xs font-headline mb-1">Curation Hub</p>
        <h1 className="font-headline font-extrabold text-3xl text-on-surface">Digital Talent Orchestration</h1>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left — Main Content (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Upload Section */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-headline font-bold text-xl text-on-surface">Ingest Talent Data</h2>
              </div>
              <p className="text-on-surface-variant text-sm font-body mb-6">PDF, DOCX, or JSON supported</p>
              {/* Job Selection */}
              <div className="mb-6 relative">
                <label className="block text-sm font-headline font-bold text-on-surface mb-2">Target Role</label>
                <div className="relative w-full md:w-2/3">
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant/50 bg-white text-on-surface text-sm font-body focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <option value="" disabled>Select an available position...</option>
                    {availableJobs.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-primary bg-primary-fixed/20'
                    : 'border-outline-variant bg-surface-container-low/50 hover:border-primary/50 hover:bg-surface-container-low'
                }`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                    dragOver ? 'bg-primary text-white' : 'bg-primary-fixed text-primary'
                  }`}>
                    <span className="material-symbols-outlined text-3xl">upload_file</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-lg text-on-surface mb-1">
                      Drag & drop candidate dossiers
                    </p>
                    <p className="text-sm text-on-surface-variant font-body">
                      or browse files from your secure drive
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* File Chip */}
              {selectedFile && (
                <div className="mt-4 inline-flex items-center gap-2 bg-primary-fixed/40 text-primary px-4 py-2 rounded-xl text-sm font-body">
                  <span className="material-symbols-outlined text-lg">description</span>
                  {selectedFile.name}
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); setShowResult(false); }}
                    className="ml-1 hover:text-error transition-colors cursor-pointer bg-transparent border-none text-primary"
                    aria-label="Remove file"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              )}

              {/* Upload progress */}
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-on-surface-variant font-body">Analyzing...</span>
                    <span className="text-sm font-headline font-bold text-primary">{Math.min(Math.round(uploadProgress), 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-200"
                      style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {selectedFile && !uploading && !showResult && (
                <button
                  onClick={handleUpload}
                  className="btn-gradient flex items-center gap-3 px-6 py-3.5 rounded-xl font-headline font-bold text-sm mt-6"
                >
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                  Initialize Batch Analysis
                </button>
              )}
            </div>

            {/* Match Result Section */}
            {showResult && (
              <div className="bg-surface-container-lowest p-8 rounded-2xl animate-reveal">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">analytics</span>
                  <h2 className="font-headline font-bold text-xl text-on-surface">AI Match Report</h2>
                  <span className="text-on-surface-variant text-sm font-body ml-2">— {sampleResult.candidateName}</span>
                </div>

                {/* Score Display */}
                <div className="text-center py-8">
                  <p className="text-5xl font-headline font-black text-primary mb-2">
                    <AnimatedCounter value={sampleResult.matchScore} />
                  </p>
                  <p className="text-on-surface-variant text-sm font-body">
                    Matched to: <span className="font-semibold text-on-surface">{sampleResult.matchedJD}</span> · {sampleResult.company}
                  </p>
                </div>

                {/* Breakdown Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-outline-variant/30">
                        <th className="text-left py-3 px-4 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Criterion</th>
                        <th className="text-left py-3 px-4 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Score</th>
                        <th className="text-left py-3 px-4 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleResult.breakdown.map((row, i) => (
                        <tr key={i} className="border-b border-outline-variant/10">
                          <td className="py-3 px-4 text-sm font-body text-on-surface">{row.criterion}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${row.score >= 90 ? 'bg-primary' : row.score >= 80 ? 'bg-secondary' : 'bg-amber-500'}`}
                                  style={{ width: `${row.score}%` }}
                                />
                              </div>
                              <span className="text-sm font-headline font-bold text-on-surface">{row.score}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm font-body">
                            <span className={`inline-flex items-center gap-1 ${row.score >= 90 ? 'text-green-700' : row.score >= 80 ? 'text-primary' : 'text-amber-600'}`}>
                              {row.icon} {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI Summary */}
                <div className="mt-6 bg-surface-container-low rounded-2xl p-6">
                  <p className="text-xs font-headline font-bold text-primary uppercase tracking-wider mb-2">AI Narrative Summary</p>
                  <p className="text-sm text-on-surface-variant font-body leading-relaxed">{sampleResult.summary}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button
                    onClick={() => { setShowResult(false); setSelectedFile(null); }}
                    className="btn-outlined flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-semibold text-sm"
                  >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    Re-analyze
                  </button>
                  <button className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-xl font-headline font-bold text-sm">
                    <span className="material-symbols-outlined text-lg">download</span>
                    Download Report
                  </button>
                </div>
              </div>
            )}

            {/* Curation History */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden">
              <div className="px-8 py-6 border-b border-outline-variant/20">
                <h3 className="font-headline font-bold text-lg text-on-surface">Curation History</h3>
              </div>
              {sampleHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 px-8 py-4 border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-fixed to-secondary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{entry.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-semibold text-sm text-on-surface truncate">{entry.name}</p>
                    <p className="text-xs text-on-surface-variant font-body">{entry.role} · {entry.time}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-headline font-bold text-sm ${
                      entry.match >= 95 ? 'text-primary' : entry.match >= 90 ? 'text-secondary' : 'text-on-surface-variant'
                    }`}>
                      {entry.match}%
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-lg group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Active Intelligence Card */}
            <div className="glass-insight rounded-2xl p-6 border border-white/30">
              <h3 className="font-headline font-bold text-base text-on-surface mb-6">Active Intelligence</h3>

              {/* Deep Semantic Indexing */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-body text-on-surface">Deep Semantic Indexing</span>
                  <span className="text-sm font-headline font-bold text-primary">84%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{width: '84%'}} />
                </div>
                <p className="text-xs text-on-surface-variant italic font-body mt-1">Processing multi-dimensional embeddings</p>
              </div>

              {/* Skill Verification Relay */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-body text-on-surface">Skill Verification Relay</span>
                  <span className="material-symbols-outlined text-primary text-sm animate-pulse-bar">radio_button_checked</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-tertiary rounded-full animate-pulse-bar" style={{width: '67%'}} />
                </div>
                <p className="text-xs text-on-surface-variant italic font-body mt-1">Cross-referencing credential databases</p>
              </div>

              <div className="h-px bg-outline-variant/30 my-5" />

              {/* Curation Metrics */}
              <p className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider mb-4">Curation Metrics</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-lowest rounded-xl p-4 text-center">
                  <p className="font-headline font-black text-xl text-on-surface">1.4M</p>
                  <p className="text-xs text-on-surface-variant font-body mt-1">Tokens Indexed</p>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-4 text-center">
                  <p className="font-headline font-black text-xl text-on-surface">99.2%</p>
                  <p className="text-xs text-on-surface-variant font-body mt-1">Match Accuracy</p>
                </div>
              </div>
            </div>

            {/* Pro-tip Card */}
            <div className="relative bg-primary-container text-white rounded-2xl p-6 overflow-hidden">
              <span className="material-symbols-outlined absolute -top-4 -right-4 text-8xl opacity-10">auto_awesome</span>
              <div className="relative z-10">
                <p className="text-xs font-headline font-bold uppercase tracking-wider text-white/80 mb-3">
                  Intelligence Pro-Tip
                </p>
                <p className="text-sm font-body leading-relaxed text-white/90">
                  Upload structured JSON formats for 3× faster processing. Include metadata fields like
                  certifications and project histories for richer semantic analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCV;
