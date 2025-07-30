"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
//   const liked = useSelector((state: RootState) => state.liked.liked);

  return (
    <nav className="w-full glass border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300 flex items-center gap-3"
            >
              <span className="text-4xl">💕</span>
              <span className="hidden sm:inline">TinderSwipe</span>
              <span className="sm:hidden">TS</span>
            </Link>
          </motion.div>

          <div className="flex items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="text-white hover:text-pink-200 transition-colors duration-300 font-medium px-4 py-2 rounded-full hover:bg-white/10"
              >
                Swipe
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/liked"
                className="text-white hover:text-pink-200 transition-colors duration-300 font-medium flex items-center gap-3 px-4 py-2 rounded-full hover:bg-white/10"
              >
                <span>Liked Profiles</span>
                
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
