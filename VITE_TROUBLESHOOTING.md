# Vite 504 Error - Troubleshooting Guide

## Problem
Getting `504 (Outdated Optimize Dep)` errors when loading the React app.

## Root Cause
Vite's dependency pre-bundling cache becomes outdated when:
- Dependencies are updated
- Configuration changes
- node_modules are modified
- Vite config is changed

## ✅ Solution Applied

### 1. Updated `vite.config.js`
- Simplified React plugin configuration
- Changed port from 5175 to 5173
- Explicitly listed dependencies to optimize
- Removed problematic `force: true` option

### 2. Cleared Vite Cache
```bash
# Delete Vite's cache directory
Remove-Item -Recurse -Force frontend/node_modules/.vite
```

### 3. Restarted Dev Server
```bash
cd frontend
npm run dev
```

## 🔄 If Error Persists

### Method 1: Hard Refresh Browser
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

OR

- Windows: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

### Method 2: Clear All Caches
```powershell
# Stop all servers
Get-Process -Name node | Stop-Process -Force

# Clear Vite cache
cd frontend
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item -Recurse -Force dist

# Restart
npm run dev
```

### Method 3: Nuclear Option (Complete Reinstall)
```powershell
cd frontend

# Delete cache and dependencies
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force node_modules\.vite
Remove-Item package-lock.json

# Reinstall
npm install

# Start dev server
npm run dev
```

## 📊 What to Check

### 1. Vite Dev Server Output
When you run `npm run dev`, you should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Good signs:**
- ✅ "Optimizing dependencies" appears
- ✅ No error messages
- ✅ Server starts successfully

**Bad signs:**
- ❌ Errors about missing modules
- ❌ Port already in use
- ❌ Dependency resolution errors

### 2. Browser Console
After opening http://localhost:5173, check console (F12):

**Should see:**
- ✅ No 504 errors
- ✅ React app loaded
- ✅ Only normal app logs

**Should NOT see:**
- ❌ 504 Outdated Optimize Dep
- ❌ Failed to load resource
- ❌ Module errors

### 3. Network Tab
Check DevTools > Network tab:

**Should see:**
- ✅ All files return 200 status
- ✅ Dependencies load from `node_modules/.vite/deps/`
- ✅ Source files load properly

## 🔍 Advanced Debugging

### Check Vite Cache Location
The cache is stored in: `frontend/node_modules/.vite/`

Contents:
- `deps/` - Pre-bundled dependencies
- `_metadata.json` - Dependency metadata

### Force Re-optimization
Add to `vite.config.js` temporarily:
```js
optimizeDeps: {
  force: true, // Forces re-optimization on every start
  include: [/* your deps */]
}
```

**Note:** Remove `force: true` after first successful start!

### Check for Port Conflicts
```powershell
# Check what's using port 5173
netstat -ano | findstr :5173
```

If port is in use, either:
1. Kill the process using that port
2. Change port in `vite.config.js`

## ✨ Current Configuration

**Port:** 5173  
**Mode:** Development  
**Optimization:** Auto with explicit includes  

**Optimized Dependencies:**
- react
- react-dom  
- react-router-dom
- react-hot-toast
- react-helmet-async
- framer-motion
- axios
- react-icons

## 🎯 Expected Behavior

1. Run `npm run dev`
2. Vite optimizes dependencies (first time ~10-30 seconds)
3. Server starts on http://localhost:5173
4. Browser opens automatically
5. React app loads without errors
6. No 504 errors in console

## 📞 Still Not Working?

Try these in order:

1. **Check Node version:** `node -v` (should be 18+)
2. **Check npm version:** `npm -v` (should be 8+)
3. **Clear npm cache:** `npm cache clean --force`
4. **Reinstall Vite:** `npm install vite@latest -D`
5. **Check for system proxy/firewall blocking localhost**

## 🚀 Success Indicators

You'll know it's working when:
- ✅ Website loads at http://localhost:5173
- ✅ No console errors
- ✅ React components render
- ✅ Hot Module Replacement (HMR) works
- ✅ Theme toggle works
- ✅ Navigation works

---

**Last Updated:** After vite.config.js optimization fix  
**Status:** Should be working now! 🎉

