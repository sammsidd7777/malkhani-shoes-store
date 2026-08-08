import React from "react";

const brands = [
  "/imagesss/nikelogo.png",
  "/imagesss/pumalogos.png",
  "/imagesss/adidaslogo.png",
  "/imagesss/jordanlogo.png",
  "/imagesss/guccilogo.png",
];

const BrandsSection = () => {
  const track = brands.concat(brands, brands, brands);

  return (
    <section className="py-12 sm:py-16 bg-ink-950 border-b border-white/5 overflow-hidden">
      <div className="container-page mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest2 text-ink-400">
          Trusted by the world's leading brands
        </p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950 to-transparent z-10" />

        <div className="flex w-max animate-marquee gap-16 items-center">
          {track.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand logo"
              className="h-8 sm:h-10 w-auto object-contain opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
