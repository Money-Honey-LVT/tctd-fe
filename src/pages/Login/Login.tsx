import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Grid,
  MediaQuery,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconLock, IconUser, IconX } from '@tabler/icons-react';
import bg from '../../assets/img/logo.jpg';
import classes from './login.module.css';
import ROUTER from '../../config/router';
import { useState } from 'react';
import { HEADERS, baseURL } from '../../config/constants/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (value: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: HEADERS.header,
        body: JSON.stringify(value),
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

      localStorage.setItem('token', response.data);
      navigate(ROUTER.HOME.INDEX);
      notifications.show({
        message: 'Đăng nhập thành công!',
      });
    } catch (e) {
      notifications.show({
        message: 'Đã có lỗi xảy ra',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setIsLoading(false);
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
            Đăng nhập hệ thống
          </Title>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Chưa có tài khoản?{' '}
            <Anchor href={ROUTER.AUTH.SIGNUP} size="sm">
              Tạo ngay
            </Anchor>
          </Text>
          <Center mt="sm">
            <Card withBorder shadow="md" p={30} mt={30} radius="md" w={360}>
              <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack>
                  <TextInput
                    withAsterisk
                    label="Tên đăng nhập"
                    placeholder="Nhập tên tài khoản"
                    icon={<IconUser size={14} />}
                    {...form.getInputProps('username')}
                  />
                  <TextInput
                    withAsterisk
                    label="Mật khẩu"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    icon={<IconLock size={14} />}
                    {...form.getInputProps('password')}
                  />
                  <Button loading={isLoading} variant="filled" fullWidth mt="sm" type="submit">
                    Đăng nhập
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

export default Login;
