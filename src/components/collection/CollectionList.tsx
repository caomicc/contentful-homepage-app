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
  Button,
  Flex,
} from '@contentful/f36-components';

export type CollectionsState = {
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

export type CollectionListProps = {
  entries: any;
  tag?: any;
  onClickItem: (entryId: string) => void;
};

export default function CollectionList({
  entries,
  onClickItem,
}: CollectionListProps) {
  if (!entries) {
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
          {Array(4)
            .fill('')
            .map((_, i) => (
              <SkeletonRow key={i} />
            ))}
        </TableBody>
      </Table>
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
            <TableCell>Workflow</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry: any) => {
            return (
              <TableRow
                key={entry.sys.id}
                onClick={() => onClickItem(entry.sys.id)}
                className="cr-pointer poc-table"
              >
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  {entry.fields.title
                    ? entry.fields.title['en-US']
                    : 'Untitled'}
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                    textTransform: 'capitalize',
                  }}
                >
                  {entry.sys.contentType.sys.id}
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  {new Date(entry.sys.updatedAt).toLocaleDateString('en-US')}
                </TableCell>
                <TableCell
                  style={{
                    verticalAlign: 'middle',
                  }}
                >
                  {entry.metadata.tags.map((tag: any, i) => {
                    return (
                      <Flex key={i}>
                        <div className={tag.sys.id}></div>
                        {tag.sys.id ===
                          'ctf-workflows-tag-NRI-gHosZsKm_AA6SnrBD' && (
                          <>Ready For Approval</>
                        )}
                        {tag.sys.id ===
                          'ctf-workflows-tag-io8LB_6CtVSd59F0LEO3h' && (
                          <>Approved</>
                        )}
                        {tag.sys.id ===
                          'ctf-workflows-tag-_n9nvHgUJBYD_o0yTQVY_' && (
                          <>Draft</>
                        )}
                      </Flex>
                    );
                  })}
                </TableCell>
                <TableCell>
                  <Flex justifyContent="space-between" alignItems="center">
                    <span>{getEntryStatus(entry.sys)}</span>
                    <Button size="small">Edit</Button>
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
  return <HelpText className="f36-margin-top--m">No entries found.</HelpText>;
}
