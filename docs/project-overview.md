# CRWN Clothing – Project Overview and Differentiators

## What This Project Is
- Modern React-based e-commerce experience with dark glassmorphism design, real-time search, admin tooling, and end-to-end checkout via Stripe.
- Built for both shoppers and merch managers: fast catalog browsing, quick actions, and a streamlined product CRUD flow.

## Why It’s Better Than Typical React E‑Commerce Starters
- **Design maturity**: cohesive dark theme, gradients, motion, micro-interactions, and responsive layouts out of the box (not just plain Material UI defaults).
- **Built-in admin controls**: hover-surface edit/delete buttons, animated FAB, rich delete modal, toast feedback; most starters skip management UX.
- **End-to-end payments**: Stripe Elements + Netlify serverless payment intent function already wired; no mock checkout.
- **Real-time product discovery**: search bar with live filtering, quick view modal, advanced filter panel; not just static category grids.
- **Production-ready state & network layer**: Redux + Redux-Saga + Persist for auth/cart, Axios interceptor for tokenized requests, React Query for server cache with sane defaults.
- **Mobile-first navigation**: burger menu, collapsible sidebar, mobile-friendly FAB placement, touch targets tuned for small screens.
- **Feedback-rich interactions**: confetti toasts, wiggle/pulse animations, cart sidebar micro-interactions that make the experience feel premium.

## Architecture at a Glance
- **UI**: React 18 with React Router v6; styled-components 6 for scoped theming/animations; layout split into feature routes.
- **State**:
  - Redux (v3) for app state; slices for `user`, `cart`, etc.
  - Redux-Saga for side-effects (auth, session validation) driven by action constants; `root-saga` composes feature sagas.
  - Redux-Persist (storage-backed) whitelists `cart` and `user` to survive refreshes.
- **Server state**: React Query (`queryClient` in `src/queryClient.js`) with `networkMode: 'always'`, no auto-retry, no focus refetch for predictable UX.
- **Networking**: Axios interceptor (`src/store/network/interceptor.js`) prefixes `API_BASE_URL` and injects Bearer token from Redux state.
- **Routing**: `App.js` nests routes under `Navigation` shell; pages: `/` (Home), `/shop/*`, `/auth`, `/checkout`, `/product/add`, `/product/:productId/edit`.
- **Payments**: Stripe Elements on the client (`src/utils/stripe/stripe.utils`) and a Netlify function (`netlify/functions/create-payment-intent.js`) that creates PaymentIntents using `STRIPE_SECRET_KEY`.
- **Auth**: Firebase-powered flows (see auth components) with session persistence via Redux-Persist and `CHECK_USER_SESSION` saga.
- **Styling system**: central theme (`src/styles/theme.js`), component-level styles under `components/*/*.styles.jsx`, glassmorphism cards, gradient accents.
- **Dev experience**: React Testing Library setup, Redux Logger for non-prod debugging, CRA scripts, optional Redux DevTools compose hook.

## Screens and Key UX Flows
- **Home**: hero with animated shapes, category directory grid, sidebar links.
- **Shop**: category listing, product grid, filter panel (price/colors/sizes), search bar, quick view modal (zoom, size, quantity, add-to-cart with confetti).
- **Categories Preview**: scrolling preview of all categories with counts.
- **Category Detail**: focused view per category with product cards + admin controls.
- **Checkout**: cart summary, checkout items, Stripe payment form, order confirmation.
- **Authentication**: sign-in/up with dark glassmorphism UI; Firebase-backed; persistence and session revalidation.
- **Admin – Add/Edit Product**: form route for create/update; triggered via product card hover actions or FAB.
- **Admin – Delete**: rich confirmation modal with preview and toasts (no blocking alerts).
- **Navigation**: fixed nav with blur, center search, cart icon badge; burger + slide-in mobile menu; slide-in cart sidebar.
- **Floating Action Button (FAB)**: quick actions (search, filters, scroll-top) with slide-up animation; separate Add Product FAB for admins.
- **Toast & Feedback**: global `window.showToast()` for success/error/info; confetti on celebratory actions.

## Library Integrations (How They’re Used)
- **React Router v6**: `Routes`/`Route` nesting under `Navigation`; programmatic nav via `useNavigate` when auth state changes.
- **Redux + Redux-Saga**: store setup in `src/store/store.js`; sagas (`src/store/root-saga.js`, feature sagas) handle async auth/session flows; actions defined with `USER_ACTION_TYPES` etc.
- **Redux-Persist**: wraps store with `PersistGate` in `src/index.js`; storage driver is `localStorage` via `redux-persist/lib/storage`.
- **React Query**: provider mounted in `src/index.js`; centralized client in `src/queryClient.js` with custom defaults for predictability.
- **Styled-Components**: component-level style files (`*.styles.jsx`) for theme-aware, animated UI; supports glassmorphism & gradients.
- **Stripe**: client uses `@stripe/react-stripe-js` `Elements` wrapper; serverless function creates PaymentIntents; environment uses `STRIPE_SECRET_KEY` for Netlify function and publishable key for client `stripePromise`.
- **Axios**: global interceptor injects Bearer token and base URL; avoids manual header plumbing per request.
- **Firebase**: used by auth components/sagas for sign-in/up and session checks.
- **Testing**: React Testing Library + Jest DOM; CRA test runner via `npm test`.

## Data & State Flows
- **Auth**: tokens stored in Redux; on app load (`App.js`), if a token exists dispatches `CHECK_USER_SESSION`; otherwise triggers `signOutStart`; `shouldNavigateHome` flag drives post-auth navigation.
- **Cart**: persisted locally; cart icon badge and cart sidebar read from Redux slice; add/remove triggers toasts/animations.
- **Products**: fetched via React Query + Axios; filter/search performed client-side with responsive updates; admin CRUD routes call API with interceptor for auth.
- **Payments**: checkout form posts amount to Netlify function → Stripe PaymentIntent → client confirms card details.

## Deployment & Ops
- **Build**: `npm run build` (CRA). Task runner also exposes `msbuild` task but CRA is primary web build.
- **Hosting**: suited for Netlify (already includes Netlify Functions) or any static host with serverless support for the payment intent.
- **Env Vars**: `.env` needs Stripe keys, Firebase config, API base URL override if not localhost.

## How to Run Locally
- Install deps: `npm install`.
- Add `.env` with `REACT_APP_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, Firebase keys, and optional `API_BASE_URL`.
- Start dev server: `npm start` (defaults to port 3001).
- Netlify functions locally: `netlify dev` (or proxy `/netlify/functions/create-payment-intent`).

## Extensibility Notes
- Add more sagas for catalog (see commented `categorySaga` placeholder in `root-saga`).
- React Query defaults can be tuned per-query for retries or stale times.
- Theme tokens in `src/styles/theme.js` let you scale the design system without touching component code.
- Interceptor can be extended for refresh tokens or error handling hooks.
