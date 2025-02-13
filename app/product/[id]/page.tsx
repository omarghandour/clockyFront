import React from "react";
import ProductById from "@/app/components/ProductById";
import axios from "axios";
import { notFound } from "next/navigation";
import Head from "next/head"; // Import Head for managing the document head

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

export default async function Page({ params }: { params: any }) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:image" content={product.image} />
        {/* Set the product image for social sharing */}
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
      </Head>
      <div className="min-h-dvh w-full justify-evenly bg-white">
        {/* <Nav /> */}
        <ProductById product={product} />
      </div>
    </>
  );
}
