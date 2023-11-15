import { Container, Stack } from '@mantine/core';
import { IMonthlyRank, useGetMonthlyRank } from '../../api/hooks/useGetMonthlyRank';
import { useEffect, useState } from 'react';
import MonthlyRankingTables from './MonthlyRankingTables';

const MonthlyRanking = () => {
  const { ranks, loading } = useGetMonthlyRank();
  const [fetchedData, setFetchedData] = useState<IMonthlyRank[]>(ranks);

  useEffect(() => {
    setFetchedData(ranks);
  }, [ranks]);

  return (
    <Stack>
      <MonthlyRankingTables data={fetchedData} />
    </Stack>
  );
};

export default MonthlyRanking;
