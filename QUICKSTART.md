# ⚡ QUICKSTART GUIDE

## Get Running in 60 Seconds

### Step 1: Prerequisites
Make sure you have:
- Node.js 18+ installed
- npm (comes with Node.js)

Check your version:
```bash
node -v  # Should be v18 or higher
npm -v   # Should be 8 or higher
```

### Step 2: Clone & Setup

```bash
# Navigate to the project
cd collapsing-ide-pro

# Run the automated setup script (Mac/Linux)
./setup.sh

# OR run the setup script (Windows)
# Use Git Bash or WSL
bash setup.sh

# OR install manually
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### Step 3: Start the Application

```bash
# Start both frontend and backend together
npm run dev
```

**That's it!** 🎉

The app will open automatically at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/api/health

---

## What Happens Next?

1. **Browser Opens** - React app loads in your default browser
2. **Monaco Editor Loads** - Professional code editor appears
3. **Start Typing** - Begin coding in Python, C++, or Java
4. **Watch the Meter** - Stability drops as you type
5. **CRASH!** - At 0% stability, the editor collapses
6. **MUTATION** - Your code transforms with new rules
7. **REPEAT** - Keep coding through multiple generations

---

## First Crash Timeline

**Aggressive Stress System** - First collapse happens FAST:

```
0:00 - Start typing
0:10 - Stability at 80%
0:20 - Stability at 50%
0:30 - Stability at 20%
0:35 - WARNING: System Unstable
0:40 - CRASH! 💥

Total time: ~40 seconds
```

---

## Test Each Feature

### 1. Language Detection (30 seconds)

Type this Python code:
```python
def hello():
    print("world")
```

The language badge should show: **🐍 PYTHON**

Now type Java:
```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

Language badge updates to: **☕ JAVA**

### 2. Force Collapse (10 seconds)

Don't want to wait? Click the **"Force Collapse"** button in the header.

Watch the intense crash effects:
- Screen shakes violently
- Red flashes
- Error cascade
- Glitch text
- Static noise

### 3. Editor Mode Changes (varies)

After a collapse, check the **Mode Indicator** in bottom-right.

You might get:
- **VSCODE** - Full Monaco editor
- **VIM** - Press `i` to insert, `Esc` to exit
- **NANO** - Terminal-style editor
- **NOTEPAD** - Classic Windows aesthetic

### 4. Code Mutations (after collapse)

Your code transforms! Example:

**Before:**
```python
def sum(a, b):
    return a + b
```

**After CHAOS mutation:**
```python
    dEf  SuM  ( a ,  b )  :
          ReTuRn     a  +  b
```

**After UPPERCASE mutation:**
```python
  DEF SUM ( A , B ) :
    RETURN A + B
```

### 5. Download Code (anytime)

Click **"Download"** button to save your mutated code as a text file.

### 6. Reset Everything (anytime)

Click **"Reset"** button to clear everything and start fresh.

---

## Keyboard Shortcuts

- `Ctrl+Shift+K` - Force collapse
- `Ctrl+Shift+R` - Reset session
- `Ctrl+S` - Download code

---

## Expected Behavior

### First 3 Collapses (FAST)
- Collapse every ~30-60 seconds
- Aggressive stress buildup
- Early chaos introduction

### Later Collapses (SLOWER)
- Collapse every ~2-3 minutes
- Still aggressive but more manageable
- System becomes unpredictable

---

## Common Questions

**Q: Why is nothing happening?**
A: Make sure you're typing! The stress builds up from keystrokes.

**Q: Editor looks broken after collapse?**
A: That's intentional! It's part of the chaos aesthetic.

**Q: Can I use this for real work?**
A: Technically yes, but... probably not recommended 😅

**Q: How do I stop a collapse?**
A: You can't. Embrace the chaos!

**Q: What's the highest generation achieved?**
A: The system is infinite. Keep going!

---

## Troubleshooting

### Frontend won't start

```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't start

```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Monaco Editor not loading

Clear browser cache and reload:
- Chrome: `Ctrl+Shift+Delete`
- Firefox: `Ctrl+Shift+Delete`

### Port already in use

Change ports in configuration:
- Frontend: `client/vite.config.js` (change port 3000)
- Backend: `server/.env` (change PORT=5000)

---

## Next Steps

After testing the basic features:

1. **Read the full README.md** - Comprehensive documentation
2. **Check DEPLOYMENT.md** - Deploy to production
3. **Customize mutations** - Edit `client/src/utils/store.js`
4. **Add new languages** - Extend language detection
5. **Create new crash effects** - Modify `CrashEffects.jsx`

---

## Demo Video (Future)

Record your screen while using the app:
- Start typing
- Show stability dropping
- Capture the crash
- Demonstrate mutation
- Show different modes

Upload to YouTube/Twitter and tag us!

---

## Support

- **Issues**: Open a GitHub issue
- **Questions**: Check the README.md
- **Bugs**: Report with steps to reproduce

---

## Have Fun!

This is a **hackathon project** designed to push boundaries and explore chaos as an aesthetic.

**Don't take it too seriously. Just enjoy the collapse! 💥**

---

## Quick Reference

| Action | Method |
|--------|--------|
| Start app | `npm run dev` |
| Force collapse | Click button or `Ctrl+Shift+K` |
| Reset | Click button or `Ctrl+Shift+R` |
| Download | Click button or `Ctrl+S` |
| Check stability | Look at status bar |
| Change language | Just type different code |

---

**Status**: Ready to collapse  
**Time to first crash**: ~40 seconds  
**Chaos level**: Maximum  

**LET'S GO! 🚀💥**
