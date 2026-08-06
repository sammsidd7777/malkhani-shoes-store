import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PackageSearch } from "lucide-react";

import ProductCard from "../../../components/ui/ProductCard";
import { ProductGridSkeleton } from "../../../components/ui/Skeleton";
import EmptyState from "../../../components/ui/EmptyState";
import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const CheckProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/all`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/products/delete/${pendingDelete}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Delete failed");
      }

      toast.success("Product deleted successfully");
      setPendingDelete(null);
      fetchData();
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
          Product Section
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tightest text-white mt-2">
          All Products
        </h1>
      </div>

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length === 0 ? (
        <EmptyState icon={PackageSearch} title="No products found" subtitle="Add a product to get started." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((item, i) => (
            <ProductCard
              key={item._id}
              item={item}
              index={i}
              showActions
              onDelete={(id) => setPendingDelete(id)}
            />
          ))}
        </div>
      )}

      <Modal open={!!pendingDelete} onClose={() => setPendingDelete(null)} title="Delete Product">
        <p className="text-sm text-ink-300 mb-6">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="danger" className="flex-1" loading={deleting} onClick={handleDeleteProduct}>
            Delete
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => setPendingDelete(null)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CheckProduct;
