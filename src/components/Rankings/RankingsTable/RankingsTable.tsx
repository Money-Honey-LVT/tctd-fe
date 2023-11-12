import React, { useEffect } from 'react';
import { IPoint, useGetAllPoints } from '../../../api/hooks/useGetAllPoints';
import { Group, rem, ScrollArea, Table } from '@mantine/core';
import classes from './classes.module.css';
import { monthRegex, semesterRegex, weekRegex } from '../../../constants/regex';
import { IconArrowsUpDown } from '@tabler/icons-react';
import { sortBy } from 'lodash';

interface IRankingsTableProps {
  data: IPoint[];
}

const RankingsTable: React.FC<IRankingsTableProps> = ({ data }) => {
  const [sortedData, setSortedData] = React.useState<IPoint[]>(data);
  const [sortStatusTotalPoint, setSortStatusTotalPoint] = React.useState<'asc' | 'desc' | ''>('');
  const [sortStatusClassName, setSortStatusClassName] = React.useState<'asc' | 'desc' | ''>('');

  const toggleSortStatusTotalPoint = () => {
    setSortStatusClassName('');
    sortStatusTotalPoint === 'asc' ? setSortStatusTotalPoint('desc') : setSortStatusTotalPoint('asc');
  };

  const toggleSortStatusClassName = () => {
    setSortStatusTotalPoint('');
    sortStatusClassName === 'asc' ? setSortStatusClassName('desc') : setSortStatusClassName('asc');
  };

  useEffect(() => {
    setSortedData(data);
    if (sortStatusTotalPoint !== '') {
      switch (sortStatusTotalPoint) {
        case 'asc':
          const sortedDataAsc = sortBy(data, (point) => point.disciplinePoint + point.studyPoint);
          setSortedData(sortedDataAsc);
          break;
        case 'desc':
          const sortedDataDesc = sortBy(data, (point) => point.disciplinePoint + point.studyPoint).reverse();
          setSortedData(sortedDataDesc);
          break;
      }
    }
    if (sortStatusClassName !== '') {
      switch (sortStatusClassName) {
        case 'asc':
          const sortedDataAsc = sortBy(data, (point) => point.classPoint.name);
          setSortedData(sortedDataAsc);
          break;
        case 'desc':
          const sortedDataDesc = sortBy(data, (point) => point.classPoint.name).reverse();
          setSortedData(sortedDataDesc);
          break;
      }
    }
  }, [data, sortStatusTotalPoint, sortStatusClassName]);

  if (!data.length) return null;

  const rows = sortedData.map((data) => (
    <tr className={classes.tr} key={data.id}>
      <td>{data.classPoint.name}</td>
      <td>{data.disciplinePoint}</td>
      <td>{data.studyPoint}</td>
      <td>{data.studyPoint + data.disciplinePoint}</td>
      <td>{data.time.week.match(weekRegex)?.[1]}</td>
      <td>{data.time.month.match(monthRegex)?.[1]}</td>
      <td>{data.time.semester.match(semesterRegex)?.[1]}</td>
    </tr>
  ));

  return (
    <ScrollArea h={`calc(100vh - 128px - 6rem)`}>
      <Table highlightOnHover striped withColumnBorders>
        <thead>
          <tr>
            <th>
              <Group position={'apart'}>
                Tên lớp <IconArrowsUpDown size={rem(12)} cursor={'pointer'} onClick={toggleSortStatusClassName} />
              </Group>
            </th>
            <th>Điểm nề nếp</th>
            <th>Điểm học tập</th>
            <th>
              <Group position={'apart'}>
                Tổng điểm
                <IconArrowsUpDown size={rem(12)} cursor={'pointer'} onClick={toggleSortStatusTotalPoint} />
              </Group>
            </th>
            <th>Tuần thứ</th>
            <th>Tháng</th>
            <th>Học kỳ</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default RankingsTable;
