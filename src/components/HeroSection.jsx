import React from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-carbon flex flex-col items-center justify-center p-6">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-40">
         <ThreeScene />
      </div>
      
      <div className="z-10 text-center mb-10 flex flex-col items-center mt-[-40px]">
        <img src="/logo.png" alt="LBKH Logo" className="w-28 h-28 mb-6 drop-shadow-[0_0_20px_rgba(75,227,207,0.4)] transition-all duration-500 hover:scale-105 rounded-full" />
        <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-4">
          LBKH <span className="text-smokyTeal font-semibold">Solutions</span>
        </h1>
        <p className="text-smokyTeal/80 max-w-xl mx-auto text-lg font-light tracking-wider uppercase">
          Complex Problems. Practical Solutions.
        </p>
      </div>

      <div className="z-10 flex flex-col gap-6 w-full max-w-5xl">
        {/* Top 3 Flex Row Cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <a href="http://missoula.lbkhsolutions.com" target="_blank" rel="noreferrer" className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
            <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Local</h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">Targeted solutions and consulting for small businesses.</p>
          </a>
          <Link to="/municipal" className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
            <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Municipal</h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">Marketing integration for regulatory tracking systems.</p>
          </Link>
          <Link to="/industrial" className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50">
            <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">Industrial</h2>
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">Core site metrics and live environmental monitoring.</p>
          </Link>
        </div>

        {/* Bottom Span Card for Pilot Demo */}
        <Link to="/liaison" className="w-full glass-morphism px-6 py-5 sm:px-8 sm:py-6 rounded-2xl hover:bg-smokyTeal/10 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
          <div className="text-center sm:text-left">
             <h2 className="text-xl font-medium text-white group-hover:text-cyanGlow transition-colors">Bonner Mill Pilot Showcase</h2>
             <p className="text-gray-400 mt-1 text-sm leading-relaxed">Interactive AI Liaison demonstrating public data integration and deployment.</p>
          </div>
          <button className="whitespace-nowrap px-8 py-2.5 bg-smokyTeal text-carbon font-semibold tracking-wide rounded-lg group-hover:bg-cyanGlow group-hover:scale-105 transition-all shadow-lg border border-transparent">
            Launch Demo
          </button>
        </Link>
      </div>
    </div>
  );
}
