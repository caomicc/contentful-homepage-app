import { Card, Flex, Text } from '@contentful/f36-components';
import React from 'react';

interface StatCardProps {
  count: number;
  title: string;
}

export const StatCard = ({ count, title }: StatCardProps) => (
  <Card padding="none"
  style={{
        padding: '0.5rem 0.75rem'

  }}>
    <Flex flexDirection="column" alignItems="center" gap="Xs">
      <Text
        lineHeight={'lineHeightCondensed'}
        fontSize="fontSizeXl"
        fontWeight="fontWeightDemiBold"
      >
        {count}
      </Text>
      <Text fontSize="fontSizeS">{title}</Text>
    </Flex>
  </Card>
);
