'use client';

import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Skeleton,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getServices } from "../../actions";
import { Filter } from "@/src/modules/common";
import Link from 'next/link';
import { ServiceModal } from "../ServiceModal";

export interface ServiceDetail {
    serviceId: number;
    name: string;
    description: string;
    isActive: boolean;
    isBlocked: boolean;
    createdOn: string;
    endpoints: string[];
}

const servicesList = [
    '/user/signup',
    '/user/login',
    '/user/googlelogin',
    '/user/send-verification-pin',
    '/user/follow',
    '/user/search',
    '/twitsnap',
    '/twitsnap/like',
    '/twitsnap/unlike',
    '/twitsnap/repost',
]

export const Services = () => {
    const [services, setServices] = useState<ServiceDetail[]>([]);
    const [filteredServices, setFilteredServices] = useState<ServiceDetail[]>([]);
    const [modalFilter, setModalFilter] = useState("");
    const [filteredModalServices, setFilteredModalServices] = useState<string[]>(servicesList);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [filter, setFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllServices = useCallback(async () => {
        if (!token) return;

        try {
            const response = await getServices(token);
            if (response) {
                setServices(response.data);
                setFilteredServices(response.data);
            }
        } catch (e) {
            setError(`Error fetching services: ${(e as Error).message}`);
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
            getAllServices();
        }
    }, [token, getAllServices]);

    useEffect(() => {
        setFilteredServices(
            services.filter(service =>
                service.name.toLowerCase().includes(filter.toLowerCase())
            )
        );
    }, [filter, services]);

    useEffect(() => {
        setFilteredModalServices(
            servicesList.filter(service =>
                service.toLowerCase().includes(modalFilter.toLowerCase())
            )
        );
    }, [modalFilter]);

    return (
        <>
            <Container maxW="container.lg" mt={10}>
                <Box mb={6}>
                    <Heading as="h1" size="xl" textAlign="center" color="teal.500">
                        Services
                    </Heading>
                </Box>

                <Flex justifyContent={'space-between'}>
                    <Box width={'100%'}>
                        <Filter onFilterChange={setFilter} />
                    </Box>
                    <Button onClick={() => setIsModalOpen(true)}>Add</Button>
                </Flex>

                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Is Active</Th>
                            <Th>Is Blocked</Th>
                            <Th>Created On</Th>
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
                                <Td colSpan={5}>
                                    <Text color="red.500">{error}</Text>
                                </Td>
                            </Tr>
                        ) : (
                            filteredServices.map((service: ServiceDetail) => (
                                <Tr key={service.serviceId}>
                                    <Td>{service.serviceId}</Td>
                                    <Td>
                                        <Link href={`/services/${service.serviceId}`} passHref>
                                            <Text color="teal.500" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                                                {service.name?.toUpperCase()}
                                            </Text>
                                        </Link>
                                    </Td>
                                    <Td>{service.isActive ? "Yes" : "No"}</Td>
                                    <Td>{service.isBlocked ? "Yes" : "No"}</Td>
                                    <Td>{new Date(service.createdOn).toLocaleDateString()}</Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Container>
            <ServiceModal token={token ?? null} filteredModalServices={filteredModalServices} modalFilter={modalFilter} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setModalFilter={setModalFilter} />
        </>
    );
};
