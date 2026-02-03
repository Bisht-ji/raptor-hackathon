# 🦖 Raptor Editor - Code That Evolves

> **A modern code editor where each generation develops its own personality through controlled chaos**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/status-evolving-success.svg)]()

---

## 🎯 What is Raptor Editor?

**Raptor Editor** is not just another code editor—it's a living system that evolves with each generation. Write Python code, watch as stress accumulates, and experience your editor transform into something entirely new when it reaches critical mass.

### Key Philosophy

- **Each generation is unique** - Persistent visual effects that define a generation's identity
- **Moderate chaos** - Code reformatting at scale 3-5 (recognizable but evolved)
- **10-second cooldown** - Time to breathe between evolutions
- **Modern minimalist** - Clean UI that doesn't distract from the chaos within

---

## ✨ Features

### 🦖 Generation System

Each generation has its own **persistent visual identity**:

- **NEON_PULSE** - Cyan glow with chromatic aberration
- **DARK_MATTER** - Grayscale with blur waves
- **BLOOD_MOON** - Red tint with intense atmosphere
- **MATRIX_RAIN** - Green scanlines effect
- **SYNTHWAVE** - Purple glow with retro vibes
- **ARCTIC_FOG** - Cyan with subtle blur
- **VOID_WALKER** - Dark gray with vignette
- **CYBER_GOLD** - Gold text with text shadows

### 💻 Code Evolution (Scale 3-5)

Moderate reformatting that's interesting but not destructive:

1. **If-Else → Ternary** (40% chance)
   ```python
   # Before
   if x > 5:
       result = "big"
   else:
       result = "small"
   
   # After
   result = "big" if x > 5 else "small"
   ```

2. **Variable Name Mutations** (30% chance)
   - `userName` → `usrNme` or `userName_3` or `UsErNaMe`

3. **Philosophical Comments** (40% at function definitions)
   ```python
   def calculate():
       # reality.reformat()
       return x + y
   ```

4. **Indent Variations** (±1 space, 20% chance)

5. **Spacing Mutations** (around operators, 25% chance)

### ⚡ Python Execution

- **Run button** to execute Python code
- **Output panel** shows results
- **Visible output** - no glitches, just clean execution
- **Clear button** to reset output

### 🎨 Modern Minimalist UI

- Clean, professional interface
- Subtle animations
- Color-coded buttons:
  - **Cyan** - Run
  - **Red** - Evolve (force collapse)
  - **Green** - Export
  - **Yellow** - Reset
- Generation-specific visual effects
- 10-second cooldown indicator

---

## 🚀 Quick Start

### Installation

```bash
# Extract and navigate
cd raptor-editor

# Install dependencies
npm run install:all

# Start development
npm run dev
```

Opens at `http://localhost:3000`

### First Evolution

1. **Start typing Python code** (at least 30 words)
2. **Watch stability drop** from 100% → 0%
3. **Evolution triggers** at 0% stability
4. **10-second cooldown** - time to observe
5. **New generation begins** with unique visual identity

---

## 📊 How It Works

### Stress System

```
Primary Factor: Words × 2
├── 30 words = 60% stress
├── 40 words = 80% stress
└── 50 words = 100% → EVOLUTION

Secondary Factors:
├── Lines × 0.5
├── Keystrokes × 0.08
├── Time × 0.15
└── Complexity (brackets, keywords)
```

### Evolution Cycle

```
1. User types code
2. Stress accumulates (word-based)
3. Reaches 100% stress
4. 💥 EVOLUTION EVENT
   ├── Screen effects
   ├── Code mutation (scale 3-5)
   ├── Visual effect assigned
   └── Editor mode may change
5. 10-second cooldown
6. Complete reset (stress → 0)
7. New generation begins
```

### Cooldown System

After each evolution:
- **Stress locked at 0%** for 10 seconds
- **Blue indicator** shows "Cooldown Active"
- **Buttons disabled** during cooldown
- **Gives time to review** the mutations

---

## 🎮 Usage

### Writing Code

```python
# Example - triggers evolution at ~50 words
def fibonacci(n):
    """Calculate fibonacci sequence recursively"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def main():
    for i in range(10):
        result = fibonacci(i)
        print(f"Fibonacci of {i} is {result}")

if __name__ == "__main__":
    main()
```

### Running Code

1. Write Python code
2. Click **"Run"** button (cyan)
3. View output in panel below
4. Click **"Clear"** to reset output

### Keyboard Shortcuts

- `Ctrl+Shift+K` - Force evolution
- `Ctrl+Shift+R` - Reset session
- `Ctrl+S` - Export code

---

## 🎨 Editor Modes

Randomly switches between 5 modes on evolution:

