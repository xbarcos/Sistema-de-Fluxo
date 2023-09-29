import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Charts from "./components/charts";
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  useColorModeValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { MdCategory, MdOutlineAttachMoney, MdPayments } from "react-icons/md";
import { BsFillCreditCard2FrontFill, BsCalendarDateFill } from "react-icons/bs";
import { formatDate, formatMoney } from "../../components/read.jsx";
import fetch from "./components/fetch.jsx";
import Accomplish from "./components/accomplish";

const Bill = () => {
  const { id } = useParams();
  const getValues = (value) => {
    return fetch(value);
  };
  const bill = getValues(id);
  return (
    <>
      <Card bg={useColorModeValue("white", "gray.900")}>
        <CardHeader>
          <Heading size="xl" textAlign={"center"}>
            Movimentação
          </Heading>
        </CardHeader>
        <CardBody>
          <Box maxW="8xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
              marginBottom={10}
            >
              <Charts
                title="Nome da Movimentação"
                value={bill.name}
                icon={<MdCategory size="3em" />}
              />
              <Charts
                title="Valor"
                value={bill.price ? formatMoney(bill.price) : bill.price}
                icon={<MdOutlineAttachMoney size="3em" />}
              />
              <Charts
                title="Banco"
                value={bill.bank}
                icon={<BsFillCreditCard2FrontFill size="3em" />}
              />
            </SimpleGrid>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={{ base: 5, lg: 8 }}
              marginBottom={10}
            >
              <Charts
                title="Data"
                value={bill.date ? formatDate(bill.date) : bill.date}
                icon={<BsCalendarDateFill size="3em" />}
              />
              <Charts
                title="Situação"
                value={bill.situation}
                icon={<MdOutlineAttachMoney size="3em" />}
              />
              <Charts
                title="Efetuado"
                value={bill.accomplished ? "Sim" : "Não"}
                icon={<MdPayments size="3em" />}
              />
            </SimpleGrid>
          </Box>
        </CardBody>
        <CardFooter>
          <Flex justifyContent={"center"} width={"full"}>
            <Accomplish bill={bill} disabled={bill.accomplished? true : false}/>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};
export default Bill;
