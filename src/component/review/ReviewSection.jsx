import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "../../components/ui/SectionHeading";
import RatingStars from "../../components/ui/RatingStars";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Verified Buyer",
    rating: 5,
    comment: "Amazing quality shoes! Very comfortable and stylish.",
  },
  {
    id: 2,
    name: "Anjali Verma",
    role: "Verified Buyer",
    rating: 4,
    comment: "Good value for money. Delivery was fast.",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Verified Buyer",
    rating: 5,
    comment: "Perfect fitting and premium feel. Highly recommended!",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-ink-900/40 border-y border-white/5">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Real feedback from people who walk in our shoes every day."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-white/10 bg-ink-900/70 p-7 hover:border-gold-400/30 transition-colors"
            >
              <Quote className="w-8 h-8 text-gold-500/30 mb-4" />
              <p className="text-ink-200 leading-relaxed mb-6">"{review.comment}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{review.name}</h4>
                  <span className="text-xs text-ink-400">{review.role}</span>
                </div>
                <RatingStars rating={review.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
