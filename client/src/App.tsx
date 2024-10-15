import { ChakraProvider, theme } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Main from "./Main";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Main />
  </ChakraProvider>
);
