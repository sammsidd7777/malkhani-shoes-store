import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, PackageSearch } from "lucide-react";
import toast from "react-hot-toast";

import ProductCard from "../../../components/ui/ProductCard";
import { ProductGridSkeleton } from "../../../components/ui/Skeleton";
import EmptyState from "../../../components/ui/EmptyState";
import Pagination from "../../../components/ui/Pagination";
import Button from "../../../components/ui/Button";
import { handleAddToWish } from "../ProductDetail/helperCart";

const PAGE_SIZE = 8;

const priceOptions = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹2,000", value: "2000" },
  { label: "Under ₹5,000", value: "5000" },
  { label: "Under ₹10,000", value: "10000" },
];

const colorOptions = [
  { label: "All Colors", value: "all" },
  { label: "Black", value: "black" },
  { label: "White", value: "white" },
  { label: "Brown", value: "brown" },
];

const sizeOptions = ["all", "6", "7", "8", "9"];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Filters
  const [price, setPrice] = useState("all");
  const [color, setColor] = useState("all");
  const [size, setSize] = useState("all");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/all`);
      const data = await response.json();
      const productData = data?.message?.products || [];
      setProducts(productData);
      setFilteredProducts(productData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let temp = [...products];

    if (price !== "all") {
      temp = temp.filter((p) => p.productPrice <= Number(price));
    }

    if (color !== "all") {
      temp = temp.filter((p) => p.color === color);
    }

    if (size !== "all") {
      temp = temp.filter((p) => p.size?.includes(size));
    }

    setFilteredProducts(temp);
    setPage(1);
  }, [price, color, size, products]);

  async function handleAddToCart(productId) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/cart/add/${productId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Could not add to cart");
      toast.success("Added to your cart");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  const clearFilters = () => {
    setPrice("all");
    setColor("all");
    setSize("all");
  };

  const activeFilterCount = [price, color, size].filter((v) => v !== "all").length;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pagedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredProducts, page]
  );

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest2 text-ink-400 mb-3">Price</h3>
        <div className="space-y-2">
          {priceOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPrice(opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                price === opt.value
                  ? "bg-gold-500/15 text-gold-300 border border-gold-400/30"
                  : "text-ink-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest2 text-ink-400 mb-3">Color</h3>
        <div className="space-y-2">
          {colorOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setColor(opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                color === opt.value
                  ? "bg-gold-500/15 text-gold-300 border border-gold-400/30"
                  : "text-ink-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest2 text-ink-400 mb-3">Size (UK)</h3>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-11 h-11 rounded-xl text-sm font-semibold transition-colors ${
                size === s
                  ? "bg-gold-400 text-ink-950"
                  : "border border-white/10 text-ink-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="container-page py-10 sm:py-14">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">Collection</span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tightest text-white mt-2">
              Shop Everything
            </h1>
            <p className="text-ink-400 text-sm mt-2">
              {loading ? "Loading products..." : `${filteredProducts.length} products found`}
            </p>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 h-11 px-5 rounded-full border border-white/15 text-white text-sm font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold-400 text-ink-950 text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-ink-900/50 p-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-6">Filters</h2>
              {FilterPanel}
            </div>
          </aside>

          {/* GRID */}
          <div>
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <EmptyState
                icon={PackageSearch}
                title="No products match your filters"
                subtitle="Try adjusting or clearing your filters to see more results."
                actionLabel="Clear Filters"
                onAction={clearFilters}
              />
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {pagedProducts.map((item, i) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      index={i}
                      onAddToWish={handleAddToWish}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-xs bg-ink-900 border-r border-white/10 z-[95] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {FilterPanel}
              <Button
                variant="gold"
                size="md"
                className="w-full mt-8"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Show Results
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
