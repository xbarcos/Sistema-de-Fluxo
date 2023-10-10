'use client'

import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Flex,
  Image,
  Text,
  Button,
} from '@chakra-ui/react'
import { Outlet, Link } from "react-router-dom";
import { FiCompass } from 'react-icons/fi';
import Charts, { getValues, getPricesByDate, getPricesBySituation } from '../components/charts.jsx';
import SChart from './bill/components/charts.jsx';
import {showToast} from '../components/toast.jsx'

const getAccomplished = () => {
  const values = getValues();
  let count = 0;
  values.forEach((value)=>{
    if (value.accomplished){
      count += 1
    }
  })
  return count;
}
export default function Home() {
  const toast = showToast();
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={'center'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
        Bem vindo, João Marcos
      </chakra.h1>
      <chakra.h2 textAlign={'center'} fontSize={'2xl'} py={10} fontWeight={'bold'}>
        Essas são as estatísticas atuais da sua empresa:
      </chakra.h2>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Link to="/show"><Charts title="Saldo" value={getPricesBySituation()} /></Link>
        <Link to="/next"><Charts title="Saldo dos Próximos Meses" value={getPricesByDate()}/></Link>
        <Link to="/show"><SChart title="Movimentações Efetuadas" value={getAccomplished()} icon={<FiCompass size="3em"/>}/></Link>
      </SimpleGrid>
      <Flex padding={200} h="20" alignItems="center" mx="8" justifyContent={'center'} flexDirection={'column'}> {/* Logo da Empresa */}
        <Image filter={"invert"} boxSize={"150px"} src="./logo.png"></Image>
        <Text fontSize={"40px"} as={"b"} paddingLeft={"10px"}>
          Flux Networks
        </Text>
      </Flex>
    </Box>
  )
}