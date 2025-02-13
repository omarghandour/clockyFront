import React from "react";
import ProductById from "@/app/components/ProductById";
import axios from "axios";
import { notFound } from "next/navigation";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
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

  // Since images are coming from Appwrite, ensure we generate absolute URLs
  // Replace the base with your Appwrite endpoint details
  const appwriteEndpoint = "https://appwrite.clockyeg.com/v1/storage/files";

  const getAppwriteImageUrl = (fileId: string): string => {
    // If the fileId is already an absolute URL, return it as is
    if (fileId.startsWith("http")) return fileId;
    // Otherwise, construct the URL using the Appwrite storage endpoint
    return `${appwriteEndpoint}/${fileId}/view`;
  };

  const mainImage = product.img ? getAppwriteImageUrl(product.img) : "";
  const additionalImages = product.otherImages
    ? product.otherImages.map(getAppwriteImageUrl)
    : [];

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        mainImage, // Use the product image as the primary image
        ...additionalImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [
        mainImage, // Use the product image for Twitter share cards
        ...additionalImages,
      ],
    },
    icons: {
      icon: mainImage, // Set the product image as the page icon for sharing
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
      <ProductById product={product} />
    </div>
  );
}
