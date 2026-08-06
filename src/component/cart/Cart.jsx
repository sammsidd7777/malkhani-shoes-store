import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRazorpay } from "react-razorpay";
import { Minus, Plus, Trash2, CreditCard, ShoppingBag, Lock } from "lucide-react";
import toast from "react-hot-toast";

import EmptyState from "../../components/ui/EmptyState";
import { Skeleton } from "../../components/ui/Skeleton";
import Button from "../../components/ui/Button";
import { productImg } from "../../lib/api";

const CartSkeleton = () => (
  <div className="grid lg:grid-cols-[1fr_360px] gap-8">
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/10">
          <Skeleton className="w-24 h-24 shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      ))}
    </div>
    <Skeleton className="h-72 w-full" />
  </div>
);

const Cart = () => {
  const { Razorpay } = useRazorpay();
  const [product, setProduct] = useState([]);
  const [totalproduct, setTotalProduct] = useState(0);
  const [totalPice, setTotalPice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const cartItem = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/cart/all`, {
        credentials: "include",
      });
      const data = await res.json();
      setProduct(data.message.Cartdata);
      setTotalProduct(data.message.totalprodcut);
      setTotalPice(data.message.totalPrice);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handalDeleteCartItem = async (item) => {
    setBusyId(item._id);
    try {
      await fetch(`${import.meta.env.VITE_BACK_URL}/cart/Deletecartitem/${item.productId}`, {
        credentials: "include",
      });
      toast.success("Removed from cart");
      cartItem();
    } finally {
      setBusyId(null);
    }
  };

  const handleUpdateNumber = async (id, num) => {
    if (num < 1) return;
    await fetch(`${import.meta.env.VITE_BACK_URL}/cart/updateQuntity/${id}/${num}`, {
      credentials: "include",
    });
    cartItem();
  };

  const handlebuyKnow = async (id, num) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/payment/CreateOrder/${id}/${num}`, {
        credentials: "include",
      });
      const order = (await res.json()).message;

      const rzpay = new Razorpay({
        key: import.meta.env.VITE_RAZ_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Samm Mart",
        order_id: order.id,
        handler: async (response) => {
          await fetch(`${import.meta.env.VITE_BACK_URL}/payment/VerifiyPayment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          toast.success("Payment Successful 🎉");
        },
      });

      rzpay.open();
    } catch (error) {
      toast.error("Could not start checkout");
      console.log(error);
    }
  };

  useEffect(() => {
    cartItem();
  }, []);

  return (
    <div className="min-h-screen bg-ink-950">
      <div className="container-page py-10 sm:py-14">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">Cart</span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tightest text-white mt-2">
            Your Shopping Cart
          </h1>
        </div>

        {loading ? (
          <CartSkeleton />
        ) : product.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            subtitle="Looks like you haven't added anything yet. Explore the collection and find something you love."
            actionLabel="Continue Shopping"
            actionTo="/shop"
          />
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* CART ITEMS */}
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {product.map((item) => (
                  <motion.div
                    layout
                    key={item._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 sm:gap-5 p-4 rounded-2xl border border-white/10 bg-ink-900/50"
                  >
                    <img
                      src={productImg(item.productImg[0])}
                      alt={item.productTitle}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 bg-ink-800"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-white truncate">{item.productTitle}</h3>
                        <button
                          onClick={() => handalDeleteCartItem(item)}
                          disabled={busyId === item._id}
                          aria-label="Remove item"
                          className="text-ink-400 hover:text-red-400 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gold-300 font-bold mt-1">₹{item.productPrice}</p>

                      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                        <div className="inline-flex items-center gap-3 bg-white/5 rounded-full px-3 py-1.5">
                          <button
                            onClick={() => handleUpdateNumber(item._id, item.quantity - 1)}
                            className="text-white hover:text-gold-300"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-sm font-semibold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateNumber(item._id, item.quantity + 1)}
                            className="text-white hover:text-gold-300"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => handlebuyKnow(item.productId, item.quantity)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-gold-400 hover:text-ink-950 rounded-full px-4 py-2 transition-colors"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SUMMARY */}
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-ink-900/60 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink-300">
                  <span>Total Items</span>
                  <span className="text-white font-medium">{totalproduct}</span>
                </div>
                <div className="flex justify-between text-ink-300">
                  <span>Delivery</span>
                  <span className="text-emerald-400 font-medium">Free</span>
                </div>
              </div>

              <div className="border-t border-white/10 my-5" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-white font-semibold">Total</span>
                <span className="text-2xl font-black text-white">₹{totalPice}</span>
              </div>

              <Button variant="gold" size="lg" className="w-full" icon={Lock}>
                Proceed to Checkout
              </Button>

              <Link
                to="/shop"
                className="block text-center text-sm text-ink-400 hover:text-white mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
