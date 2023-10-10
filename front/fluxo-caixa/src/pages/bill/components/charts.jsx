"use client";

import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

function StatsCard(props) {
  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      maxWidth={"md"}
      bg={useColorModeValue("white", "gray.900")}
      _hover={{
        background: useColorModeValue("cyan.400", "cyan.800"),
      }}
      shadow={"xl"}
      border={"2px solid"}
      borderColor={useColorModeValue("cyan.400", "cyan.800")}
      rounded={"lg"}
			role="group"
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber
            fontSize={"2xl"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.800", "gray.200")}
          >
            {stat}
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
  const { title, value, icon } = props;
  return (
    <Box>
      <Flex justifyContent={"center"}>
        <StatsCard title={title} stat={value} icon={icon} />
      </Flex>
    </Box>
  );
}
