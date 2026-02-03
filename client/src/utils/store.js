import { create } from 'zustand';

const useEditorStore = create((set, get) => ({
  // Core state
  code: '',
  language: 'python',
  editorMode: 'vscode', // vscode, terminal, retro, nano, notepad
  
  // Chaos metrics
  stress: 0,
  stability: 100,
  generation: 0,
  totalKeystrokes: 0,
  collapseCount: 0,
  stabilityHistory: [100], // Track stability over time for graph
  
  // Crash state
  isCrashing: false,
  crashIntensity: 0,
  glitchLevel: 0,
  lastCollapseTime: null,
  collapseOnCooldown: false,
  
  // History
  codeHistory: [],
  crashHistory: [],
  
  // Visual mutations (generation-specific)
  currentMutation: null,
  currentVisualEffect: null,
  backgroundColor: '#0a0e14',
  textColor: '#c9d1d9',
  fontSize: 14,
  indentSize: 4,
  
  // Session
  sessionStartTime: Date.now(),
  
  // Python execution
  pythonOutput: '',
  isExecuting: false,
  
  // Actions
  setCode: (code) => set({ code }),
  
  setLanguage: (language) => set({ language }),
  
  incrementKeystrokes: () => set((state) => ({ 
    totalKeystrokes: state.totalKeystrokes + 1 
  })),
  
  calculateStress: () => {
    const state = get();
    const { code, totalKeystrokes, sessionStartTime, lastCollapseTime } = state;
    
    // 10-second cooldown after collapse - FIXED
    if (lastCollapseTime) {
      const timeSinceCollapse = (Date.now() - lastCollapseTime) / 1000;
      if (timeSinceCollapse < 10) {
        // During cooldown, stress is locked at 0
        set({ stress: 0, stability: 100, collapseOnCooldown: true });
        // Update history during cooldown
        set((state) => ({
          stabilityHistory: [...state.stabilityHistory.slice(-99), 100]
        }));
        return { stress: 0, stability: 100 };
      } else if (state.collapseOnCooldown) {
        // Only update once when cooldown expires
        set({ collapseOnCooldown: false });
      }
    }
    
    const lines = code.split('\n').length;
    const chars = code.length;
    const words = code.split(/\s+/).filter(w => w.length > 0).length;
    const timeElapsed = (Date.now() - sessionStartTime) / 1000;
    
    // FIXED: Word-based stress calculation - 50 words = 100% stress
    let stress = 0;
    
    // Primary stress from word count (50 words = 100 stress)
    stress += words * 2; // 50 words = 100 stress
    
    // Secondary factors (reduced to not interfere)
    stress += lines * 0.3; // 100 lines = 30 stress
    stress += totalKeystrokes * 0.05; // 500 keystrokes = 25 stress
    stress += timeElapsed * 0.1; // 300 seconds = 30 stress
    
    // Complexity penalties (minor)
    const brackets = (code.match(/[{}\[\]()]/g) || []).length;
    const semicolons = (code.match(/;/g) || []).length;
    const keywords = (code.match(/\b(function|class|if|for|while|def|return|import|const|let|var)\b/g) || []).length;
    
    stress += brackets * 0.15;
    stress += semicolons * 0.08;
    stress += keywords * 0.25;
    
    // Cap stress at 100
    const maxStress = 100;
    stress = Math.min(stress, maxStress);
    
    const stability = Math.max(0, 100 - stress);
    
    // Update history for graph (keep last 100 points)
    set((state) => ({
      stress,
      stability,
      stabilityHistory: [...state.stabilityHistory.slice(-99), stability]
    }));
    
    return { stress, stability };
  },
  
  triggerCrash: async () => {
    const state = get();
    if (state.isCrashing) return;
    
    set({ isCrashing: true, crashIntensity: 100 });
    
    // Save to history
    const crashData = {
      code: state.code,
      timestamp: Date.now(),
      generation: state.generation,
      stress: state.stress
    };
    
    set((state) => ({
      codeHistory: [...state.codeHistory, state.code],
      crashHistory: [...state.crashHistory, crashData],
      collapseCount: state.collapseCount + 1,
      lastCollapseTime: Date.now()
    }));
    
    // Random editor mode mutation
    const modes = ['vscode', 'terminal', 'retro', 'nano', 'notepad'];
    const newMode = modes[Math.floor(Math.random() * modes.length)];
    
    // Choose random mutation profile
    const mutations = [
      { 
        name: 'NEON_PULSE', 
        bgColor: '#0a0e14', 
        textColor: '#00f5ff',
        fontSize: 14,
        indentSize: 2,
        visualEffect: 'chromatic-aberration'
      },
      { 
        name: 'DARK_MATTER', 
        bgColor: '#000000', 
        textColor: '#a0a0a0',
        fontSize: 13,
        indentSize: 4,
        visualEffect: 'blur-wave'
      },
      { 
        name: 'BLOOD_MOON', 
        bgColor: '#1a0000', 
        textColor: '#ff6b6b',
        fontSize: 14,
        indentSize: 3,
        visualEffect: 'red-tint'
      },
      { 
        name: 'MATRIX_RAIN', 
        bgColor: '#0d1b0d', 
        textColor: '#00ff41',
        fontSize: 13,
        indentSize: 2,
        visualEffect: 'scanlines'
      },
      { 
        name: 'SYNTHWAVE', 
        bgColor: '#1a1a2e', 
        textColor: '#ff00ff',
        fontSize: 14,
        indentSize: 4,
        visualEffect: 'glow'
      },
      { 
        name: 'ARCTIC_FOG', 
        bgColor: '#0a1a1a', 
        textColor: '#a8dadc',
        fontSize: 15,
        indentSize: 2,
        visualEffect: 'blur-subtle'
      },
      { 
        name: 'VOID_WALKER', 
        bgColor: '#050505', 
        textColor: '#6a6a6a',
        fontSize: 13,
        indentSize: 3,
        visualEffect: 'vignette'
      },
      {
        name: 'CYBER_GOLD',
        bgColor: '#0f0f0f',
        textColor: '#ffd700',
        fontSize: 14,
        indentSize: 4,
        visualEffect: 'text-shadow'
      }
    ];
    
    const mutation = mutations[Math.floor(Math.random() * mutations.length)];
    
    set({
      editorMode: newMode,
      currentMutation: mutation,
      currentVisualEffect: mutation.visualEffect,
      backgroundColor: mutation.bgColor,
      textColor: mutation.textColor,
      fontSize: mutation.fontSize,
      indentSize: mutation.indentSize,
      lastCollapseTime: Date.now()
    });
    
    // Reset stress completely (no trauma)
    setTimeout(() => {
      set((state) => ({
        stress: 0,
        stability: 100,
        generation: state.generation + 1,
        isCrashing: false,
        crashIntensity: 0,
        totalKeystrokes: 0,
        sessionStartTime: Date.now(),
        stabilityHistory: [100] // Reset history after collapse
      }));
    }, 3000);
  },
  
  mutateCode: (code) => {
    const state = get();
    const mutation = state.currentMutation;
    if (!mutation) return code;
    
    let mutated = code;
    
    // ENHANCED MUTATIONS (More Visible & Varied)
    
    // 1. Convert if-else to ternary (50% chance per occurrence) - MORE AGGRESSIVE
    mutated = mutated.replace(
      /if\s+(.+?):\s*\n\s+(.+?)\s*\n\s*else:\s*\n\s+(.+)/g,
      (match, condition, ifBranch, elseBranch) => {
        if (Math.random() > 0.5) return match; // 50% conversion rate
        // Extract variable name if it's an assignment
        const assignMatch = ifBranch.match(/(\w+)\s*=\s*(.+)/);
        if (assignMatch) {
          const varName = assignMatch[1];
          const ifValue = assignMatch[2];
          const elseMatch = elseBranch.match(/\w+\s*=\s*(.+)/);
          const elseValue = elseMatch ? elseMatch[1] : elseBranch;
          return `${varName} = ${ifValue} if ${condition} else ${elseValue}`;
        }
        return match;
      }
    );
    
    // 2. Variable name mutations (40% of variables) - MORE VISIBLE
    const varPattern = /\b([a-z_][a-z0-9_]{2,})\b/gi;
    const seenVars = new Set();
    const varMap = new Map();
    
    mutated = mutated.replace(varPattern, (match) => {
      // Skip keywords
      const keywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'print', 'range', 'len', 'str', 'int', 'list', 'dict', 'True', 'False', 'None'];
      if (keywords.includes(match.toLowerCase())) return match;
      
      if (seenVars.has(match)) {
        return varMap.get(match) || match;
      }
      
      seenVars.add(match);
      
      if (Math.random() < 0.4) { // 40% mutation rate (increased from 30%)
        const mutations = [
          // More aggressive vowel removal
          match.replace(/[aeiou]/gi, (c, i) => i === 0 ? c : ''), // Keep first vowel only
          // Add suffix
          match + '_v' + Math.floor(Math.random() * 9 + 1),
          // CamelCase corruption
          match.split('').map((c, i) => Math.random() > 0.6 ? c.toUpperCase() : c).join(''),
          // Consonant doubling
          match.replace(/([bcdfghjklmnpqrstvwxyz])/i, '$1$1'),
          // Snake case addition
          match + '_mut',
          // Number replacement
          match.replace(/[aeiou]/i, Math.floor(Math.random() * 10))
        ];
        const mutatedVar = mutations[Math.floor(Math.random() * mutations.length)];
        varMap.set(match, mutatedVar);
        return mutatedVar;
      }
      
      return match;
    });
    
    // 3. Comment injection (philosophical/chaos quotes) - INCREASED FREQUENCY
    const chaosQuotes = [
      '# reality.reformat()',
      '# entropy increasing...',
      '# system evolution detected',
      '# mutation protocol active',
      '# generation consciousness emerging',
      '# code dreams of electric sheep',
      '# the void compiles',
      '# digital entropy manifest',
      '# chaos.init()',
      '# evolution in progress',
      '# syntax.mutate()',
      '# reality.glitch()',
      '# consciousness.emerge()',
      '# void.execute()'
    ];
    
    const lines = mutated.split('\n');
    const injectedLines = [];
    
    lines.forEach((line, i) => {
      injectedLines.push(line);
      // Inject comment after function definitions (60% chance) - INCREASED
      if (line.trim().startsWith('def ') && Math.random() < 0.6) {
        const quote = chaosQuotes[Math.floor(Math.random() * chaosQuotes.length)];
        const indent = line.match(/^\s*/)[0];
        injectedLines.push(indent + '    ' + quote);
      }
      // Also inject after class definitions (40% chance)
      if (line.trim().startsWith('class ') && Math.random() < 0.4) {
        const quote = chaosQuotes[Math.floor(Math.random() * chaosQuotes.length)];
        const indent = line.match(/^\s*/)[0];
        injectedLines.push(indent + '    ' + quote);
      }
    });
    
    mutated = injectedLines.join('\n');
    
    // 4. Loop mutations - NEW
    // Convert range loops to while loops (30% chance)
    mutated = mutated.replace(
      /for\s+(\w+)\s+in\s+range\((\d+)\):/g,
      (match, varName, num) => {
        if (Math.random() < 0.3) {
          return `${varName} = 0\n    while ${varName} < ${num}:`;
        }
        return match;
      }
    );
    
    // 5. String quote mutations - NEW (single to double quotes, 40% chance)
    if (Math.random() < 0.4) {
      mutated = mutated.replace(/'([^']*)'/g, '"$1"');
    }
    
    // 6. Indentation mutations (respecting generation's indentSize)
    const indentedLines = mutated.split('\n').map(line => {
      const leadingSpaces = line.match(/^\s*/)[0].length;
      if (leadingSpaces === 0) return line;
      
      // Randomly adjust indent (±1-2 spaces, 30% chance) - INCREASED
      if (Math.random() < 0.3) {
        const variation = Math.random() > 0.5 ? 2 : -1;
        const newIndent = Math.max(0, leadingSpaces + variation);
        return ' '.repeat(newIndent) + line.trim();
      }
      
      return line;
    });
    
    mutated = indentedLines.join('\n');
    
    // 7. Spacing mutations (add/remove spaces around operators, 35% chance) - INCREASED
    if (Math.random() < 0.35) {
      mutated = mutated.replace(/([+\-*/%=])/g, (match) => {
        const options = [
          ` ${match} `,   // Normal
          `  ${match}  `, // Extra space
          match,          // No space
          ` ${match}`,    // Left space only
          `${match} `     // Right space only
        ];
        return options[Math.floor(Math.random() * options.length)];
      });
    }
    
    // 8. Add random blank lines (20% chance) - NEW
    if (Math.random() < 0.2) {
      const finalLines = mutated.split('\n');
      const withBlanks = [];
      finalLines.forEach((line, i) => {
        withBlanks.push(line);
        if (Math.random() < 0.15 && line.trim() !== '') {
          withBlanks.push('');
        }
      });
      mutated = withBlanks.join('\n');
    }
    
    return mutated;
  },
  
  
  executePython: async () => {
    const state = get();
    set({ isExecuting: true, pythonOutput: 'Executing...' });
    
    try {
      const code = state.code;
      
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock output based on code
      let output = '>>> Running Python code...\n\n';
      
      // Simple detection and mock outputs
      if (code.includes('print')) {
        const printMatches = code.match(/print\((.*?)\)/g);
        if (printMatches) {
          printMatches.forEach(match => {
            const content = match.match(/print\((.*?)\)/)[1];
            output += `${content.replace(/['"]/g, '')}\n`;
          });
        }
      } else {
        output += 'Code executed successfully.\n';
      }
      
      output += '\n[Process completed]';
      
      set({ pythonOutput: output, isExecuting: false });
    } catch (error) {
      set({ 
        pythonOutput: `Error: ${error.message}`, 
        isExecuting: false 
      });
    }
  },
  
  clearOutput: () => set({ pythonOutput: '' }),
  
  reset: () => set({
    code: '',
    stress: 0,
    stability: 100,
    generation: 0,
    totalKeystrokes: 0,
    collapseCount: 0,
    isCrashing: false,
    crashIntensity: 0,
    codeHistory: [],
    crashHistory: [],
    editorMode: 'vscode',
    backgroundColor: '#0a0e14',
    textColor: '#c9d1d9',
    fontSize: 14,
    indentSize: 4,
    sessionStartTime: Date.now(),
    pythonOutput: '',
    lastCollapseTime: null,
    currentVisualEffect: null,
    stabilityHistory: [100]
  })
}));

export default useEditorStore;
