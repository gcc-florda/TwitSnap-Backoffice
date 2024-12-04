'use client'

import { Box, Container, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, Skeleton } from "@chakra-ui/react";
import Link from 'next/link';
import { useCallback, useEffect, useState } from "react";
import { getUsers } from "../../actions/users";
import { UserProfile } from "../../models/user";
import { Filter } from "@/src/modules/common";

const Users = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  const getUsersInfo = useCallback(async () => {
    if (!token) return;

    try {
      const response = await getUsers(token);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (e) {
      setError(`Error fetching users: ${(e as Error).message}`);
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
      getUsersInfo();
    }
  }, [token, getUsersInfo]);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
    );
  }, [filter, users]);

  return (
    <Container maxW="container.lg" mt={10}>
      <Box mb={6}>
        <Heading as="h1" size="xl" textAlign="center" color="teal.500">
          Twitsnap Users
        </Heading>
      </Box>

      <Filter onFilterChange={setFilter} />

      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Location</Th>
            <Th>Is Verified</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
              </Tr>
            ))
          ) : error ? (
            <Tr>
              <Td colSpan={4}>
                <Text color="red.500">{error}</Text>
              </Td>
            </Tr>
          ) : (
            filteredUsers.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  <Link href={`/users/${user.id}`} passHref>
                    <Text color="teal.500" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                      {user.name}
                    </Text>
                  </Link>
                </Td>
                <Td>{user.email}</Td>
                <Td>{user.location}</Td>
                <Td>{user.isVerified ? 'Yes' : 'No'}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Users;
