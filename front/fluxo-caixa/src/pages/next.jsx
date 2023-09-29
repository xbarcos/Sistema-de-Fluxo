import React from "react";
import fetch from "../components/fetch.jsx";
import Delete from "../components/delete.jsx";
import { formatDate, formatMoney } from "../components/read";
import { getPricesByDate, getValues } from "../components/charts.jsx";
import { Outlet, Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Flex,
  Badge,
  useColorModeValue,
  chakra,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import Charts from "../components/charts.jsx";

export const NextMonthsValues = () => {
  const values = getValues();
  return (
    <>
      {values.map((value, key) => {
        if (!value.accomplished) {
          return (
            <Tr key={key}>
              <Th>{formatDate(value.date)}</Th>
              <Th>{value.name}</Th>
              <Th>{formatMoney(value.price)}</Th>
              <Th>{value.bank}</Th>
              <Th>
                <Badge
                  padding={"4px"}
                  width={"70px"}
                  variant={"solid"}
                  colorScheme={
                    value.situation.toLowerCase() == "entrada" ? "green" : "red"
                  }
                >
                  <Center>{value.situation}</Center>
                </Badge>
              </Th>
              <Th>
                <Delete
                  id={value._id}
                  name={value.name}
                  price={value.price}
                  date={value.date}
                  situation={value.situation}
                />
              </Th>
              <Th>
                <Link to={"/bill/" + value._id}>
                  <Button colorScheme="cyan" size={"sm"}>Detalhes</Button>
                </Link>
              </Th>
            </Tr>
          );
        }
      })}
    </>
  );
};

const NextPayments = () => {
  return (
    <>
      <Charts title="Saldo Previsto" value={getPricesByDate()} />
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
              Movimentações Previstas
            </chakra.h1>
          </Flex>
          <Text textAlign={"center"} fontSize={"2x1"} fontWeight={"light"}>
            Essas são as movimentações previstas para acontecerem nos próximos
            meses
          </Text>
          <Table variant="simple" marginTop={"50px"}>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Nome</Th>
                <Th>Preço</Th>
                <Th>Banco</Th>
                <Th>Situação</Th>
                <Th>Ações</Th>
                <Th>Link</Th>
              </Tr>
            </Thead>
            <Tbody>
              <NextMonthsValues />
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};

export default NextPayments;
