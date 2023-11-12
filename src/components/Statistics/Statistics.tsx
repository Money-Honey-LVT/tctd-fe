import React, { memo } from 'react';
import TotalClasses from './TotalClasses/TotalClasses';
import { Center, Grid, Text, Title } from '@mantine/core';

const Statistics = () => {
  return (
    <>
      <Grid justify="center" mt="xl">
        <Grid.Col span={6}>
          <TotalClasses />
        </Grid.Col>
        {/* <Grid.Col span={6}>
        <TotalClasses />
      </Grid.Col> */}
      </Grid>
    </>
  );
};

export default memo(Statistics);
