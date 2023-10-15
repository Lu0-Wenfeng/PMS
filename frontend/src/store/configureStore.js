import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/authSlice";
import productSlice from "./reducers/productSlice";
import cartSlice from "./reducers/cartSlice";


const authPersistConfig = {
  key: "auth",
  storage,
};

const productPersistConfig = {
  key: "products",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authSlice),
  products: persistReducer(productPersistConfig, productSlice),
  cart: persistReducer(cartPersistConfig, cartSlice),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: ["persist/PERSIST"] },
    }),
});

export const persistor = persistStore(store);
