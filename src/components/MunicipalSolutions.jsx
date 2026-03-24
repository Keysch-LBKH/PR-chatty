import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, BarChart3, Users, ArrowRight } from 'lucide-react';

export default function MunicipalSolutions() {
  return (
    <div className="min-h-screen bg-carbon text-gray-100 flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-smokyTeal/10 blur-[120px] rounded-full pointer-events-none" />

      <header className="z-10 py-6 px-8 border-b border-smokyTeal/20 flex items-center justify-between">
        <Link to="/" className="text-sm border border-smokyTeal/30 px-4 py-1.5 rounded-full text-smokyTeal hover:bg-smokyTeal hover:text-carbon transition-colors">
          &larr; Back to Solutions
        </Link>
      </header>

      <main className="flex-1 z-10 flex flex-col items-center justify-center p-8 max-w-5xl mx-auto w-full text-center">
        <h1 className="text-5xl font-light tracking-tight text-white mb-6">
          Municipal <span className="text-cyanGlow font-medium">Solutions</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
          Empowering city governments with transparent, real-time data integration. Bridge the gap between civil projects and public sentiment with our high-end command and control dashboards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full">
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <ShieldAlert className="w-8 h-8 text-cyanGlow mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Regulatory Tracking</h3>
            <p className="text-sm text-gray-400">Instantly pull zoning laws and DEQ filings using our advanced vector retrieval.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <BarChart3 className="w-8 h-8 text-smokyTeal mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Heatmap Analytics</h3>
            <p className="text-sm text-gray-400">Auto-categorize constituent concerns into visual heatmaps during live town halls.</p>
          </div>
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/30 text-left hover:border-cyanGlow/50 transition-colors">
            <Users className="w-8 h-8 text-burntOrange mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Constituent Trust</h3>
            <p className="text-sm text-gray-400">Provide direct public access to verified documents via embedded chat agents.</p>
          </div>
        </div>

        <div className="glass-morphism p-10 rounded-2xl border border-cyanGlow/40 bg-smokyTeal/5 w-full flex flex-col items-center">
          <h2 className="text-2xl font-medium text-white mb-2">Ready to see it in action?</h2>
          <p className="text-gray-400 mb-6">Explore the interactive Executive Command Dashboard prototype.</p>
          <Link to="/executive" className="bg-cyanGlow hover:bg-smokyTeal text-carbon font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 hover:scale-105 transform shadow-lg shadow-cyanGlow/20">
            Launch Live Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
