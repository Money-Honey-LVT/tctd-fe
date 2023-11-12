import { ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { ICriteria } from '../../../api/criteria';
import classes from './classes.module.css';
import { criteriaMapping } from '../../../constants/criteria';

interface ICriteriaListTable {
  data: ICriteria[];
}

const CriteriaListTable: React.FC<ICriteriaListTable> = (props) => {
  const { data } = props;

  if (!data.length) return null;

  const rows = data.map((data) => (
    <tr className={classes.tr} key={data.name}>
      <td>{data.name}</td>
      <td>{data.points}</td>
      {/* @ts-ignore */}
      <td>{criteriaMapping[data.type]}</td>
      {/* @ts-ignore */}
      <td>{criteriaMapping[data.subType]}</td>
    </tr>
  ));

  return (
    <ScrollArea h={`calc(100vh - 6rem)`}>
      <Table highlightOnHover striped withColumnBorders>
        <thead>
          <tr>
            <th>Tên tiêu chí</th>
            <th style={{ minWidth: '150px' }}>Số điểm cộng/trừ</th>
            <th style={{ minWidth: '120px' }}>Danh mục</th>
            <th style={{ minWidth: '120px' }}>Danh mục con</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default CriteriaListTable;
