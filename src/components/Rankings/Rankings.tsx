import { Button, Group, NumberInput, Select, Stack, rem } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFetchClasses } from '../../api/class';
import { IPoint, useGetAllPoints } from '../../api/hooks/useGetAllPoints';
import RankingsTable from './RankingsTable/RankingsTable';

const Rankings = () => {
  const { points } = useGetAllPoints();
  const { classes } = useFetchClasses();

  const [fetchedData, setFetchedData] = useState<IPoint[]>(points);

  useEffect(() => {
    setFetchedData(points);
  }, [points]);

  return (
    <Stack>
      <Group align="end" grow>
        <Select w={80} label="Lớp" placeholder="Chọn lớp" data={classes.map((_class) => _class.name)} clearable />
        <NumberInput label="Tuần" max={35} min={1} placeholder="Nhập tuần (Từ tuần 1 đến 35)" />
        <NumberInput label="Tháng" max={12} min={1} placeholder="Nhập tháng (Từ tháng 1 đến 12)" />
        <NumberInput label="Kỳ học" min={1} max={2} placeholder="Nhập kỳ học (Kỳ 1 hay 2) " />
        <Button leftIcon={<IconFilter size={rem(18)} />} type="submit">
          Lọc kết quả
        </Button>
      </Group>
      <RankingsTable data={fetchedData} />
    </Stack>
  );
};

export default Rankings;
