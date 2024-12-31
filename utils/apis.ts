// utils/api.ts
import axios from "axios";

export const fetchNewArrivals = async () => {
  const api = "https://express.clockyeg.com/api";
  try {
    const res = await axios.get(`${api}/products/newArrival`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    return null; // Return a default or fallback value
  }
};
