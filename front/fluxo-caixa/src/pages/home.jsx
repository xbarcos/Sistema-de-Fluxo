import { Text, Center, Flex } from "@chakra-ui/react";
export default function Home() {
  return (
    <>
      <Flex flexDirection={"column"}>
        <Center>
          <Text fontSize={"80px"}>Página Inicial</Text>
        </Center>
        <Center>
          <Text>Desculpa, ainda estamos em construção!</Text>
        </Center>
      </Flex>
    </>
  );
}
