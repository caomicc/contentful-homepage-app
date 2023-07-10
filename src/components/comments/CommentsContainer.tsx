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

const getUserComments = async (cma: ReturnType<typeof useCMA>) => {
  try {
    const [currentUser] = await Promise.all([
      cma.user.getCurrent({}),
      cma.comment,
    ]);
    console.log('currentUser', currentUser);
    return {
      currentUser: { num: currentUser, text: 'Current user' },
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
      <Flex fullWidth>
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
