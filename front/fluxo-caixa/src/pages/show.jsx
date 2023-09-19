import Read from "../components/read.jsx";
import Charts from "../components/charts.jsx";
import { chakra, Box } from "@chakra-ui/react";
export default function Show() {
  return (
    <>
      <Box>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Caixa da Empresa
        </chakra.h1>
        <Charts />
				<Read />
      </Box>
    </>
  );
}
