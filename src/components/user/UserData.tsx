import {
  Text,
  Card,
  Flex,
  Box,
  Paragraph,
  Stack,
} from '@contentful/f36-components';
import { Avatar } from '@contentful/f36-avatar';
import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import greetPlugin from 'dayjs-greet';
import { useAsync } from 'react-async-hook';
import { UserRole } from './UserRole';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';

const currentDate = new Date();
const timestamp = currentDate.getTime();

dayjs.extend(greetPlugin);

export const UserData = () => {
  const cma = useCMA();
  const sdk = useSDK();
  // const getSpace = useCallback(async () => {
  //   return await sdk.ids.space;
  // }, [cma]);

  const getEnvironment = useCallback(async () => {
    return await sdk.ids.environment;
  }, [cma]);

  // const { result: spaceResult, loading: spaceLoading } = useAsync(getSpace, []);
  const { result: environmentResult, loading: environmentLoading } = useAsync(
    getEnvironment,
    []
  );

  return (
    <Card>
      <Flex flexDirection="column" gap="spacingS">
        <Box>
          <Stack>
            <Avatar src={sdk.user.avatarUrl} size="large" />
            <Box>
              <Text
                as={Paragraph}
                fontSize="fontSizeL"
                marginBottom={'spacingXs'}
              >
                👋 {dayjs(timestamp).greet()},
              </Text>
              <Text fontSize="fontSizeXl">{sdk.user.firstName}</Text>
            </Box>
          </Stack>
        </Box>
        {environmentResult && (
          <Text as={Paragraph} fontSize="fontSizeM">
            You're in the{' '}
            <Text fontColor="colorPositive" fontStack="fontStackMonospace">
              {environmentResult}
            </Text>{' '}
            environment.
          </Text>
        )}
        <UserRole spaceMembership={sdk.user.spaceMembership} />
      </Flex>
    </Card>
  );
};
