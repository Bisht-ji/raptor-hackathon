# Quick Start Guide - Raptor Editor Improvements

## 🚀 What's New

1. **📊 Live Stability Graph** - Watch stability fall in real-time as you type
2. **🎉 Welcome Screen** - Professional hackathon splash screen with your name
3. **🔧 Fixed Stability Reset** - Stability properly resets after each collapse
4. **🎲 Randomized Scanlines** - Scanline effect is now random and temporary

---

## 📦 Installation & Setup

### Option 1: From Existing Setup
If you already have the Raptor Editor running:

```bash
# Navigate to your project directory
cd raptor-editor-improved

# Install any new dependencies (none needed, but just in case)
cd client && npm install
cd ../server && npm install

# Start the application
cd ..
npm run dev
```

### Option 2: Fresh Setup

```bash
# Extract the files to your desired location
cd raptor-editor-improved

# Run the setup script
bash setup.sh

# Start the development server
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001

---

## 🎮 How to Use the New Features

### Welcome Screen
- **Auto-shows** on first load
- **Displays:** "WELCOME TO RAPTOR HACKATHON" with your name
- **Dismiss:** Click anywhere or wait 5 seconds
- **Re-trigger:** Refresh the page

### Stability Graph
- **Location:** Bottom status bar (center section)
- **Shows:** Real-time stability over last 100 data points
- **Colors:**
  - 🟢 Green (70-100%): Safe
  - 🟡 Yellow (40-70%): Warning
  - 🟠 Orange (20-40%): Danger
  - 🔴 Red (0-20%): Critical
- **Keystroke Counter:** Shows in bottom-right of graph

### Collapse Behavior
- **Cooldown Period:** 10 seconds after each collapse
- **During Cooldown:** Stability locked at 100%
- **After Cooldown:** Stability starts fresh from 100%
- **Graph:** Resets completely for new generation

### Scanline Effects
- **Trigger:** Random during collapse (50% chance)
- **Duration:** Active only during 3-second crash animation
- **Next Crash:** New random chance (might appear, might not)

---

## 🎯 Testing the Features

### Test 1: Welcome Screen
```
1. Open http://localhost:5173
2. Observe welcome animation
3. Click to dismiss or wait
4. Refresh to see again
```

### Test 2: Stability Graph
```
1. Start typing code
2. Watch graph line descend
3. Observe color changes
4. Note keystroke counter increasing
```

### Test 3: Collapse & Reset
```
1. Type until stability reaches 0 (or press Ctrl+Shift+K)
2. Watch crash animation
3. Observe 10-second cooldown
4. See stability locked at 100% in graph
5. After cooldown, start typing again
6. Graph should start fresh from 100%
```

### Test 4: Scanline Randomization
```
1. Trigger multiple collapses
2. Some will show scanlines
3. Some won't show scanlines
4. Scanlines disappear after crash ends
```

---

## ⚡ Keyboard Shortcuts

- **Ctrl + Shift + R:** Reset entire session
- **Ctrl + Shift + K:** Force collapse/evolution
- **Ctrl + S:** (Browser default) Save

---

## 🐛 Troubleshooting

### Welcome Screen Not Showing
- **Solution:** Clear browser cache and refresh
- **Check:** Console for any JavaScript errors

### Graph Not Updating
- **Solution:** Ensure you're typing in the editor
- **Check:** StatusBar component is rendering
- **Verify:** Store is properly tracking keystrokes

### Stability Not Resetting
- **Solution:** Wait for full 10-second cooldown
- **Check:** Console logs for state updates
- **Verify:** No errors in store.js

### Scanlines Always/Never Appearing
- **Solution:** This is random! Try multiple collapses
- **Check:** Approximately 50% of crashes should show them
- **Verify:** CrashEffects component is working

---

## 📁 File Structure

### New Files
```
client/src/components/
├── WelcomeScreen.jsx         # Welcome screen component
└── WelcomeScreen.css         # Welcome screen styles
```

### Modified Files
```
client/src/components/
├── StatusBar.jsx             # Added graph rendering
├── StatusBar.css             # Graph styles
└── CrashEffects.jsx          # Scanline randomization

client/src/pages/
└── EditorPage.jsx            # Welcome screen integration

client/src/utils/
└── store.js                  # Stability history & fixes
```

---

## 🎨 Customization Tips

### Change Welcome Screen Duration
In `WelcomeScreen.jsx`, line 10:
```javascript
const timer = setTimeout(() => {
  handleClose();
}, 5000); // Change 5000 to desired milliseconds
```

### Adjust Graph Data Points
In `store.js`, line 64:
```javascript
stabilityHistory: [...state.stabilityHistory.slice(-99), stability]
// Change -99 to show more/fewer historical points
```

### Modify Scanline Probability
In `CrashEffects.jsx`, line 46:
```javascript
const shouldShowScanlines = Math.random() > 0.5;
// Change 0.5 to adjust probability (0.3 = 30%, 0.7 = 70%)
```

---

## 🎯 Performance Notes

- **Graph:** Canvas-based, efficient rendering
- **Welcome Screen:** Auto-removed from DOM after dismissal
- **Scanlines:** Only active during crash animation
- **History:** Capped at 100 points to prevent memory bloat

---

## 📞 Support

### Common Issues
1. **Port already in use:** Change ports in vite.config.js and server
2. **Dependencies missing:** Run `npm install` in both client and server
3. **Build errors:** Delete node_modules and reinstall

### Debugging Mode
Enable React DevTools and check:
- Component state in WelcomeScreen
- Store values in StatusBar
- Canvas rendering in browser inspector

---

## 🏆 Credits

**Project:** Raptor Hackathon  
**Creator:** Aditya Bisht  
**Improvements:** All 4 requested features implemented  
**Tech Stack:** React + Framer Motion + Zustand + Canvas API  

---

**Enjoy your enhanced Raptor Editor!** 🦖✨

For more details, see CHANGES.md for technical documentation.
