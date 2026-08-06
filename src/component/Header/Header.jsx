import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag, User, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/current`, {
          credentials: "include",
        });
        setIsLoggedIn(response.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="container-page">
          <div
            className={`flex items-center justify-between rounded-full border transition-all duration-300 px-4 sm:px-6 h-14 sm:h-16 ${
              scrolled
                ? "bg-ink-950/80 backdrop-blur-xl border-white/10 shadow-soft"
                : "bg-white/[0.03] backdrop-blur-md border-white/5"
            }`}
          >
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-1 shrink-0">
              <span className="text-lg sm:text-xl font-black tracking-tightest text-white">
                MALKHANI
              </span>
              <span className="text-lg sm:text-xl font-black tracking-tightest text-gold-400">
                SHOES
              </span>
            </Link>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold uppercase tracking-wide transition-colors ${
                      isActive ? "text-white" : "text-ink-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="relative pb-1">
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-gold-400 rounded-full"
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                aria-label="Search"
                className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="hidden sm:inline-flex w-10 h-10 items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              <Link
                to={isLoggedIn ? "/profile" : "/login"}
                aria-label="Account"
                className="w-10 h-10 inline-flex items-center justify-center rounded-full text-ink-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                <User className="w-[18px] h-[18px]" />
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative w-10 h-10 inline-flex items-center justify-center rounded-full bg-white text-ink-950 hover:bg-gold-200 transition-colors"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-gold-500 border-2 border-ink-950" />
              </Link>

              <button
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
                className="md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[76px] sm:h-[88px]" />

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-ink-900 border-l border-white/10 z-[95] p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-black text-white">Menu</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-3 px-4 rounded-xl text-base font-semibold uppercase tracking-wide ${
                        isActive ? "bg-white/10 text-white" : "text-ink-300"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <NavLink
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-4 rounded-xl text-base font-semibold uppercase tracking-wide text-ink-300"
                >
                  Wishlist
                </NavLink>
              </nav>

              <div className="mt-auto pt-6 border-t border-white/10">
                <Link
                  to={isLoggedIn ? "/profile" : "/login"}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center h-12 rounded-full bg-white text-ink-950 font-semibold"
                >
                  {isLoggedIn ? "My Account" : "Login / Sign Up"}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
