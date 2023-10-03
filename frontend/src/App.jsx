import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";


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

import store from "./store";




function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Provider store={store}>
      <Router>
        <Grid
          templateAreas={`"header" "main" "footer"`}
          gridTemplateRows={"64px 1fr 85px"}
          gridTemplateColumns={"100%"}
          h="100vh"
        >
          <GridItem bg="#111827" area={"header"}>
            <Header onSearch={(searchText) => setSearchInput(searchText)} />
          </GridItem>

          <GridItem bg="white" area={"main"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/update-pwd" element={<UpdatePassword />} />
              <Route path="/success" element={<LoginSuccess />} />
              <Route path='/create-product' element={<CreateProductPage />} />
              <Route path='/all-products' element={<AllProductsPage />} />
              <Route path='/all-products/:id' element={<ProductDetailPage />} />
            </Routes>
          </GridItem>
          <GridItem bg="#111827" area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </Router>
    </Provider>
  );
}

export default App;
