import React, { useState } from 'react';
import { Card, ScrollArea, Table } from '@mantine/core';
import { IClass } from '../../../api/class';
import classes from './classes.module.css';

interface IClassesListTable {
  data: IClass[];
  setCurrentClass: (data: IClass) => void;
}

const ClasssesListTable: React.FC<IClassesListTable> = (props) => {
  const { data, setCurrentClass } = props;
  const [scrolled, setScrolled] = useState(false);

  if (!data.length) return null;

  const rows = data.map((data) => (
    <tr className={classes.tr} key={data.name} onClick={() => setCurrentClass(data)}>
      <td>{data.name}</td>
      <td>{data.total}</td>
    </tr>
  ));

  return (
    <Card radius="md" withBorder>
      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table>
          <thead>
            <tr>
              <th>Tên lớp</th>
              <th>Số học sinh</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default ClasssesListTable;
