import React, { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, X, PackagePlus } from "lucide-react";
import toast from "react-hot-toast";


import { Field, Input, Textarea } from "../../../components/ui/Field";
import Button from "../../../components/ui/Button";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm({
  defaultValues: {
    productName: "",
    productBrand: "",
    productCategory: "",
    productType: "",
    productPrice: "",
    discountPrice: "",
    stock: 0,
    colors: "",
    sizes: "",
    status: "Active",
    featured: false,
    productDescription: "",
  },
});

const submitHandler = async (data) => {
  setLoading(true);

  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    files.forEach((file) => {
      formData.append("productImg", file);
    });

    const response = await fetch(
      `${import.meta.env.VITE_BACK_URL}/products/add`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Product not added");
    }

    toast.success("Product added successfully!");

    reset();
    setFiles([]);
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

const fileUploadHandler = (e) => {
  setFiles(Array.from(e.target.files));
};

const removeFile = (index) => {
  setFiles((prev) => prev.filter((_, i) => i !== index));
}; 
  return (
    <div>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest2 text-gold-400">
          Product Section
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tightest text-white mt-2">
          Add New Product
        </h1>
      </div>
<motion.form
  onSubmit={handleSubmit(submitHandler)}
  encType="multipart/form-data"
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="rounded-2xl border border-white/10 bg-ink-900/50 p-6 sm:p-8 space-y-6"
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    <Field label="Product Name">
      <Input
        placeholder="Nike Air Jordan 1"
        {...register("productName", {
          required: "Product name is required",
        })}
      />
      {errors.productName && (
        <p className="text-red-400 text-sm mt-1">
          {errors.productName.message}
        </p>
      )}
    </Field>

    <Field label="Brand">
      <Input
        placeholder="Nike"
        {...register("productBrand", {
          required: "Brand is required",
        })}
      />
    </Field>

    <Field label="Category">
      <select
        className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white"
        {...register("productCategory", {
          required: true,
        })}
      >
        <option value="">Select Category</option>
        <option value="Shoes">Shoes</option>
        <option value="Clothing">Clothing</option>
        <option value="Accessories">Accessories</option>
        <option value="Electronics">Electronics</option>
      </select>
    </Field>

    <Field label="Type">
      <Input
        placeholder="Running Shoes"
        {...register("productType", {
          required: true,
        })}
      />
    </Field>

    <Field label="Price">
      <Input
        type="number"
        placeholder="4999"
        {...register("productPrice", {
          required: true,
          valueAsNumber: true,
        })}
      />
    </Field>

    <Field label="Discount Price">
      <Input
        type="number"
        placeholder="3999"
        {...register("discountPrice", {
          valueAsNumber: true,
        })}
      />
    </Field>

    <Field label="Stock">
      <Input
        type="number"
        placeholder="100"
        {...register("stock", {
          valueAsNumber: true,
        })}
      />
    </Field>

    <Field label="SKU">
      <Input
        placeholder="NK-001"
        {...register("sku")}
      />
    </Field>

    <Field label="Colors">
      <Input
        placeholder="Black, White, Blue"
        {...register("colors")}
      />
    </Field>

    <Field label="Sizes">
      <Input
        placeholder="7,8,9,10"
        {...register("sizes")}
      />
    </Field>

    <Field label="Status">
      <select
        className="w-full rounded-xl border border-white/10 bg-ink-900 px-4 py-3 text-white"
        {...register("status")}
      >
        <option value="Active">Active</option>
        <option value="Hidden">Hidden</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
    </Field>

    <Field label="Featured">
      <label className="flex items-center gap-3 text-white mt-3">
        <input
          type="checkbox"
          {...register("featured")}
        />
        Featured Product
      </label>
    </Field>

    <Field label="Weight (kg)">
      <Input
        type="number"
        step="0.1"
        placeholder="0.5"
        {...register("weight", {
          valueAsNumber: true,
        })}
      />
    </Field>

    <Field label="Warranty">
      <Input
        placeholder="1 Year"
        {...register("warranty")}
      />
    </Field>

    <Field label="Material">
      <Input
        placeholder="Leather"
        {...register("material")}
      />
    </Field>

    <Field label="Country of Origin">
      <Input
        placeholder="India"
        {...register("country")}
      />
    </Field>

  </div>

  <Field label="Product Description">
    <Textarea
      rows={5}
      placeholder="Write product description..."
      {...register("productDescription", {
        required: "Description is required",
      })}
    />
  </Field>

  <Field label="Product Images">
    <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-xl py-10 cursor-pointer hover:border-gold-400 transition">
      <UploadCloud className="w-8 h-8 text-gold-400" />
      <span className="text-ink-300">
        Upload Multiple Images
      </span>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={fileUploadHandler}
        className="hidden"
      />
    </label>

    {files.length > 0 && (
      <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-white/10"
          >
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="h-24 w-full object-cover"
            />

            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-black/70 rounded-full p-1"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>
    )}
  </Field>

  <Button
    type="submit"
    variant="gold"
    size="lg"
    loading={loading}
    icon={PackagePlus}
    className="w-full md:w-auto"
  >
    Add Product
  </Button>
</motion.form>
    </div>
  );
};

export default AddProduct;
