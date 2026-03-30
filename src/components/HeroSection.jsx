import React from 'react';
import { Link } from 'react-router-dom';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────
          DESKTOP: Everything on one full-viewport screen (md and above)
          MOBILE:  Hero only — logo, headline, tagline + pulsing scroll prompt
      ───────────────────────────────────────────────────────────────────── */}
      <div className="relative w-full h-screen overflow-hidden bg-carbon flex flex-col items-center justify-center px-6">
        {/* 3D background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <ThreeScene />
        </div>

        <div className="z-10 text-center flex flex-col items-center gap-4 w-full max-w-5xl">
          <img
            src="/logo.png"
            alt="LBKH Logo"
            className="w-28 h-28 md:w-36 md:h-36 drop-shadow-[0_0_20px_rgba(75,227,207,0.4)] transition-all duration-500 hover:scale-105 rounded-full"
          />
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white">
            LBKH <span className="text-smokyTeal font-semibold">Solutions</span>
          </h1>
          <p className="text-smokyTeal/80 max-w-xl mx-auto text-base md:text-lg font-light tracking-wider uppercase">
            Complex Problems. Practical Solutions.
          </p>

          {/* ── Navigation cards — visible on desktop only ── */}
          <div className="hidden md:flex flex-row gap-6 w-full mt-10">
            <a
              href="http://missoula.lbkhsolutions.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Local
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Targeted solutions and consulting for small businesses.
              </p>
            </a>

            <Link
              to="/municipal"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Municipal
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Compounding clarity through transparent data and community engagement.
              </p>
            </Link>

            <Link
              to="/industrial"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Industrial
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Core site metrics and live environmental monitoring.
              </p>
            </Link>
          </div>

          {/* ── Pulsing scroll prompt — mobile only ── */}
          <div className="mt-10 flex flex-col items-center gap-2 md:hidden">
            {/* Pulsing glow ring */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-10 w-10 rounded-full bg-smokyTeal/30 animate-ping" />
              <span className="relative inline-flex items-center justify-center h-10 w-10 rounded-full border border-smokyTeal/60 bg-carbon/80">
                <svg
                  className="w-5 h-5 text-smokyTeal animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
            <span className="text-smokyTeal/50 text-[10px] tracking-widest uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────
          MOBILE ONLY: Navigation cards on second screen
      ───────────────────────────────────────────────────────────────────── */}
      <div className="md:hidden relative w-full min-h-screen bg-carbon flex flex-col items-center justify-center px-6 py-16">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <ThreeScene />
        </div>

        <div className="z-10 w-full max-w-5xl flex flex-col gap-6">
          <p className="text-center text-smokyTeal/60 text-sm tracking-widest uppercase mb-2">
            Where do you want to go?
          </p>

          <div className="flex flex-col gap-6 w-full">
            <a
              href="http://missoula.lbkhsolutions.com"
              target="_blank"
              rel="noreferrer"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Local
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Targeted solutions and consulting for small businesses.
              </p>
            </a>

            <Link
              to="/municipal"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Municipal
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Compounding clarity through transparent data and community engagement.
              </p>
            </Link>

            <Link
              to="/industrial"
              className="flex-1 glass-morphism p-8 rounded-2xl hover:bg-smokyTeal/20 transition-all cursor-pointer group border border-smokyTeal/30 hover:border-cyanGlow/50"
            >
              <h2 className="text-2xl font-medium text-white group-hover:text-cyanGlow transition-colors">
                Industrial
              </h2>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Core site metrics and live environmental monitoring.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
