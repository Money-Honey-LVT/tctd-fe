import { Table } from '@mantine/core';
import dayjs from 'dayjs';
import { useGetAllPoints } from '../../../api/hooks/useGetAllPoints';
import { getStylesByIndex, ths } from './helper';

const TopFiveThisWeek = () => {
  const { points } = useGetAllPoints();
  const lastWeek = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const rankings = points
    .filter((point) => dayjs(point.time.start).diff(lastWeek) < 0 && dayjs(point.time.end).diff(lastWeek) > 0)
    .sort((a, b) => b.disciplinePoint + b.studyPoint - (a.disciplinePoint + a.studyPoint))
    .map(({ classPoint, disciplinePoint, studyPoint }) => ({
      studyPoint,
      disciplinePoint,
      name: classPoint.name,
      totalPoint: studyPoint + disciplinePoint,
    }))
    .slice(0, 5);

  const rows = rankings.map((ranking, index) => (
    <tr style={getStylesByIndex(index)} key={ranking.name}>
      <td>{index + 1}</td>
      <td>{ranking.name}</td>
      <td>{ranking.disciplinePoint}</td>
      <td>{ranking.studyPoint}</td>
      <td>{ranking.totalPoint}</td>
    </tr>
  ));

  return (
    <Table verticalSpacing="xs" withBorder withColumnBorders captionSide="bottom">
      <caption style={{ captionSide: 'top', marginBottom: '12px' }}>Top 5 lớp xuất sắc nhất tuần vừa qua</caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TopFiveThisWeek;
