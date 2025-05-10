'use client';

import { Box, useColorMode, IconButton, Flex, Container } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" bg={colorMode === 'light' ? 'gray.50' : 'gray.900'}>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        position="fixed"
        bottom={4}
        right={4}
        size="lg"
        colorScheme={colorMode === 'light' ? 'purple' : 'yellow'}
      />
    </Box>
  );
};

export default Layout; 