import { Button, Grid, Group, NumberInput, Paper, Stack, Table, Text, ThemeIcon, rem } from '@mantine/core';
import { IconPlus, IconSchool, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import withAdminAuthorization from '../../api/hoc/withAdminAuthorization';
import { IProcess, useGetAllProcessByClass } from '../../api/hooks/useGetAllProcess';
import { weekRegex } from '../../constants/regex';
import classes from './classes.module.css';
import ModalAddProcess from './ModalAddProcess';
import { useDisclosure } from '@mantine/hooks';
import { useGetClassById } from '../../api/class';
import { HEADERS, baseURL } from '../../config/constants/api';
import { notifications } from '@mantine/notifications';

const PRIMARY_COL_HEIGHT = 'calc(100vh - 76px - 16px)';
const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - 0.5rem)`;

const ClassDetail = () => {
  const params = useParams();
  const { id } = params;
  if (!id) return null;

  const { loading, processes, refetch } = useGetAllProcessByClass(id);
  const { fetchedClass } = useGetClassById(id);
  const [tableData, setTableData] = useState<IProcess[]>(processes);
  const [selectedWeek, setSelectedWeek] = useState<number | ''>('');
  const [openedAddProcessModal, { close: closeAddProcessModal, open: openAddProcessModal }] = useDisclosure();

  useEffect(() => {
    setTableData(processes);
  }, [processes]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${baseURL}/processes/${id}`, {
        method: 'POST',
        headers: HEADERS.authHeader,
      }).then((res) => res.json());

      if (response.hasErrors || response.status !== 200) {
        notifications.show({
          title: 'Đã có lỗi xảy ra',
          message: response.errors[0],
          color: 'red',
          icon: <IconX />,
        });
        return;
      }
      notifications.show({
        message: 'Xoá thành công!',
      });
      refetch();
    } catch (e) {
      notifications.show({
        message: 'Đã có lỗi xảy ra',
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  const rows = tableData.map((process, idx) => (
    <tr key={`${process.description}-${idx}`}>
      <td>{process.time.week.match(weekRegex)?.[1]}</td>
      <td>{process.criteria.name}</td>
      <td>{process.points}</td>
      <td>{process.description}</td>
      <td>
        <Button onClick={() => handleDelete(process.id)} compact color="red">
          Xoá
        </Button>
      </td>
    </tr>
  ));

  useEffect(() => {
    setTableData(
      processes.filter((process) => {
        if (selectedWeek !== '' && process.time.week !== `WEEK_${selectedWeek}`) {
          return false;
        }
        return true;
      })
    );
  }, [selectedWeek]);

  if (!fetchedClass) return null;

  return (
    <>
      <Grid gutter="xl">
        <Grid.Col span={8}>
          <Stack>
            <Group align="flex-end" position="apart">
              <NumberInput
                label="Lọc vi phạm / khen thưởng theo tuần"
                max={35}
                min={1}
                placeholder="Nhập tuần (Từ tuần 1 đến 35)"
                onChange={setSelectedWeek}
              />
            </Group>

            <Table withBorder highlightOnHover striped withColumnBorders>
              <thead>
                <tr>
                  <th style={{ minWidth: '120px' }}>Tuần</th>
                  <th>Vi phạm/Khen thưởng</th>
                  <th style={{ minWidth: '200px' }}>Tổng điểm cộng/trừ</th>
                  <th>Ghi chú</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Stack>
        </Grid.Col>
        <Grid.Col mt={50} span={4}>
          <Stack>
            <Group position="center">
              <ThemeIcon className={classes.icon} size={60} radius={60}>
                <IconSchool style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
              </ThemeIcon>
            </Group>

            <Stack align="center" spacing="xs">
              <Text ta="center" fw={700} className={classes.title}>
                Lớp {fetchedClass.name} - Sĩ số: {fetchedClass.total} học sinh
              </Text>
              <Text c="dimmed" ta="center" fz="sm" w="80%">
                {fetchedClass.description}
              </Text>
            </Stack>

            <Group mt={'md'} position="center">
              <Button onClick={openAddProcessModal} leftIcon={<IconPlus size={rem(18)} />}>
                Thêm quá trình
              </Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
      <ModalAddProcess id={id} refetch={refetch} onClose={closeAddProcessModal} opened={openedAddProcessModal} />
    </>
  );
};

export default withAdminAuthorization(ClassDetail);
