import React from 'react';
import {
  Box,
  Flex,
  HelpText,
  SectionHeading,
} from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import Comments from './Comments';
import { createClient } from 'contentful-management';

const getUserComments = async (cma: any) => {
  try {
    const [editor, currentUser, comments] = await Promise.all([
      cma.editorInterface,
      cma.user,
      cma.comment,
    ]);
    // console.log('currentUser', currentUser);
    return {
      editor: { num: editor, text: 'Editor' },
      currentUser: { num: currentUser, text: 'Current user' },
      comments: { num: comments, text: 'Comments' },
    };
  } catch (e) {
    console.log('ln 25', e);
  }
};

const CommentsContainer = () => {
  const sdk = useSDK();
  const cma = useCMA();
  const cma2 = createClient({ apiAdapter: sdk.cmaAdapter });

  console.log('cma2', cma2);

  const { result, loading } = useAsync(getUserComments, [cma]);

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
            {console.log('result', result)}
            {console.log('result', result.currentUser.num)}
            <HelpText>Hmmm....</HelpText>
            {/* <Comments currentUser={result.currentUser} /> */}
          </>
        ) : (
          <HelpText>Nothing to see here folks 😇</HelpText>
        )}
      </Flex>
    </Box>
  );
};

export default CommentsContainer;
