import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LoginSuccess from "./pages/LoginSuccess";
import UpdatePassword from "./pages/UpdatePassword";
import CreateProductPage from "./pages/CreateProductPage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import EditProductPage from "./pages/EditProduct";
import ErrorPage from "./pages/ErrorPage";

function App() {
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

          <GridItem bg="white" area={"main"}>
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/all-products" replace />}
              />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/update-pwd" element={<UpdatePassword />} />
              <Route path="/success" element={<LoginSuccess />} />
              <Route path="/create-product" element={<CreateProductPage />} />
              <Route path="/all-products" element={<AllProductsPage />} />
              <Route path="/all-products/:id" element={<ProductDetailPage />} />
              <Route
                path="/search-product/:query"
                element={<AllProductsPage />}
              />
              <Route path="/edit-product/:id" element={<EditProductPage />} />
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
