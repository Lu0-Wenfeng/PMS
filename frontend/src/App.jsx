import { Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
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
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [searchInput, setSearchInput] = useState("");

  const isAuthenticated = () => {
    // 根据你的认证逻辑，检查用户是否登录并且是管理员
    return isAdmin === "admin";
  };

  const [navigate, setNavigate] = useState(null);

  // 路由保护函数，如果用户不是管理员，将其重定向到/sign-in页面
  const adminRouteProtection = (element) => {
    if (!isAuthenticated() && navigate) {
      navigate("/sign-in");
      return null;
    }
    return element;
  };

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
            <Route
              path="/"
              element={<Navigate to="/all-products" replace />}
            />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/update-pwd" element={<UpdatePassword />} />
            <Route path="/success" element={<LoginSuccess />} />
            <Route
              path="/create-product"
              element={adminRouteProtection(<CreateProductPage />)}
            />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route
              path="/all-products/:id"
              element={<ProductDetailPage />}
            />
            <Route
              path="/search-product/:query"
              element={<AllProductsPage />}
            />
            <Route
              path="/edit-product/:id"
              element={adminRouteProtection(<EditProductPage />)}
            />
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
