"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { removeLiked } from "@/store/slices/likedSlice";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LikedPage() {
  const liked = useSelector((state: RootState) => state.liked.liked);
  const profiles = useSelector((state: RootState) => state.profiles.profiles);
  const dispatch = useDispatch();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const likedProfiles = profiles.filter((p) => liked.includes(p.id));

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    // Add a small delay for better UX
    setTimeout(() => {
      dispatch(removeLiked(id));
      setRemovingId(null);
    }, 200);
  };

  if (!likedProfiles.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            💔
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            No liked users yet
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Start swiping to find people you like!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block"
            >
              Start Swiping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold gradient-text mb-3">Liked Users</h1>
        <p className="text-white/80 text-lg">
          You&apos;ve liked {likedProfiles.length}{" "}
          {likedProfiles.length === 1 ? "person" : "people"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {likedProfiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass rounded-2xl overflow-hidden card-hover border border-white/20 ${
              removingId === profile.id ? "opacity-50 scale-95" : ""
            }`}
          >
            <div className="relative">
              <Image
                src={profile.picture}
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                alt={profile.name}
                // width={200} // required
                // height={200} // required
              />
              <div className="absolute top-3 right-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                ♥ Liked
              </div>
              {profile.matchPercentage && (
                <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-xs font-bold">
                  <span className="gradient-text font-bold">
                    {profile.matchPercentage}%
                  </span>
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-white text-lg mb-2">
                {profile.name}, {profile.age}
              </h3>
              <p className="text-white/70 text-sm mb-3 flex items-center gap-2">
                <span className="text-pink-400">📍</span>
                {profile.location}
              </p>

              {profile.bio && (
                <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>
              )}

              {profile.interests && profile.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.interests
                    .slice(0, 2)
                    .map((interest: string, idx: number) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-pink-100/20 to-purple-100/20 text-white/80 text-xs px-2 py-1 rounded-full border border-white/20"
                      >
                        {interest}
                      </span>
                    ))}
                </div>
              )}

              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1"
                >
                  <Link
                    href={`/profile/${profile.id}`}
                    className="bg-gradient-to-r from-blue-400 to-blue-500 text-white py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-300 text-center text-sm font-medium block"
                  >
                    View Profile
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemove(profile.id)}
                  disabled={removingId === profile.id}
                  className="bg-gradient-to-r from-red-400 to-red-500 text-white py-2 px-3 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium disabled:opacity-50"
                >
                  Remove
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {likedProfiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block"
            >
              Continue Swiping
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
