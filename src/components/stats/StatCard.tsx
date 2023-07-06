import { Card, Flex, Text } from '@contentful/f36-components';
import React from 'react';

interface StatCardProps {
  count: number;
  title: string;
}

export const StatCard = ({ count, title }: StatCardProps) => (
  <Card padding="large">
    <Flex flexDirection="column" alignItems="center" gap="spacingM">
      <Text
        lineHeight={'lineHeightCondensed'}
        fontSize="fontSize2Xl"
        fontWeight="fontWeightDemiBold"
      >
        {count}
      </Text>
      <Text fontSize="fontSizeS">{title}</Text>
    </Flex>
  </Card>
);
