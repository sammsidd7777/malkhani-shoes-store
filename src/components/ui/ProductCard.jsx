import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { productImg } from "../../lib/api";

const ProductCard = ({
  item,
  index = 0,
  onAddToWish,
  onAddToCart,
  onDelete,
  showActions = true,
  isWishcard,
  removeWish,
}) => {
  const image = item.productImg?.[0];





  return (



    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl border border-white/10 bg-ink-900/60 overflow-hidden hover:border-gold-400/30 hover:shadow-glow transition-colors duration-300"
    >

      <Link
        to={`/productDetail/${item._id}`}
        className="block relative aspect-square overflow-hidden bg-ink-800"
      >
        <img
          src={image}
          alt={item.productName}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          {isWishcard && (
            <span className="px-5 py-2 rounded-full bg-white text-black font-semibold shadow-lg">
              View Product
            </span>
          )}
        </div>
      </Link>


      {showActions &&
        (isWishcard ? (
          <button
            onClick={() => removeWish?.(item._id)}
            aria-label="Remove from wishlist"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onAddToWish?.(item._id)}
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-gold-300 hover:border-gold-400/40 transition-colors"
          >
            <Heart className="w-4 h-4" />
          </button>
        ))}

      <div className="p-4">
        <Link to={`/productDetail/${item?._id}`}>
          <h3 className="text-sm font-semibold text-white truncate group-hover:text-gold-300 transition-colors">
            {item?.productName}
          </h3>
        </Link>
        {item?.productBrand && (
          <p className="text-xs text-ink-400 mt-0.5">{item.productBrand}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="text-base font-bold text-white">
            ₹{item.productPrice?.toLocaleString?.("en-IN") ?? item.productPrice}
          </span>

          {showActions && !onDelete && (
            <button
              onClick={() => onAddToCart?.(item._id)}
              aria-label="Add to cart"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-400 hover:text-ink-950 flex items-center justify-center text-white transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(item._id)}
              aria-label="Delete product"
              className="w-9 h-9 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
