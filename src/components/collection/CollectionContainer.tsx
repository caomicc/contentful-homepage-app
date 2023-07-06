// // @ts-nocheck
// // import { useQuery } from "react-query";
// import { HomeAppSDK } from '@contentful/app-sdk';
// import { Heading, Paragraph } from '@contentful/f36-components';
// import { useCMA } from '@contentful/react-apps-toolkit';
// import { useState, useEffect, useCallback } from 'react';

// import { useAsync } from 'react-async-hook';

// // import Collection from './Collection';
// // import CollectionList from './CollectionList';

// interface CollectionContainerProps {
//   sdk: HomeAppSDK;
//   cma?: any;
//   // contentTypes: ContentType[];
// }

// interface CollectionsState {
//   total: number | null;
//   published: number | null;
//   scheduled: number | null;
//   recent: any[] | null;
// }

// export default function CollectionContainer({
//   sdk,
//   contentTypes,
// }: CollectionContainerProps) {
//   const cma = useCMA();
//   const [entries, setEntries] = useState();

//   useEffect(() => {
//     cma.entries.getMany().then(setEntries);
//   }, [cma]);

//   const getEntries = useCallback(async () => {
//     const [contentTypes, entries, assets, locales, tags] = await Promise.all([
//       cma.contentType.getMany({}),
//       cma.entry.getMany({}),
//       cma.asset.getMany({}),
//       cma.locale.getMany({}),
//       cma.tag.getMany({}),
//     ]);

//     console.log('lets see', [contentTypes, entries, assets, locales, tags]);

//     return {
//       contentTypes: { num: contentTypes.total, text: 'Content Types' },
//       entries: { num: entries.total, text: 'Entries' },
//       assets: { num: assets.total, text: 'Assets' },
//       locales: { num: locales.total, text: 'Locales' },
//       tags: { num: tags.total, text: 'Tags' },
//     };
//   }, [cma]);

//   const { result, loading } = useAsync(getEntries, []);

//   console.log('entries?.length', entries?.length);

//   console.log('getEntries', getEntries);

//   console.log('result', result);

//   console.log('loading', loading);

//   // const { result: statResult, loading: statLoading } = useAsync(getStats, []);

//   // const fetchUsers = async (sdk: KnownAppSDK, cma: any) => {
//   //   const response  = await Promise.all([
//   //     // sdk.space.getEntries().then((entries) => entries.total).catch(() => 0),
//   //     cma.getSpace(sdk.ids.space).getEntries().then((entries) => entries.total).catch(() => 0),
//   //     // sdk.space.publishedEntries().then((entries) => entries).catch(() => 0),
//   //     // cma.publishedEntries.getMany().then((entries) => entries.total).catch(() => 0),
//   //     // cma.scheduledActions.getMany().then((entries) => entries.length).catch(() => 0),
//   //   ]);
//   //   // .json()

//   //   return response;
//   // };

//   // console.log('fetchUsers function', fetchUsers(sdk, cma))
//   // console.log('sdk', sdk)
//   // console.log('cma', cma)

//   // const { status, data, error, isFetching } = useQuery(
//   //   ['entries'],
//   //   async () => {
//   //     const entriesData = fetchUsers;
//   //     return entriesData
//   //   }
//   // )

//   // console.log('newQueries', status, data, error, isFetching)

//   // const response = useQuery("entries", fetchUsers);
//   // console.log('response', response);

//   // TODO
//   // const getAllTags = () => {
//   //   sdk.cma.readTags(0, 100).then((tags) => {
//   //     const newTags = tags.items.map(tag => tag.name)
//   //     console.log(newTags);
//   //   });
//   // }

//   // const userRolesToTagIds = (user: any) => {
//   //   const userRoles = user.spaceMembership.roles // Current logged in user role e.g. "Country: FR" Role

//   //   // Mapping through Role(s)
//   //   return userRoles.map(role => {
//   //     // Converting role name to id. "Country: FR" -> countryFR
//   //     const [roleName, roleCode] = role.name.split(': ');
//   //     const cleanRole = roleName.toLowerCase() + roleCode.substr(0, 1) + roleCode.substr(1).toLowerCase();

