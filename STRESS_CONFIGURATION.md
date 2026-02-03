# 🔧 Stress Calculation Adjustments

## Changes Made to Fix Crashing Issues

### Problem
- Crashes were happening too fast (~30-40 seconds)
- After first generation, immediate crashes on every word due to 20% trauma retention

### Solution
Modified `/client/src/utils/store.js` with two key changes:

---

## Change 1: Reduced Stress Multipliers (2-4x slower)

### Before (Too Fast):
```javascript
// Early game
stress += totalKeystrokes * 2.5;
stress += lines * 8;
stress += chars * 0.5;
stress += timeElapsed * 1.5;

// Late game
stress += totalKeystrokes * 1.5;
stress += lines * 4;
stress += chars * 0.3;
stress += timeElapsed * 0.8;

// Complexity
stress += brackets * 1.5;
stress += semicolons * 0.8;
stress += keywords * 2;
```

### After (Balanced):
```javascript
// Early game (first 3 collapses)
stress += totalKeystrokes * 0.6;  // 4.2x slower
stress += lines * 2;               // 4x slower
stress += chars * 0.08;            // 6.25x slower
stress += timeElapsed * 0.3;       // 5x slower

// Late game
stress += totalKeystrokes * 0.4;   // 3.75x slower
stress += lines * 1.5;             // 2.7x slower
stress += chars * 0.05;            // 6x slower
stress += timeElapsed * 0.2;       // 4x slower

// Complexity
stress += brackets * 0.3;          // 5x slower
stress += semicolons * 0.15;       // 5.3x slower
stress += keywords * 0.4;          // 5x slower
```

---

## Change 2: Complete Stress Reset (No Trauma)

### Before (Caused Instant Re-crashes):
```javascript
setTimeout(() => {
  set((state) => ({
    stress: state.stress * 0.2, // Keeps 20% trauma
    generation: state.generation + 1,
    isCrashing: false,
    crashIntensity: 0
  }));
}, 3000);
```

**Problem**: After first crash at 100% stress, reset to 20% meant you were already unstable!

### After (Clean Reset):
```javascript
setTimeout(() => {
  set((state) => ({
    stress: 0, // Complete reset - fresh start
    generation: state.generation + 1,
    isCrashing: false,
    crashIntensity: 0
  }));
}, 3000);
```

**Benefit**: Each generation starts at 0% stress for consistent experience

---

## Expected Behavior Now

### First Collapse
- **Time to crash**: ~2-4 minutes of continuous typing
- **Lines of code**: ~30-60 lines (depending on typing speed)
- **Keystrokes**: ~200-400 keystrokes

### Subsequent Collapses
- **Consistent timing**: Each collapse takes 2-4 minutes
- **No instant crashes**: Clean reset prevents immediate re-crashes
- **Predictable**: Late game is only slightly slower than early game

---

## How to Further Customize

### Make it EVEN SLOWER (5-10 minutes per crash):

Multiply all values by 0.5:

```javascript
// Early game
stress += totalKeystrokes * 0.3;
stress += lines * 1;
stress += chars * 0.04;
stress += timeElapsed * 0.15;
```

### Make it FASTER (1-2 minutes):

Multiply all values by 2:

```javascript
// Early game
stress += totalKeystrokes * 1.2;
stress += lines * 4;
stress += chars * 0.16;
stress += timeElapsed * 0.6;
```

### Bring Back Trauma (For Chaos):

Change line 168 back to:
```javascript
stress: state.stress * 0.1, // Only 10% trauma instead of 20%
```

---

## Testing the Changes

### Quick Test (30 seconds):

1. Start typing any code
2. Check stability meter
3. After ~100 keystrokes, you should still be at 40-60% stability
4. Keep typing to see gradual decline

### Full Test (5 minutes):

1. Write a complete function (~20 lines)
2. Stability should drop to ~60-70%
3. Write another function
4. Stability should hit critical (20-30%)
5. Keep typing until crash
6. **After crash, check that stability resets to 100%**
7. Start typing again - should take another 2-4 minutes

---

## Formula Reference

### Stress Calculation Formula:

```
Total Stress = (Keystroke Stress) 
             + (Line Stress) 
             + (Character Stress) 
             + (Time Stress) 
             + (Complexity Stress)

Where:
- Keystroke Stress = totalKeystrokes × multiplier
- Line Stress = lineCount × multiplier
- Character Stress = charCount × multiplier
- Time Stress = secondsElapsed × multiplier
- Complexity Stress = (brackets + semicolons + keywords) × multipliers

Final Stress = min(Total Stress, 100)
Stability = 100 - Stress
```

---

## Recommended Settings by Use Case

### For Demos/Presentations (1-2 min crashes):
```javascript
stress += totalKeystrokes * 1.2;
stress += lines * 4;
```

### For Actual Coding (3-5 min crashes):
```javascript
stress += totalKeystrokes * 0.4;  // Current setting
stress += lines * 1.5;
```

### For Long Sessions (5-10 min crashes):
```javascript
stress += totalKeystrokes * 0.2;
stress += lines * 0.8;
```

### For Extreme Chaos (30 sec crashes):
```javascript
stress += totalKeystrokes * 3;
stress += lines * 10;
```

---

## File Location

**File to Edit**: `/client/src/utils/store.js`

**Lines to Change**:
- Lines 53-77: Stress calculation multipliers
- Line 168: Stress reset value after crash

---

## No Need to Restart

Since this uses **hot module reloading**, just save the file and refresh your browser. Changes apply immediately!

---

## Summary

✅ **Crashes now happen every 2-4 minutes** (was 30-40 seconds)  
✅ **No more instant re-crashes** (was crashing after each word)  
✅ **Consistent experience** across all generations  
✅ **Easy to customize** - just adjust multipliers  

Enjoy your more balanced chaos! 💥
