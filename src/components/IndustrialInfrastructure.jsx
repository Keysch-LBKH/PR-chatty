import React from 'react';
import { Link } from 'react-router-dom';
import { Database, MessageSquare, Users, ArrowRight } from 'lucide-react';

export default function IndustrialInfrastructure() {
  return (
    <div className="min-h-screen bg-carbon text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-burntOrange/5 blur-[120px] rounded-full pointer-events-none" />

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
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-burntOrange/30 transition-colors">
            <Database className="w-8 h-8 text-burntOrange mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Data Curation</h3>
            <p className="text-sm text-gray-400">We ingest and index your dense engineering diagrams and environmental filings into easily accessible public hubs.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-burntOrange/30 transition-colors">
            <MessageSquare className="w-8 h-8 text-cyanGlow mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Live Situational Support</h3>
            <p className="text-sm text-gray-400">Equip your executives with instant document retrieval and simulated Q&A dashboards during high-stakes community meetings.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-burntOrange/30 transition-colors">
            <Users className="w-8 h-8 text-smokyTeal mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Community Connection</h3>
            <p className="text-sm text-gray-400">Deploy custom API-driven conversational agents directly onto project sites to build public trust in real time.</p>
          </div>
        </div>

        <div className="glass-morphism p-10 rounded-2xl border border-burntOrange/40 bg-burntOrange/5 w-full flex flex-col items-center">
          <h2 className="text-2xl font-medium text-white mb-2">Interact with the Liaison</h2>
          <p className="text-gray-400 mb-6">See how private documentation translates into community outreach in our Prototype.</p>
          <Link to="/liaison" className="bg-burntOrange hover:bg-[#ff991a] text-carbon font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 hover:scale-105 transform shadow-lg shadow-burntOrange/20">
            Launch Liaison Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
