import { Affix, Button, Stack, Table, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { useFetchTimes } from '../../api/time';
import { monthRegex, semesterRegex, weekRegex } from '../../constants/regex';
import ModalAddTime from './ModalAddTime';
import classes from './classes.module.css';

const Time = () => {
  const { loading, refetch, times } = useFetchTimes();
  const [newTimeModalOpened, { close: closeNewTimeModal, open: openNewTimeModal }] = useDisclosure(false);

  const rows = times.map((time) => (
    <tr className={classes.tr} key={time.start}>
      <td>{time.week.match(weekRegex)?.[1]}</td>
      <td>{time.month.match(monthRegex)?.[1]}</td>
      <td>{time.semester.match(semesterRegex)?.[1]}</td>
      <td>{time.start}</td>
      <td>{time.end}</td>
    </tr>
  ));

  return (
    <React.Fragment>
      <Stack align="flex-start">
        <Affix position={{ bottom: rem(20), right: rem(20) }}>
          <Button leftIcon={<IconPlus />} fullWidth={false} onClick={openNewTimeModal}>
            Tạo khung thời gian
          </Button>
        </Affix>
        <Table w="100%" highlightOnHover striped withColumnBorders>
          <thead>
            <tr>
              <th>Tuần</th>
              <th>Tháng</th>
              <th>Kỳ học</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Stack>
      <ModalAddTime refetch={refetch} onClose={closeNewTimeModal} opened={newTimeModalOpened} />
    </React.Fragment>
  );
};

export default Time;
