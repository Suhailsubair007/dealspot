# DealSpot – Smart Deals Discovery Engine

DealSpot is a mobile-first deals discovery experience that helps shoppers find trending products, personalized recommendations, recent browsing history, and saved favorites inside the Shop app.

## Features

- **Four discovery sections**: Trending, Recommended, Recent, and Saved products
- **Smart filtering**: Filter by shop, price range, rating, and on-sale status
- **Smooth UI**: Animated splash screen, horizontal carousels, and two-column product grids
- **Mobile-optimized**: Touch-friendly design with loading states and error handling

## Quick Start

npm install
npx shop-minis dev## Testing Steps

1. **Start the development server:**
   npx shop-minis dev
   2. **Test on iOS Simulator:**
   - Press `i` in the terminal
   - Verify splash screen animation loads
   - Check all four spot tiles are visible on home screen
   - Test navigation to each spot screen
   - Verify product grids display correctly

3. **Test on Android Emulator:**
   - Press `a` in the terminal
   - Repeat the same checks as iOS

4. **Test on Physical Device:**
   - Press `q` to show QR code
   - Scan QR code with Shop app
   - Test all features on actual device

5. **Test Filtering:**
   - Open any spot screen
   - Tap filter button
   - Test price range filter (set max price to 500)
   - Test shop filter
   - Test rating filter
   - Test on-sale filter
   - Verify filters apply correctly

6. **Test Navigation:**
   - Navigate between all screens
   - Verify smooth transitions
   - Check back navigation works
   - Test horizontal carousel scrolling on home screen

---

**Demo Video**: https://drive.google.com/file/d/1RE3iwzZRc8wMGJ9gP3hl32wx-kivTOu9/view?usp=sharing
