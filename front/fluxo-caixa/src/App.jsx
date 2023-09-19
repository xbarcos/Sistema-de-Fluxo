import Read from "./components/read.jsx";
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import Navbar from './components/navbar.jsx'
import Sidebar from './components/sidebar.jsx'
import Create from './components/create.jsx'
import Charts from './components/charts.jsx'
function App() {
  return (
    <ChakraProvider>
      <Sidebar page={<Read/>}/>
    </ChakraProvider>
  );
}

export default App;
