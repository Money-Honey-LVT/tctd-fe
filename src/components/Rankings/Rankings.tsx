import React, { useEffect, useState } from 'react';
import { IPoint, useGetAllPoints } from '../../api/hooks/useGetAllPoints';
import { Button, Group, NumberInput, Select, Stack, rem } from '@mantine/core';
import RankingsTable from './RankingsTable/RankingsTable';
import { useForm } from '@mantine/form';
import { IconFilter } from '@tabler/icons-react';
import { useFetchClasses } from '../../api/class';

const Rankings = () => {
  const { points } = useGetAllPoints();
  const { classes } = useFetchClasses();

  const [fetchedData, setFetchedData] = useState<IPoint[]>(points);

  const initialValues = {
    week: '',
    month: '',
    semester: '',
    class_name: '',
  };

  const [filters, setFilters] = useState<typeof initialValues>();

  const form = useForm({
    initialValues,
  });
  const handleSubmitFilter = (values: typeof initialValues) => {
    console.log(values);

    setFilters(values);
  };

  const handleConfirmFilter = () => {
    if (!form.isDirty('month') && !form.isDirty('semester') && !form.isDirty('week') && !form.isDirty('class_name')) {
      setFetchedData(points);
      return;
    }
    setFetchedData(
      points.filter((data) => {
        const matchWeek = data.time.week ? data.time.week === `WEEK_${filters?.week.toString()}` : false;
        const matchMonth = data.time.month ? data.time.month === `MONTH_${filters?.month.toString()}` : false;
        const matchSemester = data.time.semester
          ? data.time.semester === `SEMESTER_${filters?.semester.toString()}`
          : false;
        const matchClass = data.classPoint.name ? data.classPoint.name === filters?.class_name : false;

        return filters ? (matchWeek || matchMonth || matchSemester) && matchClass : false;
      })
    );
  };

  useEffect(() => {
    handleConfirmFilter();
  }, [filters]);

  useEffect(() => {
    setFetchedData(points);
  }, [points]);

  return (
    <Stack>
      <form onReset={form.onReset} id="form-add-time" onSubmit={form.onSubmit(handleSubmitFilter)}>
        <Group align="end" grow>
          <Select
            w={80}
            label="Lớp"
            placeholder="Chọn lớp"
            data={classes.map((_class) => _class.name)}
            {...form.getInputProps('class_name')}
          />

          <NumberInput
            disabled={form.isDirty('month') || form.isDirty('semester')}
            label="Tuần"
            max={35}
            min={1}
            placeholder="Nhập tuần (Từ tuần 1 đến 35)"
            {...form.getInputProps('week')}
          />
          <NumberInput
            disabled={form.isDirty('week') || form.isDirty('semester')}
            label="Tháng"
            max={12}
            min={1}
            placeholder="Nhập tháng (Từ tháng 1 đến 12)"
            {...form.getInputProps('month')}
          />
          <NumberInput
            disabled={form.isDirty('week') || form.isDirty('month')}
            label="Kỳ học"
            min={1}
            max={2}
            placeholder="Nhập kỳ học (Kỳ 1 hay 2) "
            {...form.getInputProps('semester')}
          />
          <Button leftIcon={<IconFilter size={rem(18)} />} type="submit">
            Lọc kết quả
          </Button>
        </Group>
      </form>
      <RankingsTable data={fetchedData} />
    </Stack>
  );
};

export default Rankings;
