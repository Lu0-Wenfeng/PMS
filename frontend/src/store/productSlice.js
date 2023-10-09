import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ITEMS_PER_PAGE = 10;

const initialState = {
  productList: [],
  currentProduct: null,
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

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/all-products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch product");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/edit-product/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        return id;
      } else {
        console.log(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:3000/search-product/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data.searchResults;
    } catch (error) {
      return rejectWithValue(error.message);
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
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("Product fetched successfully", action.payload);
        state.currentProduct = { ...action.payload };
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        console.error("Fetching product failed", action.error);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { message, id, updatedProduct } = action.payload;
        const index = state.productList.findIndex(
          (product) => product._id === id
        );
        if (index !== -1) {
          state.productList[index] = { ...updatedProduct };
        }
        console.log("Product updated, ", message);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.error("Updating product failed", action.error);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product._id !== action.payload
        );
        state.totalPages = Math.ceil(state.productList.length / ITEMS_PER_PAGE);
        state.currentProduct = null;
        console.log("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.error("Product deletion failed", action.payload);
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.totalPages = Math.ceil(state.productList.length / ITEMS_PER_PAGE);
      })
      .addCase(searchProducts.rejected, (state, action) => {
        console.error('Search failed', action.error);
      });
  },
});

export const { setCurrentPage, setSortOption } = productSlice.actions;

export default productSlice.reducer;
