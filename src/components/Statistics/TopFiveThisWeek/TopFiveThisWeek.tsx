import { Table } from '@mantine/core';
import React from 'react';
import { getStylesByIndex, ths } from './helper';

const TopFiveThisWeek = () => {
  const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

  const rows = elements.map((element, index) => (
    <tr style={getStylesByIndex(index)} key={element.name}>
      <td>{index + 1}</td>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Table verticalSpacing="xs" withBorder withColumnBorders captionSide="bottom">
      <caption style={{ captionSide: 'top', marginBottom: '12px' }}>
        Top 5 lớp xuất sắc nhất tuần vừa qua (Tuần 1)
      </caption>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default TopFiveThisWeek;
