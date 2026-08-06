import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowRight, Frown } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-ink-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center mb-8">
          <Frown className="w-9 h-9 text-gold-400" strokeWidth={1.5} />
        </div>

        <h1 className="text-7xl font-black tracking-tightest bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mt-4">Page not found</h2>
        <p className="text-ink-400 mt-3">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="group inline-flex items-center gap-2 h-12 px-7 rounded-full bg-white text-ink-950 font-semibold mt-8 hover:bg-gold-200 transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
