import { Group, NumberInput, Select, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useFetchClasses } from '../../api/class';
import { IPoint, useGetAllPoints } from '../../api/hooks/useGetAllPoints';
import RankingsTable from './RankingsTable/RankingsTable';
import { monthRegex, weekRegex } from '../../constants/regex';

const Rankings = () => {
  const { points } = useGetAllPoints();
  const { classes } = useFetchClasses();

  const [fetchedData, setFetchedData] = useState<IPoint[]>(points);
  const [filterData, setFilterData] = useState<IPoint[]>(points);
  useEffect(() => {
    setFetchedData(points);
  }, [points]);

  const [selectedClass, setSelectedClass] = useState<string | null>();
  const [selectedWeek, setSelectedWeek] = useState<number | ''>('');
  const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
  const [selectedSemester, setSelectedSemester] = useState<number | ''>('');

  useEffect(() => {
    setFetchedData(
      points.filter(({ classPoint: { name }, time: { week, month, semester } }) => {
        if (selectedWeek !== '' && week.match(weekRegex)?.[1] !== selectedWeek.toString()) {
          return false;
        }
        if (selectedMonth !== '' && month.match(monthRegex)?.[1] !== selectedMonth.toString()) {
          return false;
        }
        if (selectedSemester !== '' && `SEMESTER_${selectedSemester.toString()}` !== semester) {
          return false;
        }
        if (selectedClass && selectedClass !== name) {
          return false;
        }
        return true;
      })
    );
  }, [selectedClass, selectedWeek, selectedMonth, selectedSemester]);

  return (
    <Stack>
      <Group align="end" grow>
        <Select
          w={80}
          label="Lớp"
          placeholder="Chọn lớp"
          data={classes.map((_class) => _class.name)}
          clearable
          onChange={setSelectedClass}
        />
        <NumberInput
          disabled={selectedMonth !== '' || selectedSemester !== ''}
          label="Tuần"
          max={35}
          min={1}
          placeholder="Nhập tuần (Từ tuần 1 đến 35)"
          onChange={setSelectedWeek}
        />
        <NumberInput
          disabled={selectedWeek !== '' || selectedSemester !== ''}
          label="Tháng"
          max={12}
          min={1}
          placeholder="Nhập tháng (Từ tháng 1 đến 12)"
          onChange={setSelectedMonth}
        />
        <NumberInput
          disabled={selectedWeek !== '' || selectedMonth !== ''}
          label="Kỳ học"
          min={1}
          max={2}
          placeholder="Nhập kỳ học (Kỳ 1 hay 2)"
          onChange={setSelectedSemester}
        />
      </Group>
      <RankingsTable data={fetchedData} />
    </Stack>
  );
};

export default Rankings;
