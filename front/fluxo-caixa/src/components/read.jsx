import { React, useState } from "react";
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
} from "@chakra-ui/react";
import fetch from "./fetch.jsx";
import Delete from "./delete.jsx";
import Pagination from "./pagination.jsx";
import Moment from "moment";
import 'moment/locale/pt-br'
Moment.locale('pt-br')

const getValues = () => {
  return fetch();
};
export function formatDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  let tempDate = `${day}-${month}-${year}`;
  return tempDate.replaceAll("-", "/");
}
export function formatMoney(amount) {
  return `R$${amount
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .replace(".", "x")
    .replace(",", ".")
    .replace("x", ",")}`;
}
export default function Read() {
  const bills = getValues();
  return (
    <>
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
              fontSize={"3xl"}
              py={10}
              fontWeight={"bold"}
            >
              Movimentações do mês de {Moment().format('MMMM')}
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
                if (Moment(bill.date) < Moment()) {
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
                        <Delete
                          id={bill._id}
                          name={bill.name}
                          price={bill.price}
                          date={bill.date}
                          situation={bill.situation}
                        />
                      </Th>
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
          <Flex justifyContent={"center"}>
            <Pagination limit={12} total={500} offset={10} setOffset={240} />
          </Flex>
        </TableContainer>
      </Flex>
    </>
  );
}
