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
} from '@chakra-ui/react'
import { Outlet, Link } from "react-router-dom";
import { GoLocation } from 'react-icons/go'
import Charts, { getPricesByDate, getPricesBySituation } from '../components/charts.jsx'

function StatsCard(props) {
  const { title, stat, icon } = props
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      bg={useColorModeValue("white", "gray.900")}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  )
}

export default function Home() {
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
        <StatsCard title={'Filiais'} stat={'7'} icon={<GoLocation size={'3em'} />} />
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