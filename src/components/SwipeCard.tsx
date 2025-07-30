"use client";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useDispatch } from "react-redux";
import { nextProfile } from "@/store/slices/profilesSlice";
import { likeUser } from "@/store/slices/likedSlice";
import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from "next/image";

interface Profile {
  id: string;
  name: string;
  age: number;
  picture: string;
  location: string;
  bio?: string;
  interests?: string[];
  matchPercentage?: number;
}

export default function SwipeCard({ profile }: { profile: Profile }) {
  const controls = useAnimation();
  const dispatch = useDispatch();
  const [swiped, setSwiped] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(
    null
  );

  useEffect(() => {
    controls.set({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
    });
    setSwiped(false);
    setDragDirection(null);
  }, [profile.id, controls]);

  const swipe = async (direction: "left" | "right") => {
    if (swiped) return;
    setSwiped(true);
    setDragDirection(direction);

    await controls.start({
      x: direction === "right" ? 400 : -400,
      y: -50,
      rotate: direction === "right" ? 20 : -20,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeOut" },
    });

    if (direction === "right") dispatch(likeUser(profile.id));
    dispatch(nextProfile());
  };

  const handleDragEnd = (event: PointerEvent, info: PanInfo) => {
    if (swiped) return;

    if (info.offset.x > 100) {
      swipe("right");
    } else if (info.offset.x < -100) {
      swipe("left");
    } else {
      controls.start({ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 });
    }
  };

  const handleDrag = (event: PointerEvent, info: PanInfo) => {
    if (swiped) return;
    const direction = info.offset.x > 0 ? "right" : "left";
    setDragDirection(direction);
  };

  return (
    <div className="relative w-80 h-[28rem]">
      {/* Background cards for depth effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl transform rotate-3 scale-95 opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl transform -rotate-2 scale-97 opacity-30"></div>

      <motion.div
        className="w-full h-full bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-4 relative cursor-grab active:cursor-grabbing border border-white/20"
        animate={controls}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        style={{ zIndex: 10 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
      >
        {/* Match percentage with glass effect */}
        {profile.matchPercentage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 glass px-4 py-2 rounded-full text-sm font-bold z-20 shadow-lg"
          >
            <span className="gradient-text font-bold">
              {profile.matchPercentage}%
            </span>
            <span className="text-gray-700 ml-1">match</span>
          </motion.div>
        )}

        {/* Enhanced swipe indicators */}
        {dragDirection === "right" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg border-2 border-white/20"
          >
            ❤️ LIKE
          </motion.div>
        )}

        {dragDirection === "left" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12 shadow-lg border-2 border-white/20"
          >
            ❌ NOPE
          </motion.div>
        )}

        {/* Profile image with enhanced styling */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={profile.picture}
            className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
            alt={profile.name}
            // width={200} // required
            // height={200} // required
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        <div className="px-2">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {profile.name}, {profile.age}
          </h2>
          <p className="text-gray-500 flex items-center gap-2 mb-3">
            <span className="text-pink-500">📍</span>
            {profile.location}
          </p>
          {profile.bio && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>
          )}
          {profile.interests && profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.interests
                .slice(0, 3)
                .map((interest: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs px-3 py-1 rounded-full border border-pink-200 shadow-sm"
                  >
                    {interest}
                  </motion.span>
                ))}
            </div>
          )}
        </div>

        {/* Enhanced action buttons */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-6 px-4">
          <motion.button
            onClick={() => swipe("left")}
            className="bg-gradient-to-r from-red-400 to-red-500 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 btn-hover pulse-glow flex items-center justify-center"
            disabled={swiped}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">✕</span>
          </motion.button>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`/profile/${profile.id}`}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 flex items-center justify-center"
            >
              <span className="text-xl">👁</span>
            </Link>
          </motion.div>

          <motion.button
            onClick={() => swipe("right")}
            className="bg-gradient-to-r from-green-400 to-green-500 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 btn-hover pulse-glow flex items-center justify-center"
            disabled={swiped}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl">♥</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
