"use client";

import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdOutlineAttachMoney } from "react-icons/md";
import fetch from "./fetch.jsx";
import moment from 'moment';

export const getValues = () => {
  return fetch();
};

export const getPricesBySituation = () => {
  const values = getValues();
  let count = 0;
  values.forEach((value) => {
    if (value.accomplished) {
      if (value.situation.toLowerCase() == "entrada") {
        count += value.price;
      } else {
        count -= value.price;
      }
    }
  });
  return count;
};

export const getPricesByDate = () => {
  const values = getValues();
  let count = 0
  values.map((value)=>{
    if (!value.accomplished) {
      if (value.situation.toLowerCase() == "entrada") {
        count += value.price;
      } else {
        count -= value.price;
      }
    }
  });
  return count;
}

export function formatMoney(amount) {
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
      _hover={{
        background: useColorModeValue("gray.800", "white"),
        color: useColorModeValue("white", "black"),
      }}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }} >
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber
            fontSize={"2xl"}
            fontWeight={"medium"}
            color={stat >= 0 ? "green" : "red"}
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

export default function BasicStatistics(props) {
  const { title, value } = props;
  return (
    <Box>
      <Flex justifyContent={"center"}>
        <StatsCard
          title={title}
          stat={value}
          icon={<MdOutlineAttachMoney size={"3em"} />}
        />
      </Flex>
    </Box>
  );
}
