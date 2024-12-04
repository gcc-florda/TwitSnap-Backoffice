import { Box, Heading, Flex, Text, Stat, StatLabel, StatNumber, Card, CardBody, Skeleton, VStack } from "@chakra-ui/react";

interface DashboardProps {
  metricsData: MetricsData;
}

interface Location {
  location: string
  userCount: number
}

interface Hashtag {
  name: string
  _count: {
    twitSnaps: number
  }
}

interface MetricsData {
  totalUsers: number
  totalTwitSnaps: number
  signupSuccessRate: number
  successfulLogins: number
  failedLogins: number
  blockedUsersCount: number
  googleUsersCount: number
  successfulGoogleLogins: number
  failedGoogleLogins: number
  usersByLocation: Location[]
  likedTwitSnapsCount: number
  repostedTwitSnapsCount: number
  twitsnapFrequency: number
  totalHashtagsCount: number
  topHashtags: Hashtag[]
}

const Dashboard = ({ metricsData }: DashboardProps) => {
  return (
    <Box p={6}>
      <Flex justifyContent="flex-start" mb={4}>
        <Heading size="lg">Welcome, admin</Heading>
      </Flex>

      <Flex justifyContent="space-evenly" mt={10} mb={20}>

        {/* User Registered Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>User Registered</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>Number of Users registered</StatLabel>
                  <StatNumber>{metricsData?.totalUsers}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Signup Success Rate</StatLabel>
                  <StatNumber>{Math.round(metricsData?.signupSuccessRate ?? 0)}%</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>

        {/* User Login Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>User Login</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>Successful Logins</StatLabel>
                  <StatNumber>{metricsData?.successfulLogins}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Failed Logins</StatLabel>
                  <StatNumber>{metricsData?.failedLogins}</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>TwitSnaps</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>TwitSnaps Created</StatLabel>
                  <StatNumber>{metricsData?.totalTwitSnaps}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Number of likes</StatLabel>
                  <StatNumber>{metricsData?.likedTwitSnapsCount}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Number of reposts</StatLabel>
                  <StatNumber>{metricsData?.repostedTwitSnapsCount}</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>
      </Flex>

      <Flex justifyContent="space-evenly" mb={10} flexWrap="wrap">
        {/* Google Users Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>Google Users</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>Number of Google Users</StatLabel>
                  <StatNumber>{metricsData?.googleUsersCount}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Successful Google Logins</StatLabel>
                  <StatNumber>{metricsData?.successfulGoogleLogins}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Failed Google Logins</StatLabel>
                  <StatNumber>{metricsData?.failedGoogleLogins}</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Stat>
                <Heading size="m" mb={5}>Blocked Users</Heading>
                <StatNumber>{metricsData?.blockedUsersCount}</StatNumber>
              </Stat>
            </CardBody>
          </Card>
        </Skeleton>

        <Skeleton isLoaded={metricsData != null} width="300px" height="auto">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>User Locations</Heading>
              <VStack align="start" spacing={5}>
                {metricsData?.usersByLocation?.map((location: Location) => (
                  <Stat key={location.location}>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={'10px'}>
                      <StatLabel>{location.location}:</StatLabel>
                      <Text>{location.userCount}</Text>
                    </Flex>
                  </Stat>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>
      </Flex>

      <Flex justifyContent="space-evenly" mb={10} flexWrap="wrap">
        {/* Twitsnap Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>Twitsnaps</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>Total Twitsnaps</StatLabel>
                  <StatNumber>{metricsData?.totalTwitSnaps}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Twitsnaps Frequency</StatLabel>
                  <StatNumber>{metricsData?.twitsnapFrequency}</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>

        {/* Hashtag Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="300px">
          <Card width="300px" height="300px">
            <CardBody>
              <Stat>
                <Heading size="m" mb={5}>Hashtags Info</Heading>
                <Stat>
                  <StatLabel>Total Hashtags</StatLabel>
                  <StatNumber>{metricsData?.totalHashtagsCount}</StatNumber>
                </Stat>
              </Stat>
              <Heading size="m" mt={5} mb={5}>Top 3 Hashtags</Heading>
              <VStack align="start" spacing={5}>
                {metricsData?.topHashtags?.map((hashtag: Hashtag) => (
                  <Stat key={hashtag.name}>
                    <Flex justifyContent={'center'} alignItems={'center'} gap={'10px'}>
                      <StatLabel>{hashtag.name}:</StatLabel>
                      <Text>{hashtag._count.twitSnaps}</Text>
                    </Flex>
                  </Stat>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>

        {/* Streaming Card */}
        <Skeleton isLoaded={metricsData != null} width="300px" height="auto">
          <Card width="300px" height="300px">
            <CardBody>
              <Heading size="m" mb={5}>Streamings</Heading>
              <VStack align="start" spacing={5}>
                <Stat>
                  <StatLabel>Total Streamings</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Avergage streaming rate</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>User participation</StatLabel>
                  <StatNumber>0</StatNumber>
                </Stat>
              </VStack>
            </CardBody>
          </Card>
        </Skeleton>
      </Flex>
    </Box>
  );

};

export default Dashboard;
