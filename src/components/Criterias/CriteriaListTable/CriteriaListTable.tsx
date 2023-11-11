import { Card, ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { ICriteria } from '../../../api/criteria';
import classes from './classes.module.css';

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
      <td>{data.type}</td>
      <td>{data.subType}</td>
    </tr>
  ));

  return (
    <Card withBorder>
      <ScrollArea h={`calc(100vh - 128px - 4rem)`}>
        <Table>
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
    </Card>
  );
};

export default CriteriaListTable;
