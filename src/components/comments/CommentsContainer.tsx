import React from 'react';
import {
  Box,
  Flex,
  HelpText,
  SectionHeading,
} from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA } from '@contentful/react-apps-toolkit';
import Comments from './Comments';
import { createClient } from 'contentful-management';

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? 'check_CONTENTFUL_SPACE_ID',
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ?? 'check_CONTENTFUL_ACCESS_TOKEN',
});

const getUserComments = async (cma: ReturnType<typeof useCMA>) => {
  try {
    const [currentUser] = await Promise.all([
      // client.getCurrentUser(),
      cma.user.getCurrent({}),
      cma.comment,
    ]);
    console.log('currentUser', currentUser);
    // console.log('userInfo', userInfo);
    return {
      currentUser: { num: currentUser, text: 'Current user' },
      // userInfo: { num: userInfo, text: 'User Info' },
    };
  } catch (e) {
    console.log(e);
  }
};

const CommentsContainer = () => {
  const cma = useCMA();
  // const sdk = useSDK();

  // console.log('cma', cma);
  // console.log('sdk', sdk);
  // console.log('client', client);

  const { result, loading } = useAsync(getUserComments, [cma]);

  // console.log(result, loading);

  return (
    <Box
      style={{
        width: '100%',
        maxWidth: '20rem',
      }}
    >
      <SectionHeading>Recent comments</SectionHeading>
      <Flex
        // marginTop="spacingXl"
        fullWidth
      >
        {loading ? <HelpText>Loading comments...</HelpText> : ''}
        {result ? (
          <>
            <Comments currentUser={result.currentUser} />
          </>
        ) : (
          <HelpText>Nothing to see here folks 😇</HelpText>
        )}
      </Flex>
    </Box>
  );
};

export default CommentsContainer;
