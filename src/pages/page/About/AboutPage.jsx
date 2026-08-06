import React from "react";
import { motion } from "framer-motion";
import { Gem, Sparkles, Truck, HeartHandshake } from "lucide-react";
import SectionHeading from "../../../components/ui/SectionHeading";

const values = [
  {
    icon: Gem,
    title: "Superior Quality",
    desc: "Crafted using premium materials for unmatched durability and comfort.",
  },
  {
    icon: Sparkles,
    title: "Contemporary Design",
    desc: "Clean silhouettes and modern aesthetics built for today's lifestyle.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "Fast, secure, and hassle-free shipping across India.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    desc: "Dedicated support to ensure your satisfaction at every step.",
  },
];

const AboutPage = () => {
  return (
    <div className="bg-ink-950">
      {/* HERO */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-white/5">
        <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
        <div className="container-page relative text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-black tracking-tightest text-white"
          >
            Step Into Confidence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-ink-300 text-lg max-w-xl mx-auto mt-6"
          >
            Malkhani Shoes blends craftsmanship, comfort, and contemporary style to redefine
            everyday footwear.
          </motion.p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="container-page py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
            Our Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tightest text-white mt-3 mb-6">
            Who We Are
          </h2>
          <p className="text-ink-300 leading-relaxed mb-4">
            At <strong className="text-white">Malkhani Shoes</strong>, we believe footwear is
            more than just fashion — it's an experience. Our journey began with a vision to
            create shoes that balance durability, comfort, and bold design.
          </p>
          <p className="text-ink-300 leading-relaxed">
            Each pair is thoughtfully engineered using premium materials, ensuring all-day
            comfort while keeping your style effortless.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10"
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="Malkhani Shoes Craftsmanship"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* MISSION */}
      <section className="border-y border-white/5 bg-ink-900/40 py-20 sm:py-28">
        <div className="container-page text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
            Our Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tightest text-white mt-3">
            Empowering every step you take
          </h2>
          <p className="text-ink-300 leading-relaxed mt-5">
            To empower every step you take with footwear that reflects confidence, performance,
            and modern elegance.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Why Choose Us" title="Why Malkhani Shoes?" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-ink-900/50 p-7 hover:border-gold-400/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5">
                <v.icon className="w-5 h-5 text-gold-300" />
              </div>
              <h3 className="font-bold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
