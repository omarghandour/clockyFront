import React from "react";
import ProductById from "@/app/components/ProductById";
import axios from "axios";
import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next"; // Import generateMetadata for managing the document head
type Props = {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

async function getProduct(id: string) {
  try {
    const response = await axios.get(
      `https://express.clockyeg.com/api/products/${id}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

// Define metadata generation function
export async function generateMetadata({ params }: Props) {
  const id = (await params).id;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  // Change this in your metadata generation
  const cleanImageUrl = product?.img
    ? product.img
        .replace("mode=admin", "mode=public") // Remove admin mode
        .split("?")[0] // Remove any query parameters
    : "";

  // const images = [product.img, ...(product.otherImages || [])];

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
      images: [cleanImageUrl], // Use product images or a default icon
    },
    twitter: {
      card: "summary_large_image", // Use a large image card for Twitter
      title: product?.name,
      description: product?.description,
      images: [cleanImageUrl], // Use product images or a default icon
    },
  };
}

export default async function Page({ params }: { params: any }) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-dvh w-full justify-evenly bg-white">
      {/* <Nav /> */}
      <ProductById product={product} />
    </div>
  );
}
