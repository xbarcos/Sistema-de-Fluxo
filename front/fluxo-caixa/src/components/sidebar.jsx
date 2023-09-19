'use client'
import { Outlet, Link } from 'react-router-dom'
import React, { ReactNode } from 'react'
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Image,
  Text
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
} from 'react-icons/fi'

import Read from './read.jsx'
import Navbar from './navbar.jsx'
import Charts from './charts.jsx'

const LinkItems = [
  { name: 'Página Principal', icon: FiHome, path: '/home' },
  { name: 'Estatísticas', icon: FiTrendingUp, path: '/dashboard' },
  { name: 'Movimentações', icon: FiCompass, path: '/show' },
]

export default function Sidebar(props) {
  const { page } = props
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100')}>
      <SidebarContent display={{ base: 'none', md: 'block' }} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Navbar />
        <Box>
          {page}
        </Box>
      </Box>
    </Box>
  )
}

const SidebarContent = () => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full">
      <Flex h="20" alignItems="center" mx="8">
        <Image  filter={'invert'} boxSize={'50px'} src='./logo.png'></Image>
        <Text fontSize={'20px'} as={'b'} paddingLeft={'10px'}>Flux Networks</Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, props, ...rest }) => {
  const { url } = rest
  return (
    <Box
      as="a"
      href={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}
