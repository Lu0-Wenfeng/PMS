import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productName: "",
  productPrice: "",
  productDescription: "",
  productCategory: "",
  productInStockQuantity: 0,
  productImageURL: "",
  productCreated: false,
};

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/create-product",
        product,
        {
          headers: {
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


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
    setProductPrice: (state, action) => {
      state.productPrice = action.payload;
    },
    setProductDescription: (state, action) => {
      state.productDescription = action.payload;
    },
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    setProductInStockQuantity: (state, action) => {
      state.productInStockQuantity = action.payload;
    },
    setProductImageURL: (state, action) => {
      state.productImageURL = action.payload;
    },
    setProductCreated: (state, action) => {
      state.productDescription = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.fulfilled, (state, action) => {
      console.log("Product created successfully");
      state.productName = "";
      state.productPrice = "";
      state.productDescription = "";
      state.productCategory = "";
      state.productInStockQuantity = 0;
      state.productImageURL = "";
      state.productCreated = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      console.error("Product creation failed", action.payload);
    });
  },
});

export const {
  setProductName,
  setProductPrice,
  setProductDescription,
  setProductCategory,
  setProductInStockQuantity,
  setProductImageURL,
  setProductCreated,
} = productSlice.actions;

export default productSlice.reducer;
