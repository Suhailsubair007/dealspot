# Build and Bundle Size Guide for DealSpot

## Building Your Shop Mini

### Step 1: Build the Project

Shop Minis uses the `shop-minis` CLI for building. Run:

```bash
npx shop-minis build
```

This will:
- Compile your TypeScript code
- Bundle all assets (JavaScript, CSS, images)
- Optimize the bundle for production
- Create a production-ready build

### Step 2: Check Build Output Location

After building, check where the output is located. The build typically creates a `dist` folder (or similar). Check the build output to see the exact location.

```bash
# After building, check the output
ls -lh dist/  # or check what folder was created
```

---

## Checking Bundle Size

### Method 1: Check Total Bundle Size (Quick)

After building, check the total size of all files:

```bash
# Navigate to build output directory (usually 'dist' or 'build')
cd dist

# Get total size of all files
du -sh .

# Or get detailed file sizes
du -sh * | sort -h
```

**Requirement:** Total bundle must be **< 5MB**

### Method 2: Detailed File Size Analysis

To see exactly what's taking up space:

```bash
# After build, in the dist directory
find . -type f -exec ls -lh {} \; | awk '{print $5 "\t" $9}' | sort -h -r
```

This will show:
- Individual file sizes
- Largest files first
- Help identify what's taking up the most space

### Method 3: Use Bundle Analyzer (Recommended)

To get a visual breakdown of your bundle, you can add a bundle analyzer. However, Shop Minis uses Vite internally, so you can use Vite's bundle analyzer.

**Option A: Using rollup-plugin-visualizer (Recommended)**

1. Install the analyzer:
```bash
npm install --save-dev rollup-plugin-visualizer
```

2. Create or update `vite.config.ts` (if it exists):
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

However, since Shop Minis manages the Vite config internally, you may need to check if you can customize it.

**Option B: Manual Size Check (Simpler)**

After building:

```bash
# Build first
npx shop-minis build

# Then check sizes
cd dist  # or wherever build outputs

# Total size
echo "Total bundle size:"
du -sh .

# Breakdown by file type
echo -e "\nJavaScript files:"
find . -name "*.js" -exec du -ch {} + | tail -1

echo -e "\nCSS files:"
find . -name "*.css" -exec du -ch {} + | tail -1

echo -e "\nImage files:"
find . \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) -exec du -ch {} + | tail -1
```

---

## Adding Build Script to package.json

For convenience, let's add build-related scripts to your `package.json`:

```json
{
  "scripts": {
    "build": "shop-minis build",
    "build:check-size": "shop-minis build && cd dist && du -sh . && echo '---' && find . -type f -exec ls -lh {} \\; | awk '{print $5 \"\\t\" $9}' | sort -h -r | head -20"
  }
}
```

---

## Bundle Size Requirements

According to AGENTS.md:

- ✅ **Maximum Bundle Size:** 5MB total
- ✅ **Load Time:** Must load within 3 seconds on 5G
- ✅ **Images:** Always lazy load with SDK's `<Image>` component
- ✅ **Lists:** Always virtualize long lists with `<List>`

### What to Check:

1. **Total Bundle Size** < 5MB
2. **Largest JavaScript file** should be reasonable (ideally < 2MB)
3. **Image sizes** should be optimized
4. **No unnecessary dependencies** included

---

## Troubleshooting Large Bundle Sizes

If your bundle is too large:

### 1. Check Dependencies
```bash
# See what's in your bundle
npm ls --depth=0

# Check for large dependencies
npx bundlephobia <package-name>
```

### 2. Optimize Images
- Compress images before adding to project
- Use appropriate formats (WebP for photos, SVG for icons)
- Don't include large images in the bundle

### 3. Check for Unused Code
- Remove unused imports
- Use tree-shaking friendly imports
- Remove any large unused dependencies

### 4. Code Splitting
- Ensure you're using dynamic imports where appropriate
- Shop Minis SDK should handle this, but check your code

---

## Quick Checklist

Before submission:

- [ ] Run `npx shop-minis build`
- [ ] Check total bundle size < 5MB
- [ ] Verify no single file is unreasonably large
- [ ] Test load time on actual device
- [ ] Run `npx shop-minis doctor` to catch issues
- [ ] Verify all assets are optimized

---

## Example Output

When you run the build size check, you should see something like:

```
Building...
✓ Build complete

Checking bundle size:
4.2M    dist/
--- Size breakdown:
2.1M    ./assets/index-abc123.js
1.5M    ./assets/index-def456.css
500K    ./assets/icon.png
100K    ./assets/vendor-ghi789.js
...

✅ Bundle size: 4.2M (under 5MB limit)
```

---

## Next Steps

After verifying bundle size:

1. ✅ Bundle size < 5MB
2. ✅ Update `manifest.json` with real privacy/terms URLs
3. ✅ Run `npx shop-minis doctor`
4. ✅ Test on actual device
5. ✅ Submit: `npx shop-minis submit`

