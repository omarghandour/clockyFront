"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type Product = {
  _id: string;
  name: string;
  sale: number;
  price: number;
  description: string;
  img: string;
  quantity?: number;
};
// Utility function to get the cart from localStorage
const getCartFromLocalStorage = (): Product[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

// Utility function to save the cart to localStorage
const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to add a product to the cart
const addProductToCart = (cart: Product[], product: Product): Product[] => {
  const existingProduct = cart.find((item) => item._id === product._id);

  if (existingProduct) {
    return cart.map((item) =>
      item._id === product._id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
  } else {
    return [...cart, { ...product, quantity: 1 }];
  }
};

// Function to update product quantity in the cart
const updateProductQuantity = (
  cart: Product[],
  productId: string,
  change: number
): Product[] => {
  return cart.map((item) => {
    if (item._id === productId) {
      const newQuantity = (item.quantity || 1) + change;
      return { ...item, quantity: Math.max(newQuantity, 1) }; // Ensure quantity is at least 1
    }
    return item;
  });
};

// Function to sync the cart with the server (for authenticated users)
const syncCartWithServer = async (products: Product[]) => {
  try {
    const token = localStorage.getItem("userId");
    if (token) {
      await axios.post(
        `https://clockyexpress.vercel.app/api/products/cart/${token}`,
        {
          products,
        }
      );
    }
  } catch (error) {
    console.error("Failed to sync cart with server", error);
  }
};

const Products2 = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    // Load cart items from localStorage on component mount
    const cartFromLocalStorage = getCartFromLocalStorage();
    setCartItems(cartFromLocalStorage);

    fetchProducts();
  }, []);

  // Handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    const updatedCart = addProductToCart(cartItems, product);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);
    toast({
      title: product.name,
      description: "added to cart",
      action: <Link href="/cart">Go to cart</Link>,
    });

    // Sync with server if authenticated
    syncCartWithServer(updatedCart);
  };

  // Handle changing product quantity
  const handleQuantityChange = async (productId: string, change: number) => {
    const updatedCart = updateProductQuantity(cartItems, productId, change);
    setCartItems(updatedCart);
    saveCartToLocalStorage(updatedCart);

    // Sync with server if authenticated
    syncCartWithServer(updatedCart);
  };

  // return (
  //   <div className="mx-auto flex justify-center flex-col items-center md:w-4/5 sm:w-full bg-[#FCFCFC] p-5 gap-4">
  //     <div className="flex flex-col justify-center items-center gap-4">
  //       <span className="border-t-2 border-two w-20 px-1 font-medium"></span>
  //       <h1 className="text-xl font-medium text-[#2E2E2E]">PRODUCTS</h1>
  //     </div>
  //     <div className="grid grid-cols-3 md:grid-cols-2 gap-6 xl:grid-cols-3">
  //       {products.map((product: Product, index: number) => (
  //         <div
  //           key={index}
  //           className="border-solid border-2 shadow-2xl border-[#F0F0F0] flex flex-col items-center justify-center p-11 gap-4 md:w-56 transition-transform duration-300 ease-in-out transform hover:scale-105"
  //         >
  //           <img
  //             src={product.img}
  //             alt={product.name}
  //             className="w-[155px] h-[155px]"
  //           />
  //           <h1 className="text-[#2E2E2E] text-3xl font-medium">
  //             {product.name}
  //           </h1>
  //           <h2 className="text-two text-2xl font-black">
  //             ${product.price}
  //           </h2>
  //           <button
  //             onClick={() => handleAddToCart(product)}
  //             className="bg-[#2B2B2B] p-4 relative md:top-11 md:left-20"
  //           >
  //             Add to Cart
  //           </button>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <div className="mx-auto flex justify-center flex-col items-center md:w-4/5 sm:w-full bg-[#FCFCFC] p-5 gap-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <span className="border-t-2 border-two w-20 px-1 font-medium"></span>
        <h1 className="text-xl text-[#2E2E2E] font-bold">PRODUCTS</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 xl:grid-cols-3">
        {products.map((product: Product, index: number) => (
          <div
            key={index}
            className="border-solid border-2 shadow-2xl border-[#F0F0F0] flex flex-col items-center justify-center p-4 gap-4 md:w-56 transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-[155px] h-[155px]"
            />
            <h1 className="text-[#2E2E2E] text-3xl font-medium">
              {product.name}
            </h1>
            <p className="text-[#595959] font-bold text-base line-through text-center">
              {product.sale} 1000 L.E
            </p>
            <h2 className="text-two text-2xl font-black">${product.price}</h2>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-[#2B2B2B] p-4 relative md:top-4 md:left-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#FFFF"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 11V6a3 3 0 116 0v4.967M10.4 21h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C20 17.96 20 16.84 20 14.6v-2.4c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C18.48 9 17.92 9 16.8 9H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C4 10.52 4 11.08 4 12.2v2.4c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C7.04 21 8.16 21 10.4 21z"
                ></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products2;