//   //     return {
//   //       sys: {
//   //         type: 'Link',
//   //         linkType: 'Tag',
//   //         id: cleanRole,
//   //       }
//   //     };
//   //   })
//   // }

//   // const createPost = async () => {
//   //   const newEntry = await sdk.cma.entry.create('post', {
//   //     metadata: {
//   //       tags: userRolesToTagIds(sdk.user)
//   //     }
//   //   });
//   //   sdk.navigator.openEntry(newEntry.sys.id);
//   // }

//   // useEffect(() => {
//   //   async function fetchData() {
//   //     // Fetch some basic statistics.
//   //     const [total, published, scheduled] = await Promise.all([
//   //       sdk.cma.entry.getMany()
//   //         .then((entries) => entries.total)
//   //         .catch(() => 0),
//   //       sdk.cma.publishedEntries.getMany()
//   //         .then((entries) => entries.total)
//   //         .catch(() => 0),
//   //       sdk.cma.scheduledActions.getMany()
//   //         .then((entries) => entries.length)
//   //         .catch(() => 0),
//   //     ]);

//   //     console.log("data", data)
//   //     console.log(total, published, scheduled)
//   //     // console.log(sdk.user.spaceMembership.roles)

//   //     setData({ ...data, total, published, scheduled });

//   //     // Fetch some entries were last updated by the current user.
//   //     const recent = await sdk.cma.entry.getMany({ 'sys.updatedBy.sys.id': sdk.user.sys.id, limit: 10 })
//   //       .then((entries) => entries.items)
//   //       .catch(() => []);

//   //     // Fetch all posts tagged with Country: UK id
//   //     // const allPostsTaggedWithUK = await sdk.cma.entry.getMany({ 'sys.contentType.sys.id': "post", limit: 10, 'metadata.tags.sys.id[all]': 'countryUk' })
//   //     //   .then((entries) => entries.items)
//   //     //   .catch(() => []);

//   //     // Set the final data. Loading complete.
//   //     setData({ total, published, scheduled, recent });
//   //   }

//   //   fetchData();
//   //   // getAllTags();
//   // }, []);

//   return (
//     <div className="f36-margin-top--xl">
//       <Heading element="h2">Your recent Posts</Heading>
//       <Paragraph>These entries were most recently updated by you.</Paragraph>
//       {/* <CollectionList
//         // contentTypes={contentTypes}
//         entries={data.recent}
//         onClickItem={(entryId) => sdk.navigator.openEntry(entryId)}
//       /> */}
//     </div>
//   );
// }

import React, { useCallback } from 'react';
import { Box, Flex, SectionHeading } from '@contentful/f36-components';
import { useAsync } from 'react-async-hook';
import { useCMA, useSDK } from '@contentful/react-apps-toolkit';
import CollectionList from './CollectionList';

const CollectionContainer = () => {
  const cma = useCMA();
  const sdk = useSDK();
  const getStats = useCallback(async () => {
    const [contentTypes, entries, assets, locales, tags] = await Promise.all([
      cma.contentType.getMany({}),
      cma.entry.getMany({
        query: {
          limit: 10,
        },
      }),
      cma.asset.getMany({}),
      cma.locale.getMany({}),
      cma.tag.getMany({}),
    ]);

    return {
      // contentTypes: { num: contentTypes.total, text: 'Content Types' },
      entries: { num: entries, text: 'Entries' },
      // assets: { num: assets.total, text: 'Assets' },
      // locales: { num: locales.total, text: 'Locales' },
      tags: { num: tags.total, text: 'Tags' },
    };
  }, [cma]);

  const { result, loading } = useAsync(getStats, []);
  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <SectionHeading>Your recent Posts</SectionHeading>
      {loading ? (
        <Flex marginTop="spacingXl">
          <CollectionList
            // contentTypes={contentTypes}
            entries={[]}
            onClickItem={(entryId) => sdk.navigator.openEntry(entryId)}
          />
        </Flex>
      ) : (
        <Flex
          style={{
            width: '100%',
          }}
        >
          {result && (
            <CollectionList
              // contentTypes={contentTypes}
              entries={result.entries.num.items}
              onClickItem={(entryId) => sdk.navigator.openEntry(entryId)}
            />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default CollectionContainer;
