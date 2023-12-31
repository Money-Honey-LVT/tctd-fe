import { Anchor, AppShell, Button, Group, Header, LoadingOverlay, Navbar, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconDatabase, IconLogout } from '@tabler/icons-react';
import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import AuthRoutes from '../../pages/AuthRoutes';
import MainLinks from '../MainLinks';
import User from '../User';

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    modals.openConfirmModal({
      title: 'Xác Nhận Rời Khỏi',
      centered: true,
      children: <Text size="sm">Bạn có chắc muốn đăng xuất không?</Text>,
      labels: { confirm: 'Đồng ý', cancel: 'Huỷ bỏ' },
      onCancel: () => {},
      onConfirm: () => {
        localStorage.clear();
        navigate(ROUTER.AUTH.LOGIN);
        notifications.show({
          title: 'Thông báo',
          message: 'Đăng xuất thành công!',
        });
      },
    });
  };

  return (
    <>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="0">
              <MainLinks />
            </Navbar.Section>
            <Navbar.Section>
              <User />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60}>
            <Group position="apart" sx={{ height: '100%' }} px={20}>
              <Group>
                <Anchor href={ROUTER.HOME.INDEX}>
                  <IconDatabase />
                </Anchor>
              </Group>
              <Button onClick={handleLogout} variant="subtle" color="red" leftIcon={<IconLogout />}>
                Đăng xuất
              </Button>
            </Group>
          </Header>
        }
      >
        <Suspense fallback={<LoadingOverlay visible />}>
          <AuthRoutes>
            <Outlet />
          </AuthRoutes>
        </Suspense>
      </AppShell>
    </>
  );
}
