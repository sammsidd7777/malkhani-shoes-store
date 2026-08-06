import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Star, TrendingUp } from "lucide-react";

import { handleAddToCart, handleAddToWish } from "./helperCart";
import Button from "../../../components/ui/Button";
import RatingStars from "../../../components/ui/RatingStars";
import ProductCard from "../../../components/ui/ProductCard";
import { Skeleton } from "../../../components/ui/Skeleton";
import SectionHeading from "../../../components/ui/SectionHeading";
import { productImg } from "../../../lib/api";

const perks = [
  { icon: Truck, label: "Free Shipping", sub: "On all orders over ₹2,000" },
  { icon: RotateCcw, label: "Easy Returns", sub: "30-day return window" },
  { icon: ShieldCheck, label: "Authentic Guarantee", sub: "100% genuine products" },
];

const ProductDetailSkeleton = () => (
  <div className="container-page py-12">
    <Skeleton className="h-4 w-40 mb-8" />
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="flex gap-4">
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-16 h-16" />
          ))}
        </div>
        <Skeleton className="flex-1 aspect-square" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-1/2" />
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const [detail, setDetail] = useState(null);
  const [product, setProduct] = useState([]);
  const [mainImg, setMainImg] = useState("");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BACK_URL}/products/detail/${id}`);
        const data = await res.json();

        const d = data.message.datas.product_detail;

        setDetail(d);
        setProduct(data.message.datas.product);
        setMainImg(productImg(d.productImg[0]));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (!detail) return null;

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="container-page py-8 sm:py-12">
        {/* BREADCRUMB */}
        <div className="text-xs text-ink-400 mb-8 flex items-center gap-2">
          <span className="uppercase tracking-widest2 text-gold-400 font-bold">
            {detail.productBrand}
          </span>
          <span>/</span>
          <span>{detail.productName}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col-reverse sm:flex-row gap-4"
          >
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {detail.productImg.map((img, i) => {
                const src = productImg(img);
                const active = mainImg === src;
                return (
                  <button
                    key={i}
                    onClick={() => setMainImg(src)}
                    className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-colors ${active ? "border-gold-400" : "border-white/10 hover:border-white/30"
                      }`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>

            <div className="relative flex-1 rounded-3xl ">
              <AnimatePresence mode="wait">
                {/* <motion.img
                  key={mainImg}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={mainImg}
                  alt={detail.productName}
                  className="w-full h-full object-contain p-8"
                /> */}

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
                      src={mainImg}
                      alt=""
                      className="absolute -right-6 bottom-2 w-1/2 object-contain drop-shadow-2xl blur-[1px] saturate-50"
                    />

                    {/* Main shoe — follows cursor slightly, floats, tilts */}
                    <motion.img
                      style={{ x: shoeShiftX, y: shoeShiftY }}
                      animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      src={mainImg}
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

                  </motion.div>
                </motion.div>

























              </AnimatePresence>
            </div>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl sm:text-4xl font-black tracking-tightest text-white leading-tight">
              {detail.productName}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <RatingStars rating={4.8} showValue />
              <span className="text-ink-500 text-sm">•</span>
              <span className="text-sm text-ink-400">128 reviews</span>
            </div>

            <p className="text-3xl font-bold text-white mt-6">
              ₹{detail.productPrice?.toLocaleString?.("en-IN") ?? detail.productPrice}
            </p>

            <p className="text-ink-300 leading-relaxed mt-6 max-w-lg">
              {detail.productDescription}
            </p>

            <div className="flex items-center gap-3 mt-8">
              <Button
                variant="gold"
                size="lg"
                icon={ShoppingCart}
                onClick={() => handleAddToCart(detail._id)}
                className="flex-1 sm:flex-none sm:px-12"
              >
                Add to Cart
              </Button>

              <button
                onClick={() => handleAddToWish(detail._id)}
                aria-label="Add to wishlist"
                className="w-14 h-14 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-gold-300 hover:border-gold-400/40 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* PERKS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/10">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-start gap-3">
                  <perk.icon className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">{perk.label}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{perk.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SIMILAR */}
        {product.length > 0 && (
          <div className="mt-20 sm:mt-28">
            <SectionHeading
              align="left"
              eyebrow="You May Also Like"
              title="Similar Products"
              className="mx-0"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {product.map((item, i) => (
                <ProductCard
                  key={item._id}
                  item={item}
                  index={i}
                  onAddToWish={handleAddToWish}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
