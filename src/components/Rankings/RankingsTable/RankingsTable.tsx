import React from 'react';
import { IPoint, useGetAllPoints } from '../../../api/hooks/useGetAllPoints';
import { ScrollArea, Table } from '@mantine/core';
import classes from './classes.module.css';
import { monthRegex, semesterRegex, weekRegex } from '../../../constants/regex';

interface IRankingsTableProps {
  data: IPoint[];
}

const RankingsTable: React.FC<IRankingsTableProps> = ({ data }) => {
  if (!data.length) return null;

  const rows = data.map((data) => (
    <tr className={classes.tr} key={data.id}>
      <td>{data.classPoint.name}</td>
      <td>{data.disciplinePoint}</td>
      <td>{data.studyPoint}</td>
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
            <th>Tên lớp</th>
            <th style={{ minWidth: '120px' }}>Điểm nề nếp</th>
            <th style={{ minWidth: '120px' }}>Điểm học tập</th>
            <th style={{ minWidth: '120px' }}>Tuần thứ</th>
            <th style={{ minWidth: '120px' }}>Tháng</th>
            <th style={{ minWidth: '120px' }}>Học kỳ</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default RankingsTable;
