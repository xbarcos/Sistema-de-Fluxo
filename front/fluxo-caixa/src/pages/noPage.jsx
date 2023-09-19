import { Text, Center, Flex, Image } from "@chakra-ui/react";
export default function NoPage() {
  return (
    <>
      <Flex flexDirection={"column"}>
        <Center>
          <Text fontSize={"80px"}>Error 404</Text>
        </Center>
        <Center>
          <Text>Parece que a página que você está procurando não existe!</Text>
        </Center>
      </Flex>
      <Image src="404-error.png"></Image>
    </>
  );
}
