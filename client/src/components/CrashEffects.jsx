import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEditorStore from '../utils/store';
import './CrashEffects.css';

const CrashEffects = () => {
  const { isCrashing, crashIntensity, generation, currentMutation } = useEditorStore();
  const [glitchText, setGlitchText] = useState('');
  const [screenShake, setScreenShake] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [staticNoise, setStaticNoise] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [showScanlines, setShowScanlines] = useState(false);

  const crashMessages = [
    'SEGMENTATION FAULT',
    'CORE DUMPED',
    'FATAL ERROR: REALITY.EXE',
    'STACK OVERFLOW',
    'NULL POINTER EXCEPTION',
    'MEMORY CORRUPTION DETECTED',
    'SYSTEM INTEGRITY COMPROMISED',
    'KERNEL PANIC',
    'ACCESS VIOLATION',
    'BUFFER OVERFLOW',
    '0xDEADBEEF',
    'CRITICAL SYSTEM FAILURE',
    'HEAP CORRUPTION',
    'INVALID OPCODE'
  ];

  useEffect(() => {
    if (isCrashing) {
      // Screen shake
      setScreenShake(true);
      
      // Red flash
      setRedFlash(true);
      setTimeout(() => setRedFlash(false), 200);
      setTimeout(() => setRedFlash(true), 400);
      setTimeout(() => setRedFlash(false), 600);
      
      // Static noise
      setStaticNoise(true);
      setTimeout(() => setStaticNoise(false), 1500);
      
      // Randomize scanline effect (50% chance)
      const shouldShowScanlines = Math.random() > 0.5;
      setShowScanlines(shouldShowScanlines);
      
      // Glitch text animation
      const glitchInterval = setInterval(() => {
        const chars = '!@#$%^&*()_+-={}[]|\\:;"<>,.?/~`';
        const randomText = Array(50).fill(0).map(() => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        setGlitchText(randomText);
      }, 50);
      
      // Generate error cascade
      const errors = [];
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const msg = crashMessages[Math.floor(Math.random() * crashMessages.length)];
          setErrorMessages(prev => [...prev, { id: Date.now() + i, text: msg }]);
        }, i * 150);
      }
      
      // Cleanup
      setTimeout(() => {
        setScreenShake(false);
        clearInterval(glitchInterval);
        setGlitchText('');
      }, 2000);
      
      setTimeout(() => {
        setErrorMessages([]);
        // Turn off scanlines after crash completes
        setShowScanlines(false);
      }, 3000);
    }
  }, [isCrashing]);

  return (
    <>
      {/* Screen Shake Container */}
      <div className={`crash-shake-container ${screenShake ? 'shaking' : ''}`}>
        
        {/* Red Flash Overlay */}
        <AnimatePresence>
          {redFlash && (
            <motion.div
              className="crash-red-flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            />
          )}
        </AnimatePresence>
        
        {/* Static Noise */}
        <AnimatePresence>
          {staticNoise && (
            <div className="crash-static-noise" />
          )}
        </AnimatePresence>
        
        {/* Main Crash Message */}
        <AnimatePresence>
          {isCrashing && (
            <motion.div
              className="crash-main-message"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="crash-skull">💀</div>
              <div className="crash-title">SYSTEM COLLAPSE</div>
              <div className="crash-subtitle">Reality Reformatting...</div>
              <div className="crash-generation">GEN {generation + 1}</div>
              {currentMutation && (
                <div className="crash-mutation">MODE: {currentMutation.name}</div>
              )}
              <div className="crash-glitch-text">{glitchText}</div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Error Cascade */}
        <div className="crash-error-cascade">
          <AnimatePresence>
            {errorMessages.map((error, index) => (
              <motion.div
                key={error.id}
                className="crash-error-line"
                initial={{ x: -1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 1000, opacity: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300, 
                  damping: 20,
                  delay: index * 0.05 
                }}
              >
                <span className="crash-error-prefix">[FATAL]</span> {error.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Scanlines */}
        {showScanlines && <div className="crash-scanlines" />}
        
        {/* CRT Effect */}
        {isCrashing && <div className="crash-crt-effect" />}
        
      </div>
    </>
  );
};

export default CrashEffects;
