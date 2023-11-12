import { Anchor, Stack, Text } from '@mantine/core';
import ROUTER from '../../../config/router';

const _403Forbidden = () => {
  return (
    <Stack spacing="sm" align="center" justify="center">
      <Text c="black.8" fz={28} fw={700}>
        Bạn không có quyền truy cập trang này
      </Text>
      <Text c="black.8" fz="xl">
        Liên hệ quản trị viên để thêm thông tin
      </Text>
      <Text c="black.8" fz="xl">
        Trở về&nbsp;
        <Anchor href={ROUTER.HOME.INDEX} color="primary.9" underline={false}>
          <Text span inherit fw={500} fz="xl">
            Trang Chủ
          </Text>
        </Anchor>
      </Text>
    </Stack>
  );
};

export default _403Forbidden;
