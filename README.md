# 👑 CRWN Clothing - Modern E-Commerce Platform

A fully redesigned, modern e-commerce web application built with React, featuring a stunning dark theme with glassmorphism effects, interactive user experience, and comprehensive admin capabilities.

## 🌟 Features

### 🎨 Modern Design System
- **Dark Theme**: Sophisticated dark background (#0f172a) with glassmorphism effects
- **Gradient Accents**: Purple-to-pink gradients (#667eea → #764ba2) throughout
- **Smooth Animations**: Bounce effects, hover transitions, and micro-interactions
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Typography**: Poppins for headings, Inter for body text

### 🛍️ Shopping Experience

#### **Home Page**
- Full-screen hero section with floating animated shapes
- Left sidebar menu with categories, quick links, and support options
- Asymmetric masonry grid directory layout
- Category browsing with product counts

#### **Product Features**
- Real-time search bar with live filtering and dropdown results
- Quick View modal with:
  - Product zoom functionality
  - Size selection
  - Quantity adjuster
  - Add to cart with confetti animation
- Advanced filter panel (price range, colors, sizes)
- Product cards with gradient borders and hover effects

#### **Shopping Cart**
- Slide-in cart sidebar (450px width)
- Live item count with pop animation
- Cart icon with wiggle on hover
- Checkout flow with Stripe integration

### 🔐 Authentication
- Firebase authentication
- Sign in/Sign up forms with dark glassmorphism
- User session persistence with Redux Persist

### 👨‍💼 Admin Features

#### **Product Management**
- **Add Product FAB**: Floating action button (bottom-right) with pulse animation
- **Edit Products**: Modern edit button with tooltip on product cards
- **Delete Products**: 
  - Beautiful confirmation modal (no browser alerts)
  - Product preview before deletion
  - Toast notifications with confetti on success

#### **Admin Controls**
- Action buttons appear on product card hover
- Purple gradient edit button (✏️)
- Pink/red gradient delete button (✕)
- Tooltips for all admin actions

### 🎯 Interactive Elements

#### **Floating Action Button (FAB)**
- Quick access menu with 3 actions:
  - Search products
  - Open filters
  - Scroll to top
- Slide-up animation on click

#### **Toast Notification System**
- Three types: Success, Error, Info
- Auto-dismiss after 3 seconds
- Confetti animations for celebrations
- Global access via `window.showToast()`

#### **Navigation**
- Fixed navbar with blur effect
- Burger menu for mobile (slide-in animation)
- Search bar integrated in center
- Cart icon with item count badge

### 📱 Mobile Optimization
- Collapsible sidebar menu
- Touch-friendly button sizes
- Responsive grid layouts
- Optimized FAB positioning
- Mobile-specific menu navigation

## 🛠️ Technology Stack

### **Frontend**
- **React 18.2.0**: Component-based UI
- **React Router v6**: Client-side routing
- **Styled Components 6.1.0**: CSS-in-JS with animations
- **Redux 3**: State management
- **Redux Saga**: Side effect management
- **Redux Persist**: State persistence

### **Data & API**
- **React Query 5.76.1**: Server state management
- **Axios**: HTTP client
- **Firebase**: Authentication & backend

### **Payments**
- **Stripe**: Payment processing
- **@stripe/react-stripe-js**: React integration
- **Netlify Functions**: Serverless payment intents

### **Developer Tools**
- **React Testing Library**: Component testing
- **Redux Logger**: Development debugging

## 📁 Project Structure

\`\`\`
crwn-clothing-uni/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/              # Images, SVGs, icons
│   ├── components/
│   │   ├── add-product-fab/ # Floating add product button
│   │   ├── button/          # Reusable button component
│   │   ├── burger-menu/     # Hamburger menu icon
│   │   ├── cart-dropdown/   # Slide-in cart sidebar
│   │   ├── cart-icon/       # Cart with item count
│   │   ├── cart-item/       # Individual cart item
│   │   ├── category-preview/# Category section with scroll animations
│   │   ├── checkout-item/   # Checkout product row
│   │   ├── delete-modal/    # Custom delete confirmation
│   │   ├── directory/       # Home page category grid
│   │   ├── directory-item/  # Category card
│   │   ├── filter-panel/    # Advanced product filters
│   │   ├── floating-action-button/ # FAB menu
│   │   ├── form-input/      # Styled form inputs
│   │   ├── hero/            # Full-screen hero section
│   │   ├── mobile-menu/     # Mobile navigation menu
│   │   ├── payment-form/    # Stripe payment integration
│   │   ├── product-card/    # Product display with admin controls
│   │   ├── quick-view/      # Product detail modal
│   │   ├── search-bar/      # Real-time search
│   │   ├── sidebar-menu/    # Left navigation sidebar
│   │   ├── sign-in-form/    # Authentication form
│   │   ├── sign-up-form/    # Registration form
│   │   ├── spinner/         # Loading indicator
│   │   └── toast/           # Notification system
│   ├── routes/
│   │   ├── add-edit-product-form/ # Product management form
│   │   ├── authentication/  # Auth page
│   │   ├── categories-preview/ # All categories view
│   │   ├── category/        # Single category products
│   │   ├── checkout/        # Checkout page
│   │   ├── home/            # Landing page
│   │   ├── navigation/      # Main navbar
│   │   └── shop/            # Shop page
│   ├── store/
│   │   ├── cart/            # Cart state & actions
│   │   ├── middleware/      # Redux logger
│   │   ├── network/         # API calls
│   │   ├── user/            # User state & auth
│   │   ├── root-reducer.js
│   │   ├── root-saga.js
│   │   └── store.js
│   ├── utils/
│   │   ├── reducer/         # Reducer utilities
│   │   └── stripe/          # Stripe config
│   ├── App.js
│   ├── index.css            # Global styles
│   ├── index.js
│   └── queryClient.js
├── netlify/
│   └── functions/
│       └── create-payment-intent.js
├── package.json
└── README.md
\`\`\`

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/FarahBebs/crwn-clothing-uni.git
   cd crwn-clothing-uni
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env\` file in the root directory:
   \`\`\`env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm start
   \`\`\`
   The app will run on \`http://localhost:3001\`

5. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

## 🎨 Design Highlights

### **Color Palette**
- **Background**: #0f172a (Dark slate)
- **Surfaces**: rgba(30, 41, 59, 0.95) with glassmorphism
- **Primary Gradient**: #667eea → #764ba2 (Purple)
- **Accent Gradient**: #f093fb → #f5576c (Pink/Red)
- **Success**: #10b981 → #059669 (Green)
- **Text**: White with various opacity levels

### **Animation Timing**
- **Bounce**: cubic-bezier(0.34, 1.56, 0.64, 1)
- **Smooth**: 0.3s ease
- **Slow**: 0.5s ease

### **Key Animations**
- Category scroll-in with IntersectionObserver
- Cart icon wiggle and pop effects
- Confetti celebrations (50 pieces, 4s duration)
- FAB pulse animation
- Product card hover transforms
- Modal slide-up entrance

## 🔑 Key Features Breakdown

### **Search Functionality**
- Flattens all products from all categories
- Real-time filtering as you type
- Limit of 6 results in dropdown
- Click result to navigate to category
- Keyboard-friendly navigation

### **Quick View Modal**
- Size selector with available options
- Quantity adjuster (1-10)
- Image zoom on hover
- Add to cart triggers confetti
- Responsive design

### **Filter Panel**
- Price range slider
- Color swatches (checkboxes)
- Size checkboxes
- Apply/Reset functionality
- Slide-in from right

### **Admin Workflow**
1. Sign in as admin user
2. Add Product FAB appears (bottom-right)
3. Hover over products to see Edit/Delete buttons
4. Click Edit → Navigate to form with pre-filled data
5. Click Delete → Beautiful modal confirmation
6. Success → Toast notification + confetti

### **Toast System**
- Success: Green with checkmark
- Error: Red with X
- Info: Blue with info icon
- Auto-dismiss or manual close
- Stacked notifications

## 📊 State Management

### **Redux Store Structure**
\`\`\`javascript
{
  user: {
    currentUser: { /* user data */ },
    isLoading: boolean,
    error: null
  },
  cart: {
    isOpen: boolean,
    cartItems: [],
    cartCount: number,
    cartTotal: number
  }
}
\`\`\`

### **React Query Cache**
- Categories: \`['categories']\`
- Products by category: \`['products', categoryId]\`
- Auto-invalidation on mutations (add/edit/delete)

## 🧪 Testing

\`\`\`bash
npm test
\`\`\`

Includes tests for:
- Component rendering
- User interactions
- Redux state changes
- API integrations

## 🌐 Deployment

### **Netlify (Recommended)**
1. Connect your GitHub repository
2. Build command: \`npm run build\`
3. Publish directory: \`build\`
4. Add environment variables in Netlify dashboard
5. Deploy!

### **Manual Deployment**
\`\`\`bash
npm run build
# Upload build folder to your hosting service
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Credits

**Developer**: CRWN Clothing Team  
**Repository**: [github.com/FarahBebs/crwn-clothing-uni](https://github.com/FarahBebs/crwn-clothing-uni)

## 🆘 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact support via the in-app Help & Support section

---

**Built with ❤️ using React, Redux, and modern web technologies.**


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
