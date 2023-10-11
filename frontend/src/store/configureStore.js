import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";

import logoutMiddleware from "./middlewares/logoutMiddleware";
import authSlice from "./reducers/authSlice";
import productSlice from "./reducers/productSlice";
import cartSlice from "./reducers/cartSlice";

const saveAuthSubsetFilter = createFilter("auth", [
  "isLoggedIn",
  "expireTimeStamp",
]);

const authPersistConfig = {
  key: "auth",
  storage,
  transforms: [saveAuthSubsetFilter],
};

const productPersistConfig = {
  key: "products",
  storage,
  transforms: [saveAuthSubsetFilter],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  transforms: [saveAuthSubsetFilter],
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
    }).concat(logoutMiddleware),
});

export const persistor = persistStore(store);
