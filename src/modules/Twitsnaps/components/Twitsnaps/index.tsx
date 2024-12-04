'use client'

import { Box, Container, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, Skeleton } from "@chakra-ui/react";
import Link from 'next/link';
import { useCallback, useEffect, useState } from "react";
import { getTwitsnaps } from "../../actions/twitsnaps";
import { TwitsnapDetails } from "../../models/twitsnap";
import { Filter } from "@/src/modules/common";

const Twitsnaps = () => {
  const [twitsnaps, setTwitsnaps] = useState<TwitsnapDetails[]>([]);
  const [filteredTwitsnaps, setFilteredTwitsnaps] = useState<TwitsnapDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const getTwitsnapsInfo = useCallback(async () => {
    if (!token) return;

    try {
      const response = await getTwitsnaps(token);
      setTwitsnaps(response.data);
      setFilteredTwitsnaps(response.data);
    } catch (e) {
      setError(`Error fetching twitsnaps: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || '';
    setToken(cookieToken);
  }, []);

  useEffect(() => {
    if (token) {
      getTwitsnapsInfo();
    }
  }, [token, getTwitsnapsInfo]);

  useEffect(() => {
    setFilteredTwitsnaps(
      twitsnaps.filter(twitsnap => twitsnap.value.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, twitsnaps]);

  return (
    <Container maxW="container.lg" mt={10}>
      <Box mb={6}>
        <Heading as="h1" size="xl" textAlign="center" color="teal.500">
          Twitsnaps
        </Heading>
      </Box>

      <Filter onFilterChange={setFilter} />

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>User</Th>
            <Th>Twitsnap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
              </Tr>
            ))
          ) : error ? (
            <Tr>
              <Td colSpan={3}>
                <Text color="red.500">{error}</Text>
              </Td>
            </Tr>
          ) : (
            filteredTwitsnaps.map((twitsnap) => (
              <Tr key={twitsnap.id}>
                <Td>{twitsnap.id}</Td>
                <Td>{twitsnap.user.name}</Td>
                <Td>
                  <Link href={`/twitsnaps/${twitsnap.id}`} passHref>
                    <Text color="teal.500" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                      {twitsnap.value}
                    </Text>
                  </Link>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Twitsnaps;
