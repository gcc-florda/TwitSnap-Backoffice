'use client';

import { Box, Button, Divider, Flex, Heading, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { blockService, unBlockService, getService } from "../../actions";
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ServiceDetail } from "../Services";

export const Service = () => {
    const params = useParams<{ id: string }>();
    const id = params?.id || '';
    const [service, setService] = useState<ServiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const fetchService = useCallback(async () => {
        if (!token || !id) return;

        try {
            const response = await getService(id as string, token);
            if (response) {
                setService(response.data);
            }
        } catch (e) {
            setError(`Error fetching service: ${(e as Error).message}`);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    const block = async () => {
        if (!token || !id) return;

        try {
            await blockService(id as string, token);
            setService((prevService) => prevService ? { ...prevService, isBlocked: true } : null);
            setService((prevService) => prevService ? { ...prevService, isActive: false } : null);
        } catch (e) {
            console.log('Failed to block service', e);
        }
    };

    const unblock = async () => {
        if (!token || !id) return;

        try {
            await unBlockService(id as string, token);
            setService((prevService) => prevService ? { ...prevService, isBlocked: false } : null);
        } catch (e) {
            console.log('Failed to unblock service', e);
        }
    };

    useEffect(() => {
        const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1] || '';
        setToken(cookieToken);
    }, []);

    useEffect(() => {
        if (id && token) {
            fetchService();
        }
    }, [id, token, fetchService]);

    if (loading) {
        return (
            <Box p={5}>
                <Skeleton height="40px" mb={4} />
                <SkeletonText mt={4} noOfLines={4} spacing={4} skeletonHeight="20px" />
            </Box>
        );
    }

    if (error) return <Text color="red.500">{error}</Text>;

    return (
        <Box p={5}>
            <Button variant="link" onClick={() => window.history.back()} marginBottom={'10px'} leftIcon={<ChevronLeftIcon boxSize={'20px'} />}>
                Back
            </Button>
            <Flex justifyContent={'space-between'}>
                <Heading as="h2" size="lg" mb={4}>
                    Service Detail
                </Heading>
                <Flex gap={'10px'}>
                    <Button colorScheme="red" disabled={service?.isBlocked} onClick={block}>
                        Block
                    </Button>
                    <Button colorScheme="blue" disabled={!service?.isBlocked} onClick={unblock}>
                        Unblock
                    </Button>
                </Flex>
            </Flex>

            <Stack spacing={4} divider={<Divider />}>
                <Text fontSize="lg"><strong>ID:</strong> {service?.serviceId}</Text>
                <Text fontSize="lg"><strong>Name:</strong> {service?.name}</Text>
                <Text fontSize="lg"><strong>Status:</strong> {!service?.isBlocked ? "Active" : "Inactive"}</Text>
                <Text fontSize="lg"><strong>Blocked:</strong> {service?.isBlocked ? "Yes" : "No"}</Text>
                <Text fontSize="lg"><strong>Created On:</strong> {new Date(service?.createdOn ?? '').toLocaleDateString()}</Text>
                <Text fontSize="lg"><strong>Description:</strong> {service?.description || "No description available"}</Text>
                <Text fontSize="lg"><strong>Endpoints:</strong>
                    {
                        service?.endpoints.map((endpoint, index) => (
                            <Text key={index} fontSize="md" marginTop={'10px'} ml={4}>{endpoint}</Text>
                        ))
                    }
                </Text>
            </Stack>
        </Box>
    );
};