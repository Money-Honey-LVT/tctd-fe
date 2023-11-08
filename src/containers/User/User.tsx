import { Avatar, Box, Group, Text, rem, useMantineTheme } from '@mantine/core';

const User = () => {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
      }}
    >
      <Group>
        <Avatar radius="xl" />
        <Box sx={{ flex: 1 }}>
          <Text size="sm" weight={500}></Text>
          <Text color="dimmed" size="xs"></Text>
        </Box>
      </Group>
    </Box>
  );
};

export default User;
