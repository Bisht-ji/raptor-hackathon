import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CodeEditor from '../components/CodeEditor';
import StatusBar from '../components/StatusBar';
import CrashEffects from '../components/CrashEffects';
import GenerationEffects from '../components/GenerationEffects';
import WelcomeScreen from '../components/WelcomeScreen';
import useEditorStore from '../utils/store';
import { FiRefreshCw, FiDownload, FiMaximize2, FiZap } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import './EditorPage.css';

const EditorPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  
  const {
    code,
    generation,
    reset,
    stability,
    triggerCrash,
    isCrashing,
    executePython,
    pythonOutput,
    isExecuting,
    clearOutput,
    language,
    collapseOnCooldown
  } = useEditorStore();

  const handleReset = () => {
    if (window.confirm('Reset the entire session? All progress will be lost.')) {
      reset();
      toast.success('Reality restored... for now');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raptor-gen${generation}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code exported');
  };

  const handleForceCollapse = () => {
    if (!isCrashing && !collapseOnCooldown) {
      triggerCrash();
      toast.error('Manual evolution initiated');
    }
  };

  const handleRun = () => {
    if (language === 'python' && !isExecuting) {
      executePython();
      toast.success('Executing Python code...');
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        handleReset();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        handleForceCollapse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCrashing]);

  return (
    <div className="editor-page">
      {/* Welcome Screen */}
      {showWelcome && <WelcomeScreen onClose={() => setShowWelcome(false)} />}
      
      {/* Crash Effects Layer */}
      <CrashEffects />
      
      {/* Generation-Specific Visual Effects */}
      <GenerationEffects />

      {/* Header */}
      <header 
        className="editor-header"
      >
        <div className="header-left">
          <div className="logo">
            <motion.div 
              className="logo-icon"
              animate={{ 
                rotate: isCrashing ? 360 : 0 
              }}
              transition={{ 
                duration: 0.5, 
                repeat: isCrashing ? Infinity : 0 
              }}
            >
              🦖
            </motion.div>
            <div className="logo-text">
              <h1>Raptor Editor</h1>
              <span className="logo-subtitle">Code That Evolves</span>
            </div>
          </div>
        </div>

        <div className="header-center">
          <div className="title-bar">
            <span className="file-name">generation-{generation}.py</span>
            {collapseOnCooldown && (
              <motion.div 
                className="cooldown-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                ⏱️ Cooldown Active
              </motion.div>
            )}
            <motion.div 
              className="unstable-indicator"
              animate={{
                opacity: stability < 50 ? [0.5, 1, 0.5] : 1,
                scale: stability < 30 ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {stability < 30 && '⚠️ UNSTABLE'}
            </motion.div>
          </div>
        </div>

        <div className="header-right">
          <motion.button
            className="header-btn run-btn"
            onClick={handleRun}
            disabled={isExecuting || language !== 'python'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiZap />
            {isExecuting ? 'Running...' : 'Run'}
          </motion.button>

          <motion.button
            className="header-btn force-collapse-btn"
            onClick={handleForceCollapse}
            disabled={isCrashing || collapseOnCooldown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMaximize2 />
            Evolve
          </motion.button>

          <motion.button
            className="header-btn download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload />
            Export
          </motion.button>

          <motion.button
            className="header-btn reset-btn"
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiRefreshCw />
            Reset
          </motion.button>
        </div>
      </header>

      {/* Editor Area */}
      <main className="editor-main">
        <div className="editor-content">
          <CodeEditor />
        </div>
        
        {/* Output Panel */}
        {pythonOutput && (
          <motion.div 
            className="output-panel"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <div className="output-header">
              <span className="output-title">Output</span>
              <button className="output-clear" onClick={clearOutput}>Clear</button>
            </div>
            <pre className="output-content">{pythonOutput}</pre>
          </motion.div>
        )}
      </main>

      {/* Status Bar */}
      <StatusBar />

      {/* Background Effects */}
      <div className="bg-effects">
        <div className="bg-grid" />
        <div className="bg-gradient" />
        {stability < 50 && <div className="bg-static" />}
      </div>
    </div>
  );
};

export default EditorPage;
