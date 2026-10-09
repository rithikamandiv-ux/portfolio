'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DitherVeil = dynamic(() => import('./DitherVeil'), { ssr: false });

export default function HeroAvatar() {
  const [showEffect, setShowEffect] = useState(false);
  const [effectOpacity, setEffectOpacity] = useState(0);

  useEffect(() => {
    let hasWebGL2 = false;
    try {
      hasWebGL2 = !!document.createElement('canvas').getContext('webgl2');
    } catch {
      // Ignore errors if context creation fails
    }
    
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    
    if (hasWebGL2 && !prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowEffect(true);
      
      // Trigger the fade-in on the next frame so the element mounts with opacity-0 first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEffectOpacity(1);
        });
      });
    }
  }, []);

  return (
    <>
      <img
        src="/profile.jpg"
        alt="Rithika Mandiv"
        className="absolute inset-0 h-full w-full object-cover"
      />
      
      {showEffect && (
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-opacity"
          style={{ opacity: effectOpacity, transitionDuration: '400ms', transitionTimingFunction: 'ease-in-out' }}
        >
          <DitherVeil
            src="/profile.jpg"
            fit="cover"
            pattern="floyd"
            pixelSize={2}
            inkColor="#0b0b12"
            paperColor="#f2e9e4"
            brightness={0.3}
            contrast={1.3}
            revealRadius={135}
            softness={0.6}
            linger={1}
            clickBurst={true}
          />
        </div>
      )}
    </>
  );
}
