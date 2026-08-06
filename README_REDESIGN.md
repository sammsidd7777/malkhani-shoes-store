# Malkhani Shoes — Premium Redesign Notes

## What changed
This is a full frontend redesign of your React e-commerce app. **No API endpoints,
request payloads, auth flow, database models, or business logic were changed.**
Every `fetch()` call uses the exact same URL, method, and body as before — you can
verify this by searching for `localhost:5200` across `src/`.

## Stack additions
- Tailwind CSS (was listed as a dependency but never actually configured — now fully wired up)
- `framer-motion` for page/section/hover animations
- `lucide-react` for icons (replaces the old FontAwesome CDN link, which is no longer needed)
- `react-hot-toast` (already a dependency) now used for success/error feedback instead of `alert()`

## New design system
- `tailwind.config.js` — dark, premium palette (ink/gold/accent), custom shadows, radii, and animations
- `src/components/ui/` — a small reusable component library: Button, IconButton, ProductCard,
  RatingStars, SectionHeading, Skeleton loaders, EmptyState, Modal, Badge, Pagination, form Fields
- `src/lib/api.js` — centralizes the API base URL (same value, just no longer duplicated in every file)

## Structural fixes (not behavior changes)
- `App.jsx`: the router previously mixed a `<Routes>` block inside the `createBrowserRouter` array,
  which would throw at runtime. Rebuilt as clean nested routes — **all the same URL paths**.
- Fixed a case-sensitive import (`Checkuser` vs the actual `CheckUser.jsx`) that breaks on
  Linux/production builds (works by accident on case-insensitive Windows/Mac filesystems).
- Removed two unused/dead files (`component/UserProfile/Wishlist.jsx`, `pages/page/Error/ErrorPage.jsx`)
  that weren't wired into any route.
- Cart, Wishlist, and Profile pages no longer render their own duplicate `<Header>`/`<Footer>` —
  they're now nested inside `UserLayout`, same as Home/Shop/etc.

## Pages redesigned
Home, Shop (with filter sidebar + pagination), Product Detail, Cart, Login, Sign Up, Wishlist,
Profile, About, 404, and the full Admin panel (sidebar layout, Add Product, Check/Delete Product,
Check Users, Make Admin, Remove Admin).

## Running it
```bash
npm install
npm run dev      # local dev server
npm run build    # production build (verified passing)
```

Your backend should still run on `${import.meta.env.VITE_BACK_URL}` as before — that hasn't changed.
