import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-16 sm:py-24 bg-ink-950">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900 via-ink-900 to-gold-900/20 px-8 py-16 sm:py-20 text-center"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tightest text-white">
              Upgrade Your Style Today
            </h2>
            <p className="text-ink-300 text-lg mt-4 max-w-md mx-auto">
              Exclusive deals and top-quality shoes await you.
            </p>
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 h-14 px-9 rounded-full bg-white text-ink-950 font-bold mt-8 hover:bg-gold-200 transition-colors"
            >
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
