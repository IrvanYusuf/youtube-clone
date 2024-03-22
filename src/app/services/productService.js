import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setProducts } from "../features/productSlice";

export const productsApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/products",
      onSuccess: (data) => setProducts(data),
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
