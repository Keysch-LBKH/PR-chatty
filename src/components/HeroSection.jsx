import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KnowledgeGraph3D from './KnowledgeGraph3D';

export default function HeroSection() {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — full viewport, 3D knowledge graph background
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-screen overflow-hidden bg-[#080C14]">

        {/* ── 3D Knowledge Graph (full bleed) ── */}
        <div className="absolute inset-0 z-0">
          <KnowledgeGraph3D onHoverNode={setHoveredNode} />
        </div>

        {/* ── Gradient vignette so text stays readable ── */}
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(8,12,20,0.55) 100%)',
          }}
        />

        {/* ── Bottom gradient for card bleed ── */}
        <div className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #080C14)' }}
        />

        {/* ── Hover node info pill ── */}
        {hoveredNode && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="bg-[rgba(8,12,20,0.88)] border border-[#4BE3CF]/30 rounded-full px-5 py-2 flex items-center gap-3 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#4BE3CF] shadow-[0_0_8px_#4BE3CF]" />
              <span className="text-white/80 text-sm font-light tracking-wide">
                {hoveredNode.label}
              </span>
              <span className="text-[#4BE3CF]/60 text-xs uppercase tracking-widest">
                {hoveredNode.type}
              </span>
            </div>
          </div>
        )}

        {/* ── Central overlay content ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-none">
          <div className="text-center flex flex-col items-center gap-3 w-full max-w-3xl">

            {/* Logo */}
            <img
              src="/logo.png"
              alt="LBKH Logo"
              className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_24px_rgba(75,227,207,0.5)] rounded-full mb-2"
            />

            {/* Eyebrow */}
            <p className="text-[#4BE3CF]/60 text-xs tracking-[0.25em] uppercase font-light">
              Community · Municipal · Industrial
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-tight">
              The information gap{' '}
              <span className="text-[#4BE3CF] font-semibold">is the fight.</span>
            </h1>

            {/* Sub */}
            <p className="text-white/50 max-w-xl text-base md:text-lg font-light leading-relaxed mt-1">
              LBKH Liaison turns complex project documents into instant, cited answers —
              for the public, for live events, and for the executives who need to respond.
            </p>

            {/* Hint */}
            <p className="text-[#4BE3CF]/35 text-xs tracking-widest uppercase mt-4 animate-pulse">
              Hover the graph to explore
            </p>
          </div>
        </div>

        {/* ── Navigation cards — desktop, pinned to bottom ── */}
        <div className="hidden md:flex absolute bottom-8 left-0 right-0 z-30 px-8 justify-center gap-5 pointer-events-auto">
          <a
            href="http://missoula.lbkhsolutions.com"
            target="_blank"
            rel="noreferrer"
            className="flex-1 max-w-xs group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(8,12,20,0.70)] hover:bg-[rgba(75,227,207,0.08)] backdrop-blur-md p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#4BE3CF] shadow-[0_0_6px_#4BE3CF]" />
              <h2 className="text-lg font-medium text-white group-hover:text-[#4BE3CF] transition-colors">
                Local
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Targeted solutions and consulting for small businesses.
            </p>
          </a>

          <Link
            to="/municipal"
            className="flex-1 max-w-xs group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(8,12,20,0.70)] hover:bg-[rgba(75,227,207,0.08)] backdrop-blur-md p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-[0_0_6px_#00D4FF]" />
              <h2 className="text-lg font-medium text-white group-hover:text-[#4BE3CF] transition-colors">
                Municipal
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Compounding clarity through transparent data and community engagement.
            </p>
          </Link>

          <Link
            to="/industrial"
            className="flex-1 max-w-xs group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(8,12,20,0.70)] hover:bg-[rgba(75,227,207,0.08)] backdrop-blur-md p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7C6FFF] shadow-[0_0_6px_#7C6FFF]" />
              <h2 className="text-lg font-medium text-white group-hover:text-[#4BE3CF] transition-colors">
                Industrial
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Core site metrics and live environmental monitoring.
            </p>
          </Link>
        </div>

        {/* ── Scroll prompt — mobile only ── */}
        <div className="md:hidden absolute bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-2 pointer-events-none">
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-10 w-10 rounded-full bg-[#4BE3CF]/20 animate-ping" />
            <span className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-[#4BE3CF]/50 bg-[#080C14]/80">
              <svg className="w-5 h-5 text-[#4BE3CF] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </span>
          <span className="text-[#4BE3CF]/40 text-[10px] tracking-widest uppercase">Scroll</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          MOBILE ONLY — Navigation cards on second screen
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden relative w-full min-h-screen bg-[#080C14] flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-md flex flex-col gap-5">
          <p className="text-center text-[#4BE3CF]/50 text-xs tracking-widest uppercase mb-2">
            Where do you want to go?
          </p>

          <a
            href="http://missoula.lbkhsolutions.com"
            target="_blank"
            rel="noreferrer"
            className="group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(75,227,207,0.04)] hover:bg-[rgba(75,227,207,0.10)] p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#4BE3CF]" />
              <h2 className="text-xl font-medium text-white">Local</h2>
            </div>
            <p className="text-white/40 text-sm">Targeted solutions for small businesses.</p>
          </a>

          <Link
            to="/municipal"
            className="group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(75,227,207,0.04)] hover:bg-[rgba(75,227,207,0.10)] p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
              <h2 className="text-xl font-medium text-white">Municipal</h2>
            </div>
            <p className="text-white/40 text-sm">Transparent data and community engagement.</p>
          </Link>

          <Link
            to="/industrial"
            className="group cursor-pointer rounded-2xl border border-[#4BE3CF]/20 hover:border-[#4BE3CF]/60 bg-[rgba(75,227,207,0.04)] hover:bg-[rgba(75,227,207,0.10)] p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7C6FFF]" />
              <h2 className="text-xl font-medium text-white">Industrial</h2>
            </div>
            <p className="text-white/40 text-sm">Core site metrics and environmental monitoring.</p>
          </Link>
        </div>
      </div>
    </>
  );
}
