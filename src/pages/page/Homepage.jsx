import { useEffect, useState } from "react";

import { handleAddToCart, handleAddToWish } from "./ProductDetail/helperCart";
import HeroSection from "../../component/herosection/HeroSection";
import ProductFilterSection from "../../component/products/ProductFilterSection";
import ReviewSection from "../../component/review/ReviewSection";
import BrandsSection from "../../component/brand/BrandsSection";
import CTABanner from "../../component/CTABanner";

const Homepage = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [bigDiscount, setBigDiscount] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fatch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/all`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBestSellers(data.message.fontdata.bestSellers);
      setBigDiscount(data.message.fontdata.bigDiscount);
      setNewArrivals(data.message.fontdata.newArrivals);
    } catch (error) {
      console.log("response not come form backend", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatch();
  }, []);

  return (
    <>
      <HeroSection />
      <ProductFilterSection
        bestSellers={bestSellers}
        bigDiscount={bigDiscount}
        newArrivals={newArrivals}
        loading={loading}
        handleAddToWish={handleAddToWish}
        handleAddToCart={handleAddToCart}
      />
      <ReviewSection />
      <BrandsSection />
      <CTABanner />
    </>
  );
};

export default Homepage;
