import { React } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Box,
  Flex,
  Button,
  Badge,
  useColorModeValue,
  border,
  chakra,
  Center,
} from "@chakra-ui/react";
import fetch from "./fetch.jsx";
import Delete from "./delete.jsx";
import Charts from "./charts.jsx";

const getValues = () => {
  return fetch();
};

export default function Read() {
  function formatDate(date) {
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let tempDate = `${day}-${month}-${year}`;
    return tempDate.replaceAll("-", "/");
  }
  function formatMoney(amount) {
    return `R$${amount
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(".", "x")
      .replace(",", ".")
      .replace("x", ",")}`;
  }
  const bills = getValues();
  return (
    <>
      <Charts></Charts>
      <Flex justifyContent={"center"} marginTop={"60px"}>
        <TableContainer
          bg={useColorModeValue("white", "gray.900")}
          borderRadius={"25px"}
          border={"1px solid"}
          borderColor={useColorModeValue("gray.800", "gray.500")}
        >
          <Flex justifyContent={"center"}>
            <chakra.h1
              textAlign={"center"}
              fontSize={"4xl"}
              py={10}
              fontWeight={"bold"}
            >
              Movimentações
            </chakra.h1>
          </Flex>
          <Table variant="simple" marginTop={"50px"}>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Banco</Th>
                <Th>Situação</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bills.map((bill, key) => {
                return (
                  <Tr key={key}>
                    <Th>{formatDate(bill.date)}</Th>
                    <Th>{bill.name}</Th>
                    <Th>{formatMoney(bill.price)}</Th>
                    <Th>{bill.bank}</Th>
                    <Th>
                      <Badge
                        padding={"4px"}
                        width={"70px"}
                        variant={"solid"}
                        colorScheme={
                          bill.situation.toLowerCase() == "entrada"
                            ? "green"
                            : "red"
                        }
                      >
                        <Center>{bill.situation}</Center>
                      </Badge>
                    </Th>
                    <Th>
                      <Button marginRight="1rem" colorScheme="yellow">
                        Editar
                      </Button>
                      <Delete id={bill._id} />
                    </Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
