import React, { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import useEditorStore from '../utils/store';
import './CodeEditor.css';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const {
    code,
    setCode,
    language,
    setLanguage,
    editorMode,
    backgroundColor,
    textColor,
    fontSize,
    indentSize,
    incrementKeystrokes,
    calculateStress,
    stress,
    stability,
    triggerCrash,
    isCrashing,
    mutateCode
  } = useEditorStore();

  const [localCode, setLocalCode] = useState(code);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false); // NEW: Loading state

  // Language detection
  const detectLanguage = (content) => {
    if (!content) return language;
    
    // Python detection
    if (content.match(/\b(def|import|from|class|print|if __name__|lambda)\b/)) {
      return 'python';
    }
    // Java detection
    if (content.match(/\b(public|private|static|void|class|extends|implements|package)\b/)) {
      return 'java';
    }
    // C++ detection
    if (content.match(/#include|std::|cout|cin|namespace|template/)) {
      return 'cpp';
    }
    
    return language;
  };

  // Handle code change
  const handleEditorChange = (value) => {
    const newLang = detectLanguage(value);
    if (newLang !== language) {
      setLanguage(newLang);
    }
    
    setLocalCode(value);
    setCode(value);
    incrementKeystrokes();
    
    // Calculate stress
    const { stress: newStress } = calculateStress();
    
    // Auto crash when stress hits 100
    if (newStress >= 100 && !isCrashing) {
      setTimeout(() => {
        triggerCrash();
        // Apply mutations after crash
        setTimeout(() => {
          const mutated = mutateCode(value);
          setLocalCode(mutated);
          setCode(mutated);
        }, 2500);
      }, 100);
    }
    
    // Glitch effect at high stress
    if (newStress > 70 && Math.random() > 0.8) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }
  };

  // Editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setIsEditorReady(true); // NEW: Mark editor as ready
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Render different editor modes
  const renderEditor = () => {
    switch (editorMode) {
      case 'terminal':
        return <TerminalEditor code={localCode} onChange={handleEditorChange} />;
      case 'retro':
        return <RetroIDEEditor code={localCode} onChange={handleEditorChange} />;
      case 'nano':
        return <NanoEditor code={localCode} onChange={handleEditorChange} />;
      case 'notepad':
        return <NotepadEditor code={localCode} onChange={handleEditorChange} />;
      default:
        return (
          <div className={`editor-container ${isGlitching ? 'glitching' : ''}`}>
            {!isEditorReady && (
              <div className="editor-loading">
                <div className="loading-spinner">🦖</div>
                <div className="loading-text">Initializing Editor...</div>
              </div>
            )}
            <Editor
              height="100%"
              language={language}
              value={localCode}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                fontSize: fontSize,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                lineNumbers: 'on',
                minimap: { enabled: stress < 50 },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                tabSize: indentSize,
                insertSpaces: true,
                automaticLayout: true,
                glyphMargin: true,
                folding: true,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
                renderLineHighlight: 'all',
                smoothScrolling: true,
                cursorBlinking: cursorBlink ? 'blink' : 'solid',
                cursorSmoothCaretAnimation: true
              }}
            />
          </div>
        );
    }
  };

  return (
    <motion.div 
      className="code-editor-wrapper"
      style={{ 
        backgroundColor,
        filter: stress > 80 ? 'blur(1px)' : 'none',
        transform: stress > 90 ? 'scale(0.99)' : 'scale(1)'
      }}
      animate={{
        backgroundColor: backgroundColor
      }}
      transition={{ duration: 0.5 }}
    >
      {renderEditor()}
      
      {/* Language badge */}
      <div className="language-badge">
        <span className="lang-icon">
          {language === 'python' && '🐍'}
          {language === 'java' && '☕'}
          {language === 'cpp' && '⚙️'}
        </span>
        {language.toUpperCase()}
      </div>
      
      {/* Mode indicator */}
      <div className="mode-indicator">
        MODE: {editorMode.toUpperCase()}
      </div>
    </motion.div>
  );
};

