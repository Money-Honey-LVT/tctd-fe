import { ScrollArea, Table } from '@mantine/core';
import React from 'react';
import { IClass } from '../../../api/class';
import classes from './classes.module.css';

interface IClassesListTable {
  data: IClass[];
  setCurrentClass: (data: IClass) => void;
}

const ClasssesListTable: React.FC<IClassesListTable> = (props) => {
  const { data, setCurrentClass } = props;

  if (!data.length) return null;

  const rows = data.map((data) => (
    <tr className={classes.tr} key={data.name} onClick={() => setCurrentClass(data)}>
      <td>{data.name}</td>
      <td>{data.total}</td>
    </tr>
  ));

  return (
    <ScrollArea h={`calc(100vh - 128px - 4rem)`}>
      <Table highlightOnHover striped withColumnBorders>
        <thead>
          <tr>
            <th>Tên lớp</th>
            <th>Số học sinh</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default ClasssesListTable;
