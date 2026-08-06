import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import EmptyState from "../../components/ui/EmptyState";
import ProductCard from "../../components/ui/ProductCard";

const Wishpage = () => {

  const [loading, setLoading] = useState(true);
  const [wishProducts, setWishProducts] = useState([]);


  
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACK_URL}/wish/all`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        
        const wishList = data?.message?.[0];
        if (wishList.length > 0) {
          setWishProducts(wishList);
        }
      }


    } catch (err) {
      
      
    } finally {
      setLoading(false);
    }
  };
  

  const removeWish =async (params) => {
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="min-h-screen bg-ink-950">
      <div className="container-page py-10 sm:py-14">
        <div className="mb-4">
          <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">Saved</span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tightest text-white mt-2">
            Your Wishlist
          </h1>
        </div>







        <div>
          {loading ? (
            <div>loading </div>
          ) : (
            
             
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {wishProducts?.map((item, i) => (
                    <ProductCard
                      key={item._id}
                      item={item}
                      isWishcard={true}
                      index={i}
                      removeWish={removeWish}
                    />
                  ))}
                </div>
              
            
          )}
        </div>







      </div>
    </div>
  );
};

export default Wishpage;
