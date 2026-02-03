import React from 'react';
import useEditorStore from '../utils/store';
import './GenerationEffects.css';

const GenerationEffects = () => {
  const { currentVisualEffect } = useEditorStore();

  if (!currentVisualEffect) return null;

  return (
    <div className={`generation-effects ${currentVisualEffect}`}>
      {currentVisualEffect === 'chromatic-aberration' && (
        <div className="chromatic-layer" />
      )}
      
      {currentVisualEffect === 'scanlines' && (
        <div className="scanlines-layer" />
      )}
      
      {currentVisualEffect === 'blur-wave' && (
        <div className="blur-wave-layer" />
      )}
      
      {currentVisualEffect === 'red-tint' && (
        <div className="red-tint-layer" />
      )}
      
      {currentVisualEffect === 'glow' && (
        <div className="glow-layer" />
      )}
      
      {currentVisualEffect === 'blur-subtle' && (
        <div className="blur-subtle-layer" />
      )}
      
      {currentVisualEffect === 'vignette' && (
        <div className="vignette-layer" />
      )}
      
      {currentVisualEffect === 'text-shadow' && (
        <div className="text-shadow-layer" />
      )}
    </div>
  );
};

export default GenerationEffects;
