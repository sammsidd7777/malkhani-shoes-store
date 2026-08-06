import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Heart, User, LogOut, Trash2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const menuItems = [
  { to: "/cart", label: "My Orders", icon: Package },
  { to: "/wishlist", label: "My Wishlist", icon: Heart },
];

const settingsItems = [
  { to: "/userdetail", label: "Profile Information" },
  { to: "/address", label: "Manage Address" },
];

const Myprofileside = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logOutUseAccount = async () => {
    try {
      localStorage.removeItem("user_role");
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/logout`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Logout failed");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const DeleteUserAccount = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_BACK_URL}/user/delete`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Delete failed");
      toast.success("Account deleted");
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 h-fit lg:sticky lg:top-28"
    >
      {/* USER */}
      <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
        <div className="w-12 h-12 rounded-full bg-gold-500/15 border border-gold-400/30 flex items-center justify-center">
          <User className="w-5 h-5 text-gold-300" />
        </div>
        <div>
          <h2 className="text-white font-bold">Hello</h2>
          <span className="text-xs text-ink-400">Welcome back</span>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active ? "bg-gold-500/15 text-gold-300" : "text-ink-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-white/10">
          <h3 className="px-4 text-[11px] font-bold uppercase tracking-widest2 text-ink-500 mb-2">
            Account Settings
          </h3>
          {settingsItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-4 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? "bg-white/10 text-white" : "text-ink-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ACTIONS */}
      <div className="pt-6 mt-6 border-t border-white/10 space-y-2">
        <button
          onClick={logOutUseAccount}
          className="w-full flex items-center gap-2 justify-center h-11 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>

        <button
          onClick={DeleteUserAccount}
          className="w-full flex items-center gap-2 justify-center h-11 rounded-xl border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>

        <Link
          to="/admin/"
          className="w-full flex items-center gap-2 justify-center h-11 rounded-xl bg-gold-500/15 text-gold-300 text-sm font-semibold hover:bg-gold-500/25 transition-colors"
        >
          <ShieldCheck className="w-4 h-4" />
          Admin Panel
        </Link>
      </div>
    </motion.aside>
  );
};

export default Myprofileside;
