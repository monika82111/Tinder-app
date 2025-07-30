# TinderSwipe - A Tinder-like Dating App

A modern, responsive dating app built with Next.js, TypeScript, Redux Toolkit, and Framer Motion. Features swipeable cards, profile viewing, and liked users management.

## 🚀 Features

### Core Functionality

- **Swipeable Cards**: Swipe left to skip, right to like profiles
- **Smooth Animations**: Beautiful card animations using Framer Motion
- **Profile Details**: View detailed profiles with additional information
- **Liked Users**: Manage and view all liked profiles
- **Undo Functionality**: Undo your last swipe
- **Progress Tracking**: See your progress through available profiles

### Enhanced Features

- **Match Percentage**: Each profile shows a compatibility percentage
- **User Interests**: Display user interests as tags
- **Rich Profiles**: Extended profile information including contact details
- **Persistent Storage**: Liked users are saved using Redux Persist
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: Global state management with persistence
- **Next.js App Router**: Modern routing with server components
- **Tailwind CSS**: Utility-first styling
- **Random User API**: Real user data from randomuser.me

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **API**: Random User API (randomuser.me)

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tinder-swipe
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How to Use

### Swiping

- **Swipe Right**: Like a profile (♥)
- **Swipe Left**: Skip a profile (✕)
- **Click Buttons**: Use the circular buttons at the bottom
- **View Profile**: Click the eye button to see full details

### Navigation

- **Home**: Main swiping interface
- **Liked**: View all your liked profiles
- **Profile Details**: Click "View Profile" on any card

### Features

- **Undo**: Click "Undo Last Swipe" to go back
- **Progress**: See your progress through available profiles
- **Match %**: Each profile shows compatibility percentage
- **Interests**: View user interests as colored tags

## 📱 Pages

### Home Page (`/`)

- Main swiping interface
- Progress indicator
- Undo functionality
- Smooth card animations

### Liked Users (`/liked`)

- Grid view of all liked profiles
- Remove users from liked list
- View detailed profiles
- Empty state with call-to-action

### Profile Details (`/profile/[id]`)

- Full profile information
- Contact details
- User interests
- Match percentage
- Navigation back to swiping

## 🎨 UI/UX Features

- **Modern Design**: Clean, card-based interface
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive**: Works on all screen sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Beautiful loading spinners and empty states

## 🔧 Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with Redux provider
│   ├── page.tsx        # Main swiping page
│   ├── liked/          # Liked users page
│   └── profile/[id]/   # Profile detail pages
├── components/         # Reusable components
│   ├── Navbar.tsx     # Navigation component
│   └── SwipeCard.tsx  # Main swipe card component
├── store/             # Redux store and slices
│   ├── index.tsx      # Store configuration
│   └── slices/        # Redux slices
└── lib/               # Utility functions
    └── api.ts         # API functions
```

### Key Components

#### SwipeCard

- Handles swipe gestures and animations
- Displays profile information
- Manages like/skip actions

#### Redux Store

- **profilesSlice**: Manages profile data and current index
- **likedSlice**: Manages liked users with persistence

#### API Integration

- Fetches random users from randomuser.me
- Generates match percentages and interests
- Creates realistic user bios

## 🚀 Deployment

The app can be deployed to Vercel, Netlify, or any other Next.js compatible platform:

```bash
npm run build
npm start
```

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Real-time messaging
- [ ] Photo galleries
- [ ] Advanced matching algorithms
- [ ] Push notifications
- [ ] Dark mode support
- [ ] User settings and preferences

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
