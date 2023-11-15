import { Container, Group, NumberInput, Select, Stack } from '@mantine/core';
import { IMonthlyRank, useGetMonthlyRank } from '../../api/hooks/useGetMonthlyRank';
import { useEffect, useState } from 'react';
import MonthlyRankingTables from './MonthlyRankingTables';
import { useFetchClasses } from '../../api/class';
import { monthRegex } from '../../constants/regex';
import { uniq, uniqBy } from 'lodash';

const MonthlyRanking = () => {
  const { ranks, loading } = useGetMonthlyRank();
  const { classes } = useFetchClasses();
  const [fetchedData, setFetchedData] = useState<IMonthlyRank[]>(ranks);
  const [selectMonthData, setSelectMonthData] = useState<string[]>([]);

  useEffect(() => {
    setFetchedData(ranks);
    setSelectMonthData(uniqBy(ranks, 'month').map(({ month }) => month.match(monthRegex)?.[1]) as string[]);
  }, [ranks]);

  const [selectedClass, setSelectedClass] = useState<string | null>();
  const [selectedMonth, setSelectedMonth] = useState<string | null>();

  useEffect(() => {
    // if (!selectedClass && !selectedMonth) {
    //   setFetchedData(ranks);
    //   return;
    // }
    setFetchedData(
      ranks.filter(({ className, month }) => {
        if (selectedMonth && month.match(monthRegex)?.[1] !== selectedMonth) {
          return false;
        }
        if (selectedClass && className !== selectedClass) {
          return false;
        }
        return true;
      })
    );
  }, [selectedClass, selectedMonth]);

  return (
    <Stack>
      <Group align="end">
        <Select
          w={180}
          label="Lớp"
          placeholder="Chọn lớp"
          data={classes.map((_class) => _class.name)}
          clearable
          onChange={setSelectedClass}
        />
        <Select
          w={250}
          label="Tháng"
          placeholder="Chọn tháng"
          data={selectMonthData}
          clearable
          onChange={setSelectedMonth}
        />
      </Group>
      <MonthlyRankingTables data={fetchedData} />
    </Stack>
  );
};

export default MonthlyRanking;