1. **VSCODE** - Monaco Editor (default)
2. **TERMINAL** - Green terminal with ASCII art
3. **RETRO IDE** - Turbo Pascal / QBasic style
4. **NANO** - Terminal editor
5. **NOTEPAD** - Windows 95 aesthetic

---

## 🛠️ Tech Stack

### Frontend
- React 18.2 + Vite
- Monaco Editor (VSCode engine)
- Framer Motion (animations)
- Zustand (state management)
- React Hot Toast (notifications)

### Backend
- Node.js + Express
- Socket.IO (future collaboration)
- MongoDB (optional persistence)

---

## 📁 Project Structure

```
raptor-editor/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── CrashEffects.jsx
│   │   │   ├── GenerationEffects.jsx
│   │   │   └── StatusBar.jsx
│   │   ├── pages/
│   │   │   └── EditorPage.jsx
│   │   ├── utils/
│   │   │   └── store.js
│   │   └── styles/
│   │       └── globals.css
│   └── package.json
├── server/
│   ├── src/
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🎯 Generation-Specific Effects

Each generation maintains ONE visual effect throughout its lifetime:

| Effect | Description | Visual Impact |
|--------|-------------|---------------|
| chromatic-aberration | RGB split | Neon cyberpunk feel |
| blur-wave | Pulsing blur | Soft, dreamy aesthetic |
| red-tint | Blood moon overlay | Intense atmosphere |
| scanlines | Moving lines | Retro CRT monitor |
| glow | Purple glow | Synthwave vibes |
| blur-subtle | Light blur | Arctic fog feel |
| vignette | Dark edges | Focused center |
| text-shadow | Glowing text | Cyber gold look |

---

## 🔧 Configuration

### Adjust Evolution Speed

Edit `/client/src/utils/store.js`:

```javascript
// Faster (20 words)
stress += words * 5;

// Slower (60 words)
stress += words * 1.5;
```

### Change Cooldown Duration

```javascript
if (timeSinceCollapse < 15) { // Change from 10 to 15 seconds
```

### Adjust Mutation Intensity

```javascript
// More aggressive (scale 5-7)
if (Math.random() < 0.5) { // Change from 0.3 to 0.5

// Less aggressive (scale 1-3)
if (Math.random() < 0.15) { // Change from 0.3 to 0.15
```

---

## 🎪 Example Session

```
Generation 0 (VSCODE + NEON_PULSE)
├── Type 35 words
├── Stability: 100% → 30%
├── 💥 EVOLUTION
└── Cooldown: 10 seconds

Generation 1 (TERMINAL + MATRIX_RAIN)
├── Code mutated (ternary, comments added)
├── Green scanlines visible
├── Type 40 words
├── Stability: 100% → 20%
├── 💥 EVOLUTION
└── Cooldown: 10 seconds

Generation 2 (RETRO + BLOOD_MOON)
├── Red tint applied
├── Variable names mutated
├── Turbo Pascal interface
└── Continue...
```

---

## 🌟 Philosophy

**Raptor Editor** explores the question:

> *What if code editors evolved instead of staying static?*

Traditional IDEs fight against change. Raptor embraces it. Each evolution is not a failure—it's a **transformation**. The editor becomes a co-creator, developing its own aesthetic preferences and formatting style.

### Design Principles

1. **Entropy as creativity** - Chaos creates unexpected beauty
2. **Persistence** - Each generation has lasting identity
3. **Respect the coder** - Cooldowns and moderate mutations
4. **Clean aesthetics** - Modern UI doesn't fight the chaos
5. **Emergence** - Patterns appear over time

---

## 🚧 Future Enhancements

- [ ] **Pyodide integration** - Real Python execution in browser
- [ ] **More languages** - JavaScript, Rust, Go support
- [ ] **Custom mutations** - User-defined transformation rules
- [ ] **Generation gallery** - View all past generations
- [ ] **Collaborative mode** - Multiple users, shared evolutions
- [ ] **Sound design** - Audio feedback per generation
- [ ] **Achievement system** - Unlock new visual effects
- [ ] **Export animations** - Save evolution sequences

---

## 📜 License

MIT License - Evolve freely

---

## 🙏 Credits

- **Monaco Editor** - The VSCode engine
- **Framer Motion** - Smooth animations
- **JetBrains Mono** - Perfect monospace font
- **The Evolution** - For inspiring transformation

---

## 📞 Support

Issues? Ideas? Questions?
- Open an issue on GitHub
- Check the CHANGELOG
- Read the QUICKSTART guide

---

## 🦖 Final Thought

> "Code doesn't have to be perfect. It has to evolve."

**Type. Evolve. Adapt. Repeat.**

---

**Status**: Evolving  
**Current Generation**: ∞  
**Mutations**: Moderate  
**Cooldown**: 10s  

🦖 **Let the evolution begin!** 🦖
