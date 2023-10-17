import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AllProductsPage from "./pages/AllProductsPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProduct";
import ErrorPage from "./pages/ErrorPage";
import LoginSuccess from "./pages/LoginSuccess";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [searchInput, setSearchInput] = useState("");

  return (
    <Router>
      <Grid
        h="100vh"
        templateAreas={`"header" "main" "footer"`}
        gridTemplateRows={"auto 1fr 85px"}
        gridTemplateColumns={"100%"}
        autoFlow={"column"}
      >
        <GridItem bg="#111827" area={"header"}>
          <Header onSearch={(searchText) => setSearchInput(searchText)} />
        </GridItem>

        <GridItem backgroundColor="gray.100" area={"main"}>
          <Routes>
            <Route path="/" element={<Navigate to="/all-products" replace />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/update-pwd" element={<UpdatePassword />} />
            <Route path="/success" element={<LoginSuccess />} />
            <Route
              path="/create-product"
              element={isAdmin ? <CreateProductPage /> : <ErrorPage />}
            />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/all-products/:id" element={<ProductDetailPage />} />
            <Route
              path="/search-product/:query"
              element={<AllProductsPage />}
            />
            <Route
              path="/edit-product/:id"
              element={isAdmin ? <EditProductPage /> : <ErrorPage />}
            />
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
        </GridItem>
        <GridItem bg="#111827" area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
