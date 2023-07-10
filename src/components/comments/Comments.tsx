// @ts-nocheck
import React from 'react';

// import { EntrySys } from '@contentful/app-sdk';
import {
  Box,
  HelpText,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  // Badge,
  SkeletonRow,
} from '@contentful/f36-components';

export type CommentsState = {
  total: number | null;
  published: number | null;
  scheduled: number | null;
  recent: any[] | null;
};

// function getEntryStatus(entrySys: EntrySys) {
//   if (!!entrySys.archivedVersion) {
//     return <Badge variant="featured">archived</Badge>;
//   } else if (
//     !!entrySys.publishedVersion &&
//     entrySys.version === entrySys.publishedVersion + 1
//   ) {
//     return <Badge variant="positive">published</Badge>;
//   } else if (
//     !!entrySys.publishedVersion &&
//     entrySys.version >= entrySys.publishedVersion + 2
//   ) {
//     return <Badge variant="primary">changed</Badge>;
//   }
//   return <Badge variant="warning">draft</Badge>;
// }

export type CommentsProps = {
  currentUser?: any;
  tag?: any;
  onClickItem?: (entryId: string) => void;
};

export default function Comments({ currentUser, onClickItem }: CommentsProps) {
  if (!currentUser) {
    return (
      <HelpText
        style={{
          textAlign: 'center',
        }}
      >
        No currentUser found! Huh?
      </HelpText>
    );
  }

  if (currentUser.length) {
    return <Box>{currentUser.length}</Box>;
  }

  // No currentUser found (after fetching/loading).
  return (
    <Table fullWidth className="f36-margin-top--m">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Content Type</TableCell>
          <TableCell>Updated</TableCell>
          <TableCell>Workflow</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array(10)
          .fill('')
          .map((_, i) => (
            <SkeletonRow key={i} />
          ))}
      </TableBody>
    </Table>
  );
}
