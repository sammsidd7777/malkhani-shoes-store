import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../../components/ui/SectionHeading";
import ProductCard from "../../components/ui/ProductCard";
import { ProductGridSkeleton } from "../../components/ui/Skeleton";
import EmptyState from "../../components/ui/EmptyState";
import { PackageSearch } from "lucide-react";

const tabs = [
  { key: "best", label: "Big Deals" },
  { key: "discount", label: "Big Discount" },
  { key: "new", label: "New Arrivals" },
];

const ProductFilterSection = ({
  bestSellers,
  popular,
  trending,
  handleAddToWish,
  handleAddToCart,
  loading = false,
}) => {
  const [activeFilter, setActiveFilter] = useState("best");

  const products =
    activeFilter === "best" ? bestSellers : activeFilter === "discount" ? popular : trending;

  return (
    <section className="py-16 sm:py-24 bg-ink-950">
      <div className="container-page">
        <SectionHeading
          eyebrow="Curated For You"
          title="Featured Collection"
          subtitle="Hand-picked styles trending across the store right now."
        />

        {/* TABS */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`relative px-5 h-11 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeFilter === tab.key
                  ? "text-ink-950"
                  : "text-ink-300 hover:text-white border border-white/10 hover:border-white/25"
              }`}
            >
              {activeFilter === tab.key && (
                <motion.span
                  layoutId="home-tab-pill"
                  className="absolute inset-0 rounded-full bg-gold-400"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : products.length === 0 ? (
          <EmptyState icon={PackageSearch} title="No products yet" subtitle="Check back soon for new drops." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.slice(0, 4).map((item, i) => (
              <ProductCard
                key={item._id}
                item={item}
                index={i}
                onAddToWish={handleAddToWish}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductFilterSection;
