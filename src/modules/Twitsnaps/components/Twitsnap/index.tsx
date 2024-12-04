'use client';

import { TwitsnapDetails } from '@/src/modules/Twitsnaps/models/twitsnap';
import { Box, Button, Divider, Flex, Heading, Skeleton, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { blockTwitsnap, getTwitsnap, unblockUser } from "../../actions";
import { ChevronLeftIcon } from '@chakra-ui/icons';

const Twitsnap = () => {
    const { id } = useParams() as { id: string };
    const [twitsnap, setTwitsnap] = useState<TwitsnapDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const fetchTwitsnap = useCallback(async () => {
        if (!token || !id) return;

        try {
            const response = await getTwitsnap(id as string, token);
            if (response) {
                const twitsnapData = response.data;
                setTwitsnap({
                    id: twitsnapData.id,
                    user: {
                        name: twitsnapData.user.name
                    },
                    isBlocked: twitsnapData.isBlocked,
                    value: twitsnapData.value,
                    likesCount: twitsnapData._count.likes,
                    sharesCount: twitsnapData._count.reposts
                });
            }
        } catch (e) {
            setError(`Error fetching Twitsnap: ${(e as Error).message}`);
        } finally {
            setLoading(false);
        }
    }, [id, token]);

    const block = async () => {
        if (!token || !id) return;
        try {
            await blockTwitsnap(id as string, token);
            setTwitsnap((prevTwitsnap) => prevTwitsnap ? { ...prevTwitsnap, isBlocked: true } : null);
        } catch (e) {
            console.log('Failed to block twitsnap', e);
        }
    };

    const unblock = async () => {
        if (!token || !id) return;
        try {
            await unblockUser(id as string, token!);
            setTwitsnap((prevTwitsnap) => prevTwitsnap ? { ...prevTwitsnap, isBlocked: false } : null);
        } catch (e) {
            console.log('Failed to unblock twitsnap', e);
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
            fetchTwitsnap();
        }
    }, [id, token, fetchTwitsnap]);

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
                    Twitsnap Detail
                </Heading>
                <Flex gap={'10px'}>
                    <Button colorScheme="green" disabled={!twitsnap?.isBlocked} onClick={unblock}>
                        Unblock
                    </Button>
                    <Button colorScheme="red" disabled={twitsnap?.isBlocked} onClick={block}>
                        Block
                    </Button>
                </Flex>
            </Flex>

            <Stack spacing={4} divider={<Divider />}>
                <Text fontSize="lg"><strong>Twitsnap:</strong> {twitsnap?.value}</Text>
                <Text fontSize="lg"><strong>Posted by:</strong> {twitsnap?.user.name}</Text>
                <Text fontSize="lg"><strong>Likes: </strong>{twitsnap?.likesCount || 0}</Text>
                <Text fontSize="lg"><strong>Blocked:</strong> {twitsnap?.isBlocked ? 'Yes' : 'No'}</Text>
                <Text fontSize="lg"><strong>Number of Shares: </strong>{twitsnap?.sharesCount || 0}</Text>
            </Stack>
        </Box>
    );
};

export default Twitsnap;
