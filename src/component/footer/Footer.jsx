import React from "react";
import { Link } from "react-router-dom";
import { AtSign, Send, Globe, MapPin, Mail, Phone, ArrowRight } from "lucide-react";

const columns = [
  {
    title: "About Us",
    links: ["Careers", "Our Stores", "Our Cares", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "Customer Care",
    links: [
      "Help Center",
      "How to Buy",
      "Track Your Order",
      "Corporate & Bulk Purchasing",
      "Returns & Refunds",
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950 pt-16">
      <div className="container-page">
        {/* NEWSLETTER */}
        <div className="rounded-3xl bg-gradient-to-br from-ink-900 to-ink-850 border border-white/10 p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tightest">
              Join the inner circle
            </h3>
            <p className="text-ink-400 mt-2 max-w-md">
              Get early access to drops, member pricing, and stories from the studio.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full lg:w-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 pl-5 focus-within:border-gold-400/50"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="bg-transparent outline-none text-sm text-white placeholder:text-ink-500 w-full lg:w-64"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-gold-500 text-ink-950 text-sm font-bold hover:bg-gold-400 transition-colors"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl font-black text-white">
              Samm<span className="text-gold-400">Store</span>
            </h2>
            <p className="text-ink-400 text-sm mt-4 leading-relaxed max-w-xs">
              Premium footwear crafted for comfort and style. Step into confidence with
              Samm-Store.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[AtSign, Send, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-ink-300 hover:text-white hover:border-gold-400/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-ink-400 hover:text-gold-300 transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" />
                <span>G-58, Kalka Ji Post, New Delhi - 110076</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>uilib.help@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 9958 234 365</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <span>© {new Date().getFullYear()} Samm-Store. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-ink-200 transition-colors">
              About
            </Link>
            <span className="hover:text-ink-200 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-ink-200 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
