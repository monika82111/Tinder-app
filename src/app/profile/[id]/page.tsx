"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
export default function ProfileDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const profiles = useSelector((state: RootState) => state.profiles.profiles);
  const liked = useSelector((state: RootState) => state.liked.liked);
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">😕</div>
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Profile not found
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:shadow-xl transition-all duration-300 font-medium inline-block"
            >
              Back to Swiping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const isLiked = liked.includes(profile.id);

  return (
    <div className="max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Header image */}
        <div className="relative">
          <Image
            src={profile.picture}
            className="w-full h-80 object-cover"
            alt={profile.name}
            // width={200} // required
            // height={200} // required
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {isLiked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              ♥ Liked
            </motion.div>
          )}
          {profile.matchPercentage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 left-4 glass px-4 py-2 rounded-full text-sm font-bold shadow-lg"
            >
              <span className="gradient-text font-bold">
                {profile.matchPercentage}%
              </span>
              <span className="text-white/80 ml-1">match</span>
            </motion.div>
          )}
        </div>

        {/* Profile info */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-6"
          >
            <h1 className="text-3xl font-bold text-white">
              {profile.name}, {profile.age}
            </h1>
            <span className="text-pink-400 text-2xl">📍</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 mb-6 flex items-center gap-3 text-lg"
          >
            <span className="text-pink-400">📍</span>
            {profile.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-t border-white/20 pt-6 mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-3">About</h3>
            <p className="text-white/70 leading-relaxed">
              {profile.bio || "This person hasn't written a bio yet."}
            </p>
          </motion.div>

          {profile.interests && profile.interests.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t border-white/20 pt-6 mb-6"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.interests.map((interest: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-gradient-to-r from-pink-100/20 to-purple-100/20 text-white/80 px-4 py-2 rounded-full border border-white/20"
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="border-t border-white/20 pt-6 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-white/70 flex items-center gap-3"
              >
                <span className="text-blue-400 text-xl">✉️</span>
                {profile.email}
              </motion.p>
              {profile.phone && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-white/70 flex items-center gap-3"
                >
                  <span className="text-green-400 text-xl">📞</span>
                  {profile.phone}
                </motion.p>
              )}
              {profile.nationality && (
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-white/70 flex items-center gap-3"
                >
                  <span className="text-purple-400 text-xl">🌍</span>
                  {profile.nationality}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
            >
              ← Back
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                href="/"
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 text-center font-medium block"
              >
                Continue Swiping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
