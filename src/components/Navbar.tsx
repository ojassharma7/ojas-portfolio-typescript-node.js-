'use client';

import { Box, Flex, Link, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

const MotionBox = motion(Box);

const Navbar = () => {
  const { colorMode } = useColorMode();
  const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Experience', path: '#experience' },
    { name: 'Projects', path: '#projects' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <Box
      as="nav"
      position="fixed"
      w="100%"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      boxShadow="sm"
      zIndex={1000}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={4}
        h={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <NextLink href="/" passHref legacyBehavior>
          <Link
            fontSize="xl"
            fontWeight="bold"
            _hover={{ textDecoration: 'none' }}
            color={colorMode === 'light' ? 'purple.600' : 'purple.200'}
          >
            Ojas Sharma
          </Link>
        </NextLink>

        <Flex gap={8}>
          {navItems.map((item) => (
            <Link
              as="a"
              key={item.path}
              href={item.path}
              position="relative"
              _hover={{ textDecoration: 'none' }}
              color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
              _after={{
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: '-4px',
                left: '0',
                bg: colorMode === 'light' ? 'purple.600' : 'purple.200',
                transition: 'width 0.3s ease-in-out',
              }}
              sx={{
                '&:hover': {
                  color: colorMode === 'light' ? 'purple.600' : 'purple.200',
                  '&::after': {
                    width: '100%',
                  },
                },
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/Resume_Ojas_Sharma.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            position="relative"
            _hover={{ textDecoration: 'none' }}
            color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
            fontWeight="semibold"
            px={2}
            sx={{
              '&:hover': {
                color: colorMode === 'light' ? 'purple.600' : 'purple.200',
              },
            }}
          >
            Resume
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 