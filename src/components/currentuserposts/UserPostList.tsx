// @ts-nocheck
import React from 'react';

import { EntrySys } from '@contentful/app-sdk';
import {
  HelpText,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Badge,
  SkeletonRow,
  Flex,
  Text,
} from '@contentful/f36-components';

export type UserPostState = {
  total: number | null;
  published: number | null;
  scheduled: number | null;
  recent: any[] | null;
};

function getEntryStatus(entrySys: EntrySys) {
  if (!!entrySys.archivedVersion) {
    return <Badge variant="featured">archived</Badge>;
  } else if (
    !!entrySys.publishedVersion &&
    entrySys.version === entrySys.publishedVersion + 1
  ) {
    return <Badge variant="positive">published</Badge>;
  } else if (
    !!entrySys.publishedVersion &&
    entrySys.version >= entrySys.publishedVersion + 2
  ) {
    return <Badge variant="primary">changed</Badge>;
  }
  return <Badge variant="warning">draft</Badge>;
}

export type UserPostListProps = {
  entries: any;
  tag?: any;
  onClickItem: (entryId: string) => void;
};

export default function UserPostList({
  entries,
  onClickItem,
}: UserPostListProps) {
  if (!entries) {
    return (
      <HelpText
        style={{
          textAlign: 'center',
        }}
      >
        No entries found, go edit some content!
      </HelpText>
    );
  }

  if (entries.length) {
    return (
      <Table fullWidth className="f36-margin-top--m">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Content Type</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry: any) => {
            console.log('entry', entry);
            return (
              <TableRow
                key={entry.sys.id}
                onClick={() => onClickItem(entry.sys.id)}
                className="cr-pointer poc-table"
              >
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                  }}
                >
                  <Text
                    style={{
                      fontWeight: '500',
                      lineClamp: 2,
                      boxOrient: 'vertical',
                      color: 'rgb(17, 27, 43)',
                    }}
                  >
                    {entry.fields.title
                      ? entry.fields.title['en-US']
                      : entry.fields.internalName
                      ? entry.fields.internalName['en-US']
                      : entry.fields.internalTitle
                      ? entry.fields.internalTitle['en-US']
                      : entry.fields.pageTitle
                      ? entry.fields.pageTitle['en-US']
                      : entry.fields.pageHeading
                      ? entry.fields.pageHeading['en-US']
                      : entry.fields.name
                      ? entry.fields.name['en-US']
                      : entry.fields.text
                      ? entry.fields.text['en-US']
                      : 'Untitled'}
                  </Text>
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                    width: '20%',
                  }}
                >
                  <Text
                    style={{
                      color: 'rgb(65, 77, 99)',
                    }}
                  >
                    {entry.sys.contentType.sys.id}
                  </Text>
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                  }}
                >
                  <Text
                    style={{
                      color: 'rgb(65, 77, 99)',
                    }}
                  >
                    {new Date(entry.sys.updatedAt).toLocaleDateString('en-US')}
                  </Text>
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                    width: '20%',
                  }}
                >
                  <Text
                    style={{
                      color: 'rgb(65, 77, 99)',
                    }}
                  >
                    {entry.sys.createdBy.sys.id}
                  </Text>
                </TableCell>
                <TableCell
                  style={{
                    width: '20%',
                  }}
                >
                  <Flex justifyContent="space-between" alignItems="center">
                    <span>{getEntryStatus(entry.sys)}</span>
                    {/* <Button size="small">Edit</Button> */}
                  </Flex>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  // No entries found (after fetching/loading).
  return (
    <Table fullWidth className="f36-margin-top--m">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Content Type</TableCell>
          <TableCell>Updated</TableCell>
          <TableCell>Created By</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <SkeletonRow key={i} />
          ))}
      </TableBody>
    </Table>
  );
}
