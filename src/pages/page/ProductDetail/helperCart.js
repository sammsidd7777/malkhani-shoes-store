import toast from "react-hot-toast";

export async function handleAddToCart(productId) {
  try {
    let response = await fetch(`${import.meta.env.VITE_BACK_URL}/cart/add/` + productId, {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Something went wrong!");
    response = await response.json();

    toast.success("Added to your cart");

    console.log(response);
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
}

export async function handleAddToWish(item) {
  console.log(item);
  try {
    let responses = await fetch(`${import.meta.env.VITE_BACK_URL}/wish/add/` + item, {
      credentials: "include",
    });
    if (!responses.ok) throw new Error("something went wrong");
    const data = (responses = await responses.json());
    toast.success("Added to your wishlist");
    console.log(data);
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
}
