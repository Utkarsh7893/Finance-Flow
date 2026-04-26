import React from 'react';
import bgImage from '../assets/hero_bg.png';

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" style={{ touchAction: 'none' }}>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0b10]/60 via-transparent to-[#0a0b10]/90" />
    </div>
  );
}
