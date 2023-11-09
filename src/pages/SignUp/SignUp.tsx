import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  MediaQuery,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAB, IconCheck, IconLock, IconUser, IconX } from '@tabler/icons-react';
import { Navigate, useNavigate } from 'react-router-dom';
import bg from '../../assets/img/logo.jpg';
import { HEADERS, baseURL } from '../../config/constants/api';
import ROUTER from '../../config/router';
import classes from './signup.module.css';
import { useState } from 'react';

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      fullName: '',
    },
  });

  const handleSubmit = async (value: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: HEADERS.header,
        body: JSON.stringify({ ...value, role: 'ROLE_ADMIN' }),
      }).then((res) => res.json());

      if (response.hasErrors) {
        notifications.show({
          title: 'Đã có lỗi xảy ra',
          message: response.errors[0],
          color: 'red',
          icon: <IconX />,
        });
        return;
      }

      setTimeout(() => {
        navigate(ROUTER.AUTH.LOGIN);
        notifications.show({
          message: 'Tạo tài khoản mới thành công!',
        });

        setIsLoading(false);
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      notifications.show({
        title: 'Đã có lỗi xảy ra',
        message: JSON.stringify(e),
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  if (localStorage.getItem('token')) {
    return <Navigate to={ROUTER.HOME.INDEX} />;
  }

  return (
    <Grid style={{ height: '100vh' }} align="center" justify="center">
      <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
        <Grid.Col p={0} md={8}>
          <BackgroundImage src={bg}>
            <Box
              sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
              }}
            ></Box>
          </BackgroundImage>
        </Grid.Col>
      </MediaQuery>
      <Grid.Col xs={12} md={4}>
        <Container size={420} my={40}>
          <Title align="center" className={classes.title}>
            Đăng ký tài khoản
          </Title>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Đã có tài khoản?{' '}
            <Anchor href={ROUTER.AUTH.LOGIN} size="sm">
              Đăng nhập ngay
            </Anchor>
          </Text>
          <Center mt="sm">
            <Card withBorder shadow="md" p={30} mt={30} radius="md" w={360}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                  <TextInput
                    withAsterisk
                    label="Họ và tên"
                    placeholder="Nhập họ tên người dùng"
                    icon={<IconAB size={14} />}
                    {...form.getInputProps('fullName')}
                  />

                  <TextInput
                    withAsterisk
                    label="Tên đăng nhập mới"
                    placeholder="Nhập tên tài khoản"
                    icon={<IconUser size={14} />}
                    {...form.getInputProps('username')}
                  />
                  <TextInput
                    withAsterisk
                    label="Mật khẩu mới"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    icon={<IconLock size={14} />}
                    {...form.getInputProps('password')}
                  />
                  <Button variant="filled" loading={isLoading} fullWidth mt="sm" type="submit">
                    Đăng ký
                  </Button>
                </Stack>
              </form>
            </Card>
          </Center>
        </Container>
      </Grid.Col>
    </Grid>
  );
};

export default SignUp;
