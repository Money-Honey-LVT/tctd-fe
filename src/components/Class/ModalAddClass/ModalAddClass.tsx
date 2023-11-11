import { Button, Flex, Grid, Group, Modal, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HEADERS, baseURL } from '../../../config/constants/api';
import ROUTER from '../../../config/router';

interface IModalAddClassProps {
  onClose: () => void;
  opened: boolean;
}

const ModalAddClass: React.FC<IModalAddClassProps> = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened } = props;

  const initialValues = {
    name: '',
    description: '',
    total: '',
  };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Không được để trống'),
      total: isNotEmpty('Không được để trống'),
    },
  });

  const handleSubmitAddClass = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/classes`, {
        method: 'POST',
        headers: HEADERS.authHeader,
        body: JSON.stringify(values),
      }).then((res) => res.json());
      console.log(response);
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
        message: 'Tạo lớp mới thành công!',
      });
    } catch (e) {
      notifications.show({
        message: 'Đã có lỗi xảy ra',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setIsLoading(false);
      onClose();
      form.reset();
    }
  };

  return (
    <Modal centered size="lg" title="Tạo thêm lớp học mới" onClose={onClose} opened={opened}>
      <form onReset={form.onReset} id="form-add-class" onSubmit={form.onSubmit(handleSubmitAddClass)}>
        <Flex direction="column" gap="sm">
          <Group grow>
            <TextInput withAsterisk label="Tên lớp" placeholder="Nhập tên lớp" {...form.getInputProps('name')} />
            <NumberInput
              label="Số học sinh"
              placeholder="Nhập số lượng học sinh"
              min={20}
              max={40}
              {...form.getInputProps('total')}
            />
          </Group>
          <Textarea label="Mô tả" placeholder="Nhập mô tả cho lớp học " {...form.getInputProps('description')} />

          <Group mt="sm" position="right">
            <Button
              variant="light"
              onClick={() => {
                form.reset();
                onClose();
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit" loading={isLoading}>
              Thêm mới
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
};

export default ModalAddClass;
