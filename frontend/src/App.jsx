import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
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
        Main
      </GridItem>
      <GridItem bg="#111827" area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default App;
