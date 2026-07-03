import React from 'react';

interface RiseLogoProps {
  className?: string;
  showText?: boolean;
  textColorClass?: string;
}

export function RiseLogo({ className = 'w-10 h-10', showText = false, textColorClass = 'text-gray-800' }: RiseLogoProps) {
  return (
    <div className="flex items-center gap-2.5 select-none group">
      <svg
        viewBox="0 0 100 100"
        className={`${className} transition-transform duration-300 group-hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Vibrant orange gradient matching the uploaded logo */}
          <linearGradient id="riseLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA024" />
            <stop offset="45%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#FF3D00" />
          </linearGradient>
          
          {/* Subtle drop shadow for the R inside */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#9E2E00" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Rounded square container with rx=24 for a smooth squirclish shape */}
        <rect width="100" height="100" rx="24" fill="url(#riseLogoGrad)" />

        {/* Stylized White 'R' and human element */}
        <g fill="white" filter="url(#logoShadow)">
          {/* Main Top Hook & Left Top bar */}
          <path d="M 21.5 27 L 63 27 C 67.5 27 71 30.5 71 35 C 71 38.5 68.5 41 64 42.5 L 36 42.5 L 36 51 L 27.5 51 L 27.5 27.5 Z" />
          
          {/* Lower left stem */}
          <rect x="27.5" y="51" width="8.5" height="27" />

          {/* Central circle (Person's head) */}
          <circle cx="47" cy="47" r="7.5" />

          {/* Dynamic rising wave/swoosh (The 'Reach/Inspire' wing) */}
          <path d="M 27.5 78 C 30 70 38 59 48 54 C 58 49 67.5 41 71 32 C 71 42 66 52 56 58 C 46 64 34 72 27.5 78 Z" />

          {/* Bottom right leg swoosh */}
          <path d="M 37.5 61 C 41 66 48.5 73 60 78 L 74.5 78 C 61 74 50.5 67.5 42 61 Z" />
        </g>

        {/* 4-pointed Sparkles / Stars */}
        <g fill="white">
          {/* Top Star (Largest) */}
          <path d="M 70 13 Q 70 21 78 21 Q 70 21 70 29 Q 70 21 62 21 Q 70 21 70 13 Z" />
          
          {/* Middle Right Star */}
          <path d="M 77 28 Q 77 33 82 33 Q 77 33 77 38 Q 77 33 72 33 Q 77 33 77 28 Z" />

          {/* Lower Right Star */}
          <path d="M 76.5 42 Q 76.5 46 80.5 46 Q 76.5 46 76.5 50 Q 76.5 46 72.5 46 Q 76.5 46 76.5 42 Z" />
        </g>
      </svg>

      {showText && (
        <span className={`font-sans font-extrabold text-xl tracking-tight ${textColorClass}`}>
          RISE
        </span>
      )}
    </div>
  );
}
