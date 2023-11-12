import { Progress, Box, Text, Group, Paper, SimpleGrid, rem, Stack } from '@mantine/core';
import { IconDeviceAnalytics, IconUserBolt } from '@tabler/icons-react';
import styles from './classes.module.css';
import { useFetchClasses } from '../../../api/class';

function TotalClasses() {
  const { classes } = useFetchClasses();

  const totalStudents = classes.reduce((accumulator, _class) => accumulator + (_class.total || 0), 0);

  const calculateClassData = (className: string, color: string) => {
    const count = classes
      .filter((_class) => _class.name.includes(className))
      .reduce((accumulator, _class) => accumulator + (_class.total || 0), 0);

    const value = Number(((count / totalStudents) * 100).toFixed(1));

    return { label: className, count, value, color };
  };

  const data = [
    calculateClassData('6', '#47d6ab'),
    calculateClassData('7', 'yellow'),
    calculateClassData('8', '#4fcdf7'),
    calculateClassData('9', 'red'),
  ];

  const descriptions = data.map((stat) => (
    <Box key={stat.label} style={{ borderBottomColor: stat.color }} className={styles.stat}>
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        Lớp {stat.label}
      </Text>

      <Group style={{ justifyContent: 'space-between' }} align="flex-end" spacing={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={styles.statCount}>
          {stat.value}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <Paper withBorder p="md" radius="md">
      <Stack spacing="lg">
        <Box>
          <Group style={{ justifyContent: 'space-between' }}>
            <Group align="flex-end" spacing="xs">
              <Text fz="xl" fw={700}>
                {totalStudents}
              </Text>
            </Group>
            <IconUserBolt size="1.4rem" className={styles.icon} stroke={1.5} />
          </Group>

          <Text c="dimmed" fz="sm">
            Tổng số học sinh toàn trường
          </Text>
        </Box>
        <Progress
          styles={{
            root: {
              height: '30px',
            },
          }}
          size="xl"
          sections={data.map((_class) => ({
            value: _class.value,
            color: _class.color,
            label: `${_class.value.toString()}%`,
            tooltip: `Lớp ${_class.label}`,
          }))}
        />

        <SimpleGrid cols={4} mt="xl">
          {descriptions}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}

export default TotalClasses;
