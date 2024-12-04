"use client";

import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { BsPostcardHeart } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdOutlineHomeRepairService, MdOutlineSpaceDashboard } from "react-icons/md";
import { PiSignOut } from "react-icons/pi";

const Navbar = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSignOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push("/login");
  };

  return (
    <Box width="250px" p={4} bg="gray.100" height="100vh" position="fixed">
      <Stack spacing={10}>
        <Text fontSize="xl" fontWeight="bold">Backoffice</Text>

        <Box
          bg={currentRoute === "/dashboard" ? "teal.200" : "transparent"}
          _hover={{ bg: "teal.100" }}
          p={2}
          borderRadius="md"
        >
          <Link
            onClick={() => handleNavigation("/dashboard")}
            color="teal.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex alignItems={'center'}>
              <MdOutlineSpaceDashboard size="24px" style={{ marginRight: '8px' }} />
              <Text fontSize="m">Dashboard</Text>
            </Flex>
          </Link>
        </Box>

        <Box
          bg={currentRoute === "/users" ? "teal.200" : "transparent"}
          _hover={{ bg: "teal.100" }}
          p={2}
          borderRadius="md"
        >
          <Link
            onClick={() => handleNavigation("/users")}
            color="teal.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex alignItems={'center'}>
              <FiUsers size="24px" style={{ marginRight: '8px' }} />
              <Text fontSize="m">Users</Text>
            </Flex>
          </Link>
        </Box>

        <Box
          bg={currentRoute === "/twitsnaps" ? "teal.200" : "transparent"}
          _hover={{ bg: "teal.100" }}
          p={2}
          borderRadius="md"
        >
          <Link
            onClick={() => handleNavigation("/twitsnaps")}
            color="teal.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex alignItems={'center'}>
              <BsPostcardHeart size="24px" style={{ marginRight: '8px' }} />
              <Text fontSize="m">Twitsnaps</Text>
            </Flex>
          </Link>
        </Box>

        <Box
          bg={currentRoute === "/services" ? "teal.200" : "transparent"}
          _hover={{ bg: "teal.100" }}
          p={2}
          borderRadius="md"
        >
          <Link
            onClick={() => handleNavigation("/services")}
            color="teal.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex alignItems={'center'}>
              <MdOutlineHomeRepairService size="24px" style={{ marginRight: '8px' }} />
              <Text fontSize="m">Services</Text>
            </Flex>
          </Link>
        </Box>

        <Box
          _hover={{ bg: "teal.100" }}
          p={2}
          borderRadius="md"
        >
          <Link
            onClick={handleSignOut}
            color="teal.500"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Flex alignItems={'center'}>
              <PiSignOut size="24px" style={{ marginRight: '8px' }} />
              <Text fontSize="m">Sign Out</Text>
            </Flex>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
