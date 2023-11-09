import { MantineThemeOverride } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const customTheme: MantineThemeOverride = {
  components: {
    Notification: {
      defaultProps: {
        autoClose: 1200,
        withCloseButton: true,
        title: 'Thông báo',
        color: 'green',
        icon: <IconCheck />,
      },
    },
  },
  respectReducedMotion: false,
  cursorType: 'pointer',
};

export default customTheme;
