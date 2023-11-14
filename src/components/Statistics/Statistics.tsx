import { Grid, Stack, rem } from '@mantine/core';
import React, { memo } from 'react';
import TopFiveThisWeek from './TopFiveThisWeek';
import TotalClasses from './TotalClasses/TotalClasses';
import YearlyRankings from './YearlyRankings';

const Statistics = () => {
  return (
    <React.Fragment>
      <Grid mt="xl">
        <Grid.Col span={6}>
          <Stack spacing={20}>
            <TotalClasses />
            <TopFiveThisWeek />
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <YearlyRankings />
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
};

export default memo(Statistics);
