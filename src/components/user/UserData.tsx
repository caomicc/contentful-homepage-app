import {
  Text,
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

  return (
    <>
      <Flex flexDirection="column" gap="spacingS" style={{
        padding: '0.5rem 0.75rem'
      }}>
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
        <UserRole spaceMembership={sdk.user.spaceMembership} />
      </Flex>
    </>
  );
};
