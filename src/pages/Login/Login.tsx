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
import { IconLock, IconUser } from '@tabler/icons-react';
import bg from '../../assets/img/logo.jpg';
import classes from './login.module.css';
import ROUTER from '../../config/router';

const Login = () => {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  const handleRememberPassword = (event: any) => {
    localStorage.setItem('isRememberPassword', event.currentTarget.checked);
  };

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
                  <Checkbox label="Nhớ mật khẩu" onChange={handleRememberPassword} />
                  <Button variant="filled" fullWidth mt="sm" type="submit">
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
