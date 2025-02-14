// utils/api.ts
export const fetchNewArrivals = async () => {
  const api = "https://express.clockyeg.com/api";
  try {
    const res = await fetch(`${api}/products/newArrival`, {
      credentials: "include",
      cache: "no-cache",
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch products", error);
    return null; // Return a default or fallback value
  }
};
