import { Text, Stack, Badge } from '@contentful/f36-components';
import type { Role } from '@contentful/app-sdk';
import React from 'react';

type UserRoleProps = {
  spaceMembership: any;
};

export const UserRole = ({ spaceMembership }: UserRoleProps) => (
  <Stack spacing="spacingXs">
    <Text>
      {spaceMembership.roles.length >= 2 ? 'Current Roles:' : 'Current Role:'}
    </Text>
    <div>
      {spaceMembership.roles.length >= 1 && (
        <>
          {spaceMembership.roles.map((role: Role) => {
            return (
              <Badge
                variant="positive"
                key={role.name}
                className="f36-margin-right--2xs f36-margin-left--2xs"
              >
                role.name
              </Badge>
            );
          })}
        </>
      )}
      {spaceMembership.admin && (
        <Badge
          variant="positive"
          className="f36-margin-right--2xs f36-margin-left--2xs"
        >
          Admin
        </Badge>
      )}
    </div>
  </Stack>
);
