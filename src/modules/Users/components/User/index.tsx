'use client';

import { TwitsnapDetails } from '@/src/modules/Twitsnaps/models/twitsnap';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Heading, Skeleton, SkeletonText, Stack, Text, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "../../models";
import { blockUser, getTwitsnapsByUserId, getUserById, registerUserAdmin, unblockUser } from '../../actions';
import { UserVerificationModal } from '../UserVerificationModal';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userTweetsnaps, setUserTweetsnaps] = useState<TwitsnapDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const toggleVerificationModal = () => setVerificationModalOpen(!isVerificationModalOpen);

  useEffect(() => {
    const tokenFromCookies = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1] || '';

    setToken(tokenFromCookies);
  }, []);

  const getTwitsnaps = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getTwitsnapsByUserId(id as string, token);
      if (response) {
        setUserTweetsnaps(response.data || []);
      }
    } catch (e) {
      setError(`Error fetching user's Tweetsnaps: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  const getUserInfo = useCallback(async () => {
    if (!token) return;
    try {
      const response = await getUserById(id as string, token);
      if (response) {
        setUser(response.data);
      }
    } catch (e) {
      setError(`Error fetching user: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  const makeUserAdmin = async () => {
    if (!token) return;
    try {
      await registerUserAdmin(id as string, token);
      setUser((prevUser) => prevUser ? { ...prevUser, isAdmin: true } : null);
    } catch (e) {
      console.log('Failed to make user admin', e);
    }
  }

  const block = async () => {
    if (!token) return;
    try {
      await blockUser(id as string, token);
      setUser((prevUser) => prevUser ? { ...prevUser, isBlocked: true } : null);
    } catch (e) {
      console.log('Failed to block user', e);
    }
  }

  const unblock = async () => {
    if (!token) return;
    try {
      await unblockUser(id as string, token);
      setUser((prevUser) => prevUser ? { ...prevUser, isBlocked: false } : null);
    } catch (e) {
      console.log('Failed to unblock user', e);
    }
  }

  useEffect(() => {
    if (id && token) {
      getUserInfo();
      getTwitsnaps();
    }
  }, [id, token, getUserInfo, getTwitsnaps]);

  if (loading) {
    return (
      <Box p={5}>
        <Skeleton height="40px" mb={4} />
        <SkeletonText mt={4} noOfLines={4} spacing={4} skeletonHeight="20px" />
        <Skeleton height="30px" mt={6} mb={3} />
        <SkeletonText noOfLines={5} spacing={4} skeletonHeight="20px" />
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
          {user?.name}&apos;s Profile
        </Heading>

        <Flex gap={'10px'}>
          <Button colorScheme="blue" disabled={user?.isAdmin} onClick={makeUserAdmin}>
            Make Admin
          </Button>
          <Button colorScheme="purple" disabled={user?.verification == null} onClick={toggleVerificationModal}>
            Verify
          </Button>
          <Button colorScheme="green" disabled={!user?.isBlocked} onClick={unblock}>
            Unblock
          </Button>
          <Button colorScheme="red" disabled={user?.isBlocked} onClick={block}>
            Block
          </Button>
        </Flex>
      </Flex>

      <Stack spacing={4} divider={<Divider />}>
        <Text fontSize="lg"><strong>Email:</strong> {user?.email}</Text>
        <Text fontSize="lg"><strong>Location:</strong> {user?.location}</Text>
        <Text fontSize="lg"><strong>TweetSnaps Count:</strong> {userTweetsnaps.length}</Text>
        <Text fontSize="lg"><strong>Follows:</strong> {user?.followingCount}</Text>
        <Text fontSize="lg"><strong>Followers:</strong> {user?.followersCount}</Text>
        <Text fontSize="lg"><strong>Admin:</strong> {user?.isAdmin ? 'Yes' : 'No'}</Text>
        <Text fontSize="lg"><strong>Blocked:</strong> {user?.isBlocked ? 'Yes' : 'No'}</Text>
        <Text fontSize="lg"><strong>Verified:</strong> {user?.isVerified ? 'Yes' : 'No'}</Text>
      </Stack>

      <Box mt={6}>
        <Heading as="h3" size="lg" mb={3}>
          Tweetsnaps
        </Heading>
        <VStack spacing={2} align="stretch">
          {userTweetsnaps.length > 0 ? (
            userTweetsnaps.map(tweetsnap => (
              <Box key={tweetsnap.id} p={3} borderWidth={1} borderRadius="md">
                <Text fontWeight="bold">{tweetsnap.user.name}</Text>
                <Text>{tweetsnap.value}</Text>
              </Box>
            ))
          ) : (
            <Text>No Tweetsnaps available</Text>
          )}
        </VStack>
      </Box>

      <UserVerificationModal userId={user?.id ?? null} userVerification={user?.verification ?? null} token={token} isVerificationModalOpen={isVerificationModalOpen} toggleVerificationModal={toggleVerificationModal} />
    </Box>
  );
};

export default User;