import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ITEMS_PER_PAGE = 10;

const initialState = {
  productList: [],
  totalPages: 0,
  currentPage: 1,
  sortOption: "lastAdded",
};

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/create-product",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/all-products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data.allProducts;
      } else {
        throw new Error("Failed to fetch product list");
      }
    } catch (error) {
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        const { newProduct } = action.payload.product;
        console.log("Product created successfully");
        state.productList = { ...state.productList, newProduct };
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.error("Product creation failed", action.payload);
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.totalPages = Math.ceil(state.productList.length / ITEMS_PER_PAGE);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.error("Fetching all products failed", action.error);
      });
  },
});

export const { setCurrentPage, setSortOption } = productSlice.actions;

export default productSlice.reducer;
