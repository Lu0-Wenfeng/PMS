import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = {
  auth: persistReducer(persistConfig, authSlice),
  products: persistReducer(persistConfig, productSlice),
  cart: persistReducer(persistConfig, cartSlice),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }),
});

export const persistor = persistStore(store);
