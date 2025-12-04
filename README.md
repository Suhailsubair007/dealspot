# DealSpot – Smart Deals Discovery Engine (Shop Mini)

DealSpot is a fast, mobile-first deals discovery experience designed to help shoppers instantly find the best offers across categories. It combines smart product curation, smooth navigation, and a clean interface to make deal hunting effortless and enjoyable. Every section is carefully organized so users can explore trending picks, personalized recommendations, recent browsing history, and saved favorites without any clutter or complexity.

## First Impression

- **Animated splash screen** with smooth gradient transitions and elegant branding
- **Vibrant gradient hero header** with "DealSpot" title and tagline
- **Four quick-action tiles** arranged in a 2x2 grid:
  1. **Trending Spot** – Discover what's popular across Shop
  2. **Recommended Spot** – Hand-picked for you by Shop
  3. **Recent Spot** – Pick up where you left off
  4. **Saved Spot** – Your favorites in one place

## Smart Product Curation

Each section highlights products based on real-world shopping signals and user behavior:

- **Trending Spot** → Popular products with high engagement
- **Recommended Spot** → Personalized recommendations tailored to you
- **Recent Spot** → Products you've recently viewed
- **Saved Spot** → Your saved favorites and wishlist items

## Filter & Refine Experience

A simple and intuitive bottom sheet helps users refine results instantly:

- **Filter by Shop/Brand** – Select specific stores to browse
- **Price Range** – Set minimum and maximum price filters
- **Minimum Rating** – Filter by 4+, 3+, 2+, or 1+ star ratings
- **Special Offers** – Show only products currently on sale
- **Real-time updates** with smooth transitions
- **Active-filter indicators** and one-tap reset

## Smooth & Performant UI

- **Horizontal carousels** with smooth snapping scroll on the home screen
- **Clean two-column grids** for product browsing in full-screen views
- **Infinite scrolling** with quick loading placeholders
- **Skeleton loaders** for instant visual feedback
- **Soft transitions** and touch-optimized layouts
- **View transitions** for seamless navigation between screens

## Home Screen Experience

- **Gradient header** with "DealSpot" branding and tagline
- **Quick-action tiles** arranged in a responsive 2x2 grid
- **Continue Exploring carousel** – Horizontal scrollable carousel showing recent products
- **Clear empty states** and helpful messages
- **Loading skeletons** for instant visual feedback
- **Decorative background elements** with subtle gradient blurs

## Full-Screen Product Lists

- **Dedicated screens** for each category (Trending, Recommended, Recent, Saved)
- **Organized product grids** with smooth scrolling
- **Sort and filter buttons** always accessible via header
- **Clean loading states** and informative empty screens
- **Filter bottom sheet** with comprehensive filtering options

## User Experience Journey

DealSpot ensures a fluid and enjoyable browsing journey:

- **Welcoming splash animation** sets the tone
- **Clean and organized home sections** for easy navigation
- **Easy navigation** between categories via spot tiles
- **Instant access** to refined results with filtering
- **Smooth transitions** tailored for mobile use
- **Error boundaries** for graceful error handling

## What Makes DealSpot Unique

- **Truly curated discovery** using Shopify's smart product APIs
- **Fast, clutter-free, mobile-optimized** experience built for Shop app
- **Clear navigation** with intuitive filtering and sorting
- **Personalized experience** with recommended and recent products
- **Visually polished** with gradient themes and smooth animations
- **Built with performance in mind** – optimized rendering and transitions
- **SDK-first approach** – leverages Shopify Shop Minis React components

## Tech Stack

- **Shopify Shop Minis SDK** – Official SDK for building Shop Minis
- **React** – Modern React with hooks and functional components
- **TypeScript** – Full type safety throughout the codebase
- **Tailwind CSS** – Utility-first styling with custom gradient theme
- **React Router** – Client-side routing with view transitions
- **Lucide React** – Beautiful icon library for UI elements

## Setup Instructions

1. **Install dependencies:**
   npm install
   2. **Start the development server:**
 
   npx shop-minis dev
   3. **Test on devices:**
   - Press `i` to open in iOS Simulator
   - Press `a` to open in Android Emulator
   - Press `q` to show QR code for physical device testing

4. **Open the Shop app** in developer mode to preview your mini.

## Project Structure

```
src/
├── app/
│   ├── App.tsx           # Main app component with splash screen
│   └── router.tsx         # Route configuration
├── components/
│   ├── common/            # Reusable components
│   │   ├── FilterBottomSheet.tsx
│   │   ├── SpotTile.tsx
│   │   ├── EmptyState.tsx
│   │   └── ErrorBoundary.tsx
│   ├── layout/            # Layout components
│   │   ├── ScreenContainer.tsx
│   │   └── SectionHeader.tsx
│   ├── product/          # Product-related components
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   └── SplashScreen.tsx  # Animated splash screen
├── screens/              # Full-screen views
│   ├── HomeScreen.tsx
│   ├── TrendingSpotScreen.tsx
│   ├── RecommendedSpotScreen.tsx
│   ├── RecentSpotScreen.tsx
│   └── SavedSpotScreen.tsx
├── hooks/                # Custom hooks
│   ├── useTrendingSpot.ts
│   ├── useRecommendedSpot.ts
│   ├── useRecentSpot.ts
│   └── useSavedSpot.ts
├── utils/                # Utility functions
│   └── filterUtils.ts    # Product filtering logic
├── constants.ts          # App constants and configs
└── types/               # TypeScript type definitions
```

## Key Features

- ✅ Animated splash screen with smooth transitions
- ✅ Four curated product discovery sections
- ✅ Comprehensive filtering (shop, price, rating, on-sale)
- ✅ Horizontal carousels with snap scrolling
- ✅ Two-column product grids
- ✅ Loading skeletons and empty states
- ✅ Error boundaries for graceful error handling
- ✅ Mobile-first, touch-optimized design
- ✅ Gradient theme with purple/blue color palette
- ✅ View transitions for smooth navigation

## Demo Video

https://drive.google.com/file/d/1RE3iwzZRc8wMGJ9gP3hl32wx-kivTOu9/view?usp=sharing

---

DealSpot is built to provide users with a quick and easy way to discover trending products, personalized recommendations, and their saved favorites inside the Shop app. It's simple, lightweight, and focused entirely on user convenience and delightful mobile experiences.
