import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEditorStore from '../utils/store';
import { FiZap, FiAlertTriangle, FiActivity } from 'react-icons/fi';
import './StatusBar.css';

const StatusBar = () => {
  const {
    code,
    stress,
    stability,
    generation,
    totalKeystrokes,
    collapseCount,
    language,
    editorMode,
    stabilityHistory
  } = useEditorStore();

  const [warnings, setWarnings] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Calculate word count
    const words = code.split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
  }, [code]);

  useEffect(() => {
    // Draw stability graph whenever stability history changes
    drawStabilityGraph();
  }, [stabilityHistory, stability]);

  const drawStabilityGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal lines
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw stability line
    if (stabilityHistory && stabilityHistory.length > 1) {
      const maxPoints = 100;
      const history = stabilityHistory.slice(-maxPoints);
      const stepX = width / (maxPoints - 1);
      
      ctx.beginPath();
      ctx.strokeStyle = getStabilityColor();
      ctx.lineWidth = 2;
      
      history.forEach((value, index) => {
        const x = (index / (maxPoints - 1)) * width;
        const y = height - (value / 100) * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Fill area under the line
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, getStabilityColor() + '40');
      gradient.addColorStop(1, getStabilityColor() + '00');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }, [stabilityHistory, stability]);

  useEffect(() => {
    // Generate warnings based on stress
    if (stability < 30 && stability > 20) {
      setWarnings(['CRITICAL STRESS']);
    } else if (stability < 20 && stability > 10) {
      setWarnings(['IMMINENT COLLAPSE', 'SYSTEM UNSTABLE']);
    } else if (stability < 10) {
      setWarnings(['CATASTROPHIC FAILURE', 'POINT OF NO RETURN']);
    } else if (stability < 50) {
      setWarnings(['HIGH STRESS DETECTED']);
    } else {
      setWarnings([]);
    }
  }, [stability]);

  const getStabilityColor = () => {
    if (stability > 70) return '#00ff00';
    if (stability > 40) return '#ffff00';
    if (stability > 20) return '#ff9900';
    return '#ff0000';
  };

  const getBarGradient = () => {
    const color = getStabilityColor();
    return `linear-gradient(90deg, ${color} 0%, ${color}88 100%)`;
  };

  return (
    <div className="status-bar">
      <div className="status-section">
        <div className="status-item">
          <FiActivity className="status-icon" />
          <span className="status-label">Generation:</span>
          <span className="status-value generation-value">{generation}</span>
        </div>
        
        <div className="status-item">
          <FiZap className="status-icon" />
          <span className="status-label">Collapses:</span>
          <span className="status-value">{collapseCount}</span>
        </div>
        
        <div className="status-item">
          <span className="status-label">Words:</span>
          <span className="status-value word-count">{wordCount}</span>
          <span className="status-sublabel">/30 min</span>
        </div>
        
        <div className="status-item">
          <span className="status-label">Keystrokes:</span>
          <span className="status-value">{totalKeystrokes}</span>
        </div>
      </div>

      <div className="stability-section">
        <div className="stability-container">
          <div className="stability-header">
            <span className="stability-label">STABILITY GRAPH</span>
            <motion.span 
              className="stability-percentage"
              style={{ color: getStabilityColor() }}
              animate={{ 
                scale: stability < 30 ? [1, 1.1, 1] : 1 
              }}
              transition={{ 
                duration: 0.5, 
                repeat: stability < 30 ? Infinity : 0 
              }}
            >
              {Math.round(stability)}%
            </motion.span>
          </div>
          
          <div className="stability-graph-container">
            <canvas 
              ref={canvasRef} 
              width={400} 
              height={80}
              className="stability-canvas"
            />
            <div className="graph-keystroke-indicator">
              Keystrokes: {totalKeystrokes}
            </div>
          </div>
          
          {/* Warning messages */}
          {warnings.length > 0 && (
            <div className="warnings-container">
              {warnings.map((warning, index) => (
                <motion.div
                  key={warning}
                  className="warning-message"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FiAlertTriangle className="warning-icon" />
                  {warning}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="status-section">
        <div className="status-item">
          <span className="status-label">Language:</span>
          <span className="status-value lang-value">{language.toUpperCase()}</span>
        </div>
        
        <div className="status-item">
          <span className="status-label">Mode:</span>
          <span className="status-value mode-value">{editorMode.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