// TERMINAL MODE (Green on Black with ASCII art and commands)
const TerminalEditor = ({ code, onChange }) => {
  const textareaRef = useRef(null);
  const [commandHistory, setCommandHistory] = useState([
    '> System initialized...',
    '> Loading entropy.dll',
    '> WARNING: Unstable environment detected',
    '> Type to continue...',
    ''
  ]);
  
  return (
    <div className="terminal-editor">
      <div className="terminal-header">
        <span className="terminal-title">COLLAPSING TERMINAL v1.0.0</span>
        <span className="terminal-status">[ UNSTABLE ]</span>
      </div>
      
      <div className="terminal-ascii">
        <pre>{`
 ██████╗ ██████╗ ██╗     ██╗      █████╗ ██████╗ ███████╗███████╗
██╔════╝██╔═══██╗██║     ██║     ██╔══██╗██╔══██╗██╔════╝██╔════╝
██║     ██║   ██║██║     ██║     ███████║██████╔╝███████╗█████╗  
██║     ██║   ██║██║     ██║     ██╔══██║██╔═══╝ ╚════██║██╔══╝  
╚██████╗╚██████╔╝███████╗███████╗██║  ██║██║     ███████║███████╗
 ╚═════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚══════╝
        `}</pre>
      </div>
      
      <div className="terminal-log">
        {commandHistory.map((cmd, i) => (
          <div key={i} className="terminal-line">{cmd}</div>
        ))}
      </div>
      
      <div className="terminal-input-area">
        <span className="terminal-prompt">root@chaos:~$ </span>
        <textarea
          ref={textareaRef}
          className="terminal-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder="Enter code..."
        />
      </div>
      
      <div className="terminal-footer">
        <span>Press Ctrl+C to interrupt collapse</span>
        <span>|</span>
        <span>System entropy increasing</span>
      </div>
    </div>
  );
};

// RETRO IDE MODE (Turbo Pascal / QBasic style)
const RetroIDEEditor = ({ code, onChange }) => {
  const currentDate = new Date();
  
  return (
    <div className="retro-ide-editor">
      <div className="retro-menubar">
        <span className="retro-menu-item">File</span>
        <span className="retro-menu-item">Edit</span>
        <span className="retro-menu-item">Search</span>
        <span className="retro-menu-item">Run</span>
        <span className="retro-menu-item">Compile</span>
        <span className="retro-menu-item">Debug</span>
        <span className="retro-menu-item">Options</span>
        <span className="retro-menu-item">Window</span>
        <span className="retro-menu-item">Help</span>
      </div>
      
      <div className="retro-toolbar">
        <div className="retro-toolbar-group">
          <button className="retro-btn">New</button>
          <button className="retro-btn">Open</button>
          <button className="retro-btn">Save</button>
        </div>
        <div className="retro-toolbar-group">
          <button className="retro-btn">Cut</button>
          <button className="retro-btn">Copy</button>
          <button className="retro-btn">Paste</button>
        </div>
        <div className="retro-toolbar-group">
          <button className="retro-btn">Undo</button>
          <button className="retro-btn">Redo</button>
        </div>
      </div>
      
      <div className="retro-editor-area">
        <div className="retro-line-numbers">
          {code.split('\n').map((_, i) => (
            <div key={i} className="retro-line-num">{i + 1}</div>
          ))}
        </div>
        <textarea
          className="retro-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
      </div>
      
      <div className="retro-statusbar">
        <span className="retro-status-item">{currentDate.toLocaleDateString()}</span>
        <span className="retro-status-item">Insert</span>
        <span className="retro-status-item">Indent</span>
        <span className="retro-status-item">Tab</span>
        <span className="retro-status-item">Ln: 1 Col: 1</span>
      </div>
      
      <div className="retro-help-bar">
        <span>F1</span><span>Help</span>
        <span>F2</span><span>Save</span>
        <span>F5</span><span>Run</span>
        <span>F9</span><span>Compile</span>
        <span>Alt+X</span><span>Exit</span>
      </div>
    </div>
  );
};

// NANO MODE
const NanoEditor = ({ code, onChange }) => {
  return (
    <div className="nano-editor">
      <div className="nano-header">
        <span>GNU nano 7.2</span>
        <span>Modified</span>
      </div>
      <textarea
        className="nano-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      <div className="nano-footer">
        <div className="nano-shortcuts">
          <span>^G Help</span>
          <span>^O Write Out</span>
          <span>^W Where Is</span>
          <span>^K Cut</span>
          <span>^T Execute</span>
          <span>^C Location</span>
        </div>
      </div>
    </div>
  );
};

// NOTEPAD MODE
const NotepadEditor = ({ code, onChange }) => {
  return (
    <div className="notepad-editor">
      <div className="notepad-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>
      <textarea
        className="notepad-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
      <div className="notepad-statusbar">
        Ln 1, Col 1
      </div>
    </div>
  );
};

export default CodeEditor;
