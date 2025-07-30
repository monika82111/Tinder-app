"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  setProfiles,
  appendProfiles,
  undoSwipe,
} from "@/store/slices/profilesSlice";
import { fetchRandomUsers } from "@/lib/api";
import SwipeCard from "@/components/SwipeCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const dispatch = useDispatch();
  const { profiles, currentIndex } = useSelector(
    (state: RootState) => state.profiles
  );
  const liked = useSelector((state: RootState) => state.liked.liked);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    async function loadProfiles() {
      setLoading(true);
      try {
        const users = await fetchRandomUsers(20);
        dispatch(setProfiles(users));
      } catch (error) {
        console.error("Failed to load profiles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfiles();
  }, [dispatch]);

  const handleUndo = () => {
    dispatch(undoSwipe());
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      const newUsers = await fetchRandomUsers(20);
      dispatch(appendProfiles(newUsers));
    } catch (error) {
      console.error("Failed to load more profiles:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-gray-600 text-lg font-medium"
        >
          Loading profiles...
        </motion.p>
      </div>
    );
  }

  if (!profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No profiles available
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium"
          >
            Refresh
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            You&apos;ve seen all profiles!
          </h2>
          <p className="text-white/80 mb-6 text-lg leading-relaxed">
            Great job! You&apos;ve gone through all {profiles.length} profiles.
            {liked.length > 0 && (
              <span className="block mt-2">
                You&apos;ve liked {liked.length}{" "}
                {liked.length === 1 ? "person" : "people"} so far!
              </span>
            )}
          </p>

          <div className="space-y-4">
            {/* Load More Profiles */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading more profiles...
                </div>
              ) : (
                "Load More Profiles"
              )}
            </motion.button>

            {/* View Liked Users */}
            {liked.length > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/liked"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block text-center"
                >
                  View Your Liked Profiles ({liked.length})
                </Link>
              </motion.div>
            )}

            {/* Start Over */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium"
            >
              Start Fresh
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 glass rounded-xl border border-white/20"
          >
            <h3 className="text-white font-semibold mb-2">Your Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
              <div>
                <span className="block font-medium">Profiles Seen</span>
                <span className="text-pink-400 font-bold">
                  {profiles.length}
                </span>
              </div>
              <div>
                <span className="block font-medium">Liked</span>
                <span className="text-green-400 font-bold">{liked.length}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Enhanced progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 w-full max-w-md"
      >
        <div className="flex justify-between text-sm text-white mb-3">
          <span className="font-medium">
            Profile {currentIndex + 1} of {profiles.length}
          </span>
          <span className="font-medium">
            {Math.round(((currentIndex + 1) / profiles.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / profiles.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Swipe card with proper animation handling */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={profiles[currentIndex]?.id || currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <SwipeCard profile={profiles[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Enhanced undo button */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUndo}
          className="mt-8 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-medium"
        >
          <span className="text-xl">↶</span>
          Undo Last Swipe
        </motion.button>
      )}
    </div>
  );
}
