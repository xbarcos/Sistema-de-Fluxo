"use client";

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { MdOutlineAttachMoney } from "react-icons/md";
import fetch from "./fetch.jsx";
import { color } from "framer-motion";

const getValues = () => {
  return fetch();
};

const getPrices = () => {
  const bills = getValues();
  let count = 0;
  bills.forEach((bill) => {
    if (bill.situation.toLowerCase() == "entrada") {
      count += bill.price;
    } else {
      count -= bill.price;
    }
  });
  return count;
};

function formatMoney(amount) {
  return `R$${amount
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    .replace(".", "x")
    .replace(",", ".")
    .replace("x", ",")}`;
}

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      maxWidth={"md"}
      bg={useColorModeValue("white", "gray.900")}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber
            fontSize={"2xl"}
            fontWeight={"medium"}
            color={getPrices() >= 0 ? "green" : "red"}
          >
            {formatMoney(stat)}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Box>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Caixa da Empresa
      </chakra.h1>
      <Flex justifyContent={"center"}>
        <StatsCard
          title={"Saldo"}
          stat={getPrices()}
          icon={<MdOutlineAttachMoney size={"3em"} />}
        />
      </Flex>
    </Box>
  );
}
