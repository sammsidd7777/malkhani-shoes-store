import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShieldCheck, TrendingUp, MousePointer2 } from "lucide-react";

const marqueeWords = [
  "NEW SEASON",
  "PREMIUM COMFORT",
  "STREET READY",
  "LIMITED DROP",
  "FREE SHIPPING",
];

const particles = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  top: Math.round(Math.random() * 100),
  left: Math.round(Math.random() * 100),
  size: 2 + Math.round(Math.random() * 3),
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
}));

const HeroSection = () => {

  const [count, setCount] = useState(0);

  const stageRef = useRef(null);

  // Parallax tilt on the shoe stage, following the cursor
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const shoeShiftX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const shoeShiftY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handlePointerMove = (e) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };


  const mainImg = [
    "/imagess/heroimg1.avif",
    "/imagess/heroimg2.avif",
    "/imagess/heroimg3.avif",
    "/imagess/heroimg4.avif",
    "/imagess/heroimg5.avif",
    "/imagess/heroimg6.avif",
    "/imagess/heroimg7.avif",
  ];





useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => (prev + 1) % mainImg.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);

const nextCount = (count + 1) % mainImg.length;




  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />

      {/* Fine grain texture for a premium print feel */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <motion.div
        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-20 w-[560px] h-[560px] rounded-full bg-gold-500/15 blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-32 -left-32 w-[460px] h-[460px] rounded-full bg-accent/15 blur-[110px] pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none"
      />

      {/* Floating sparkle particles */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold-300/70"
            style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0, 1, 0], y: [0, -24, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Giant outline text, editorial poster style */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block overflow-hidden">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="block text-center font-black tracking-tightest text-[11rem] xl:text-[14rem] leading-none whitespace-nowrap"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)", color: "transparent" }}
        >
          MALKHANI SHOES
        </motion.span>
      </div>

      <div className="container-page relative grid lg:grid-cols-2 gap-14 items-center pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20">
        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest2 text-gold-300"
          >
            <motion.span
              animate={{ rotate: [0, 20, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.span>
            New Season Arrival
          </motion.span>

          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tightest text-white leading-[0.92]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="block"
            >
              Step Up Your
            </motion.span>
            <span className="relative inline-block mt-1">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite] inline-block"
              >
                Sneaker Game
              </motion.span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
                viewBox="0 0 300 24"
                className="absolute left-0 -bottom-2 w-full h-4 text-gold-400/70"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 18 Q 80 4, 150 12 T 298 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-7 text-ink-300 text-lg max-w-md mx-auto lg:mx-0"
          >
            Premium footwear engineered for comfort, crafted for the streets —
            <span className="text-white font-semibold"> up to 50% off</span> your first order.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <Link
              to="/shop"
              className="group relative inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-ink-950 font-bold overflow-hidden hover:text-ink-950 transition-colors hover:shadow-glow"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold-300 to-gold-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative">Shop Now</span>
              <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 h-14 px-8 rounded-full border border-white/15 text-white font-semibold hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Our Story
            </Link>
          </motion.div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
            {[
              ["120K+", "Happy Customers"],
              ["4.8/5", "Average Rating"],
              ["30+", "Premium Brands"],
            ].map(([stat, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="text-2xl font-black text-white">{stat}</div>
                <div className="text-xs text-ink-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE STAGE — with pointer-driven parallax tilt */}
        <motion.div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          style={{ perspective: 1000 }}
          className="relative z-10 flex justify-center"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-md aspect-square"
          >
            {/* Rotating dashed ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-gold-400/25"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-white/10"
            />

            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-gold-500/25 via-gold-400/10 to-transparent blur-2xl" />

            {/* Secondary shoe, back layer */}
            <motion.img
              initial={{ opacity: 0, x: 30, rotate: 8 }}
              animate={{ opacity: 0.5, x: 0, rotate: 18, y: [0, 12, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.3 },
                x: { duration: 0.8, delay: 0.3 },
                y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              }}
              src={mainImg[count]}
              alt=""
              className="absolute -right-6 bottom-2 w-1/2 object-contain drop-shadow-2xl blur-[1px] saturate-50"
            />

            {/* Main shoe — follows cursor slightly, floats, tilts */}
           <motion.img
  style={{ x: shoeShiftX, y: shoeShiftY }}
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    y: [0, -18, 0],
    rotate: [-3, 3, -3],
  }}
  transition={{
    opacity: { duration: 0.5 },
    y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  }}
  src={mainImg[nextCount]}
  alt="Featured sneaker"
  className="relative w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.65)]"
/>

            {/* Floating glass card — rating */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.6 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-4 left-0 sm:-left-4 glass rounded-2xl px-4 py-3 shadow-card flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-gold-400/20 flex items-center justify-center">
                <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">4.9/5</p>
                <p className="text-[11px] text-ink-400 mt-1">2,300+ reviews</p>
              </div>
            </motion.div>

            {/* Floating glass card — trending */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.8 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }}
              className="absolute bottom-8 right-0 sm:-right-6 glass rounded-2xl px-4 py-3 shadow-card flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-400/15 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-none">Trending</p>
                <p className="text-[11px] text-ink-400 mt-1">#1 in Sneakers</p>
              </div>
            </motion.div>

            {/* Discount badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: [-12, -6, -12] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.5 },
                scale: { duration: 0.6, delay: 0.5, type: "spring" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="absolute top-2 right-2 sm:right-6 w-16 h-16 rounded-full bg-gold-400 flex flex-col items-center justify-center shadow-glow"
            >
              <span className="text-ink-950 font-black text-sm leading-none">50%</span>
              <span className="text-ink-950 font-bold text-[9px] uppercase tracking-wide">off</span>
            </motion.div>

            {/* Authenticity chip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -bottom-2 left-4 sm:left-8 inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] font-semibold text-white">100% Authentic</span>
            </motion.div>
          </motion.div>

          {/* Cursor hint, desktop only, fades once user moves */}
          <motion.div
            initial={{ opacity: 0.6 }}
            whileHover={{ opacity: 0 }}
            className="hidden lg:flex absolute bottom-0 right-0 items-center gap-1.5 text-[11px] text-ink-500 pointer-events-none"
          >
            <MousePointer2 className="w-3 h-3" />
            move to explore
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <div className="relative border-y border-white/10 bg-white/[0.02] py-3 overflow-hidden">
        <div className="flex w-max animate-marquee gap-10">
          {Array.from({ length: 4 }).flatMap((_, loop) =>
            marqueeWords.map((word, i) => (
              <span
                key={`${loop}-${i}`}
                className="flex items-center gap-10 text-xs font-bold uppercase tracking-widest2 text-ink-400"
              >
                {word}
                <span className="text-gold-500">●</span>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
