import React, { useEffect } from 'react';
import { IMonthlyRank } from '../../../api/hooks/useGetMonthlyRank';
import { Group, rem, ScrollArea, Table } from '@mantine/core';
import classes from './classes.module.css';
import { monthRegex } from '../../../constants/regex';
import { IconArrowsUpDown } from '@tabler/icons-react';
import * as dgram from 'dgram';

interface Props {
  data: IMonthlyRank[];
}
const MonthlyRankingTables: React.FC<Props> = ({ data }) => {
  const [rankSortStatus, setRankSortStatus] = React.useState<'asc' | 'desc'>('desc');
  const [sortedData, setSortedData] = React.useState<IMonthlyRank[]>(data);
  const toggleRankSortStatus = () => {
    rankSortStatus === 'asc' ? setRankSortStatus('desc') : setRankSortStatus('asc');
  };
  useEffect(() => {
    if (rankSortStatus === 'desc') {
      const sortedDataAsc = data.sort((a, b) => a.rank - b.rank);
      setSortedData(sortedDataAsc);
    }
    if (rankSortStatus === 'asc') {
      const sortedDataDesc = data.sort((a, b) => b.rank - a.rank);
      setSortedData(sortedDataDesc);
    }
  }, [rankSortStatus, data]);

  const rows = sortedData.map((rank, index) => (
    <tr className={classes.tr}>
      <td>{rank.rank}</td>
      <td>{rank.className}</td>
      <td>{rank.points}</td>
      <td>{rank.month.match(monthRegex)?.[1]}</td>
    </tr>
  ));
  return (
    <ScrollArea h={`calc(100vh - 128px - 6rem)`}>
      <Table highlightOnHover striped withColumnBorders>
        <thead>
          <tr>
            <th>
              <Group position={'apart'}>
                Thứ hạng
                <IconArrowsUpDown size={rem(12)} cursor={'pointer'} onClick={toggleRankSortStatus} />
              </Group>
            </th>
            <th>Tên lớp</th>
            <th>Điểm</th>
            <th>Tháng</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default MonthlyRankingTables;
