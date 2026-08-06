import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  PackagePlus,
  PackageSearch,
  PackageCheck,
  Users,
  UserMinus,
  ShieldPlus,
  ShieldMinus,
  LogOut,
  Trash2,
  LayoutDashboard,
} from "lucide-react";

const productLinks = [
  { to: "/admin/add/product", label: "Add Product", icon: PackagePlus },
  { to: "/admin/admin-product", label: "Check & Delete Product", icon: PackageSearch },
  { to: "/admin/update-product", label: "Update Product", icon: PackageCheck },
];

const userLinks = [
  { to: "/admin/checkuser", label: "Check User", icon: Users },
  { to: "/admin/removeuser", label: "Remove User", icon: UserMinus },
  { to: "/admin/makeadmin", label: "Appoint Admin", icon: ShieldPlus },
  { to: "/admin/removeadmin", label: "Remove Admin", icon: ShieldMinus },
];

const NavGroup = ({ title, links }) => (
  <div className="mb-8">
    <h3 className="px-3 text-[11px] font-bold uppercase tracking-widest2 text-ink-500 mb-3">
      {title}
    </h3>
    <div className="space-y-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? "bg-gold-500/15 text-gold-300"
                : "text-ink-300 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <link.icon className="w-4 h-4 shrink-0" />
          {link.label}
        </NavLink>
      ))}
    </div>
  </div>
);

const AdminPanel = () => {
  return (
    <aside className="lg:w-72 shrink-0 lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-ink-900/60 backdrop-blur-xl">
      <div className="p-6 flex flex-col lg:h-full">
        <Link to="/admin" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gold-500 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-ink-950" />
          </div>
          <div>
            <p className="text-sm font-black text-white leading-none">Admin Panel</p>
            <p className="text-[11px] text-ink-500 mt-1">Malkhani Shoes</p>
          </div>
        </Link>

        <div className="overflow-x-auto lg:overflow-visible">
          <div className="flex lg:block gap-6 lg:gap-0 min-w-max lg:min-w-0">
            <NavGroup title="Product Section" links={productLinks} />
            <NavGroup title="User Management" links={userLinks} />
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-white/10 space-y-2 hidden lg:block">
          <button className="w-full flex items-center gap-2 justify-center h-11 rounded-xl border border-white/15 text-white text-sm font-semibold hover:bg-white/5 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <button className="w-full flex items-center gap-2 justify-center h-11 rounded-xl border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/10 transition-colors">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminPanel;
