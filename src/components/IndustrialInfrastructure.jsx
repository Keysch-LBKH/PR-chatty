import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, MessageSquare, Users, ArrowRight, Play, X } from 'lucide-react';

const VIDEO_ID = 'g7l-EVG6S4Q';

export default function IndustrialInfrastructure() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-carbon text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-smokyTeal/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="z-10 py-6 px-8 border-b border-smokyTeal/20 flex items-center justify-between">
        <Link to="/" className="text-sm border border-smokyTeal/30 px-4 py-1.5 rounded-full text-smokyTeal hover:bg-smokyTeal hover:text-carbon transition-colors">
          &larr; Back to Solutions
        </Link>
      </header>

      <main className="flex-1 z-10 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full text-center">
        <h1 className="text-5xl font-light tracking-tight text-white mb-6">
          Industrial <span className="text-smokyTeal font-medium">Infrastructure</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16 leading-relaxed">
          We curate your complex industrial data specifically for community outreach. We assist your executive team in providing accurate, real-time answers during live town halls and public situations, allowing you to connect proactively with community members.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <Database className="w-8 h-8 text-smokyTeal mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Data Curation</h3>
            <p className="text-sm text-gray-400">We ingest and index your dense engineering diagrams and environmental filings into easily accessible public hubs.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <MessageSquare className="w-8 h-8 text-cyanGlow mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Live Situational Support</h3>
            <p className="text-sm text-gray-400">Equip your executives with instant document retrieval and simulated Q&A dashboards during high-stakes community meetings.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <Users className="w-8 h-8 text-smokyTeal mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Community Connection</h3>
            <p className="text-sm text-gray-400">Deploy custom API-driven conversational agents directly onto project sites to build public trust in real time.</p>
          </div>
        </div>

        {/* CTA Section — funnel: Watch Video → Quiz → Demo */}
        <div className="glass-morphism p-10 rounded-2xl border border-cyanGlow/40 bg-smokyTeal/5 w-full flex flex-col items-center gap-6">
          <h2 className="text-2xl font-medium text-white mb-0">See it before you decide.</h2>
          <p className="text-gray-400 -mt-2">Watch the 90-second overview, then take the fit quiz to unlock the live demo.</p>

          {/* Step 1 — Watch the Video (primary) */}
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 transform shadow-xl"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 40px rgba(0,229,204,0.4)' }}
          >
            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
              <Play className="w-4 h-4 fill-current" />
            </div>
            Watch the Video
          </button>

          {/* Step 2 — Quiz (secondary, leads to demo) */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-600 uppercase tracking-widest">Then</p>
            <Link
              to="/quiz"
              className="border border-cyanGlow/40 hover:border-cyanGlow text-cyanGlow hover:bg-cyanGlow/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 hover:scale-105 transform"
            >
              Is LBKH Liaison a fit for my project? <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-600 mt-1">7 questions · 3 min · unlocks the live demo</p>
          </div>
        </div>
      </main>

      {/* Portrait Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{ width: '100%', maxWidth: '400px', boxShadow: '0 0 80px rgba(0,229,204,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: 'rgba(0,229,204,0.08)', borderBottom: '1px solid rgba(0,229,204,0.2)' }}>
              <div className="flex items-center gap-2">
                <Play className="w-3 h-3 text-cyanGlow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">LBKH Liaison — 90 sec</span>
              </div>
              <button onClick={() => setVideoOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 9:16 embed */}
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="LBKH Liaison Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Post-video CTA → quiz */}
            <div className="px-4 py-3 flex flex-col items-center gap-2 shrink-0" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(0,229,204,0.15)' }}>
              <p className="text-xs text-gray-500 uppercase tracking-widest text-center">Ready? Take the fit quiz to unlock the demo.</p>
              <Link
                to="/quiz"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 transform"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 20px rgba(0,229,204,0.3)' }}
                onClick={() => setVideoOpen(false)}
              >
                Take the Fit Quiz <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
