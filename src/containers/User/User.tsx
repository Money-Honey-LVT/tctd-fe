import { Avatar, Box, Group, Text, rem, useMantineTheme } from '@mantine/core';
import { getRoleInfo, useGetProfileInfo } from './helper';
import { memo } from 'react';
import { Icon123 } from '@tabler/icons-react';

const User = () => {
  const theme = useMantineTheme();
  const { isLoading, profileInfo } = useGetProfileInfo();

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
          <Text size="sm" weight={500}>
            {profileInfo?.fullName}
          </Text>
          <Text color="dimmed" size="xs">
            {getRoleInfo(profileInfo?.role)?.name}
          </Text>
        </Box>
      </Group>
    </Box>
  );
};

export default memo(User);
