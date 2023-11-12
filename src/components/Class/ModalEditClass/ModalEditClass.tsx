import { Button, Flex, Group, Modal, NumberInput, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HEADERS, baseURL } from '../../../config/constants/api';
import { IClass } from '../../../api/class';

interface IModalUpdateClassProps {
  class: IClass;
  onClose: () => void;
  opened: boolean;
  refetch: () => void;
}

const ModalEditClass: React.FC<IModalUpdateClassProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened, refetch } = props;
  const { id, name, description, total } = props.class;

  useEffect(() => {
    return form.setValues({
      name,
      description,
      total,
    });
  }, [id]);
  const form = useForm({
    validate: {
      name: isNotEmpty('Không được để trống'),
      total: isNotEmpty('Không được để trống'),
    },
  });

  const handleSubmitUpdateClass = async (values: typeof form.values) => {
    setIsLoading(true);
    if (!form.isDirty()) {
      notifications.show({
        title: 'Đã có lỗi xảy ra',
        message: 'Bạn chưa thay đổi thông tin nào',
        color: 'red',
        icon: <IconX />,
      });
      close();
      form.reset();
      return;
    }
    try {
      const response = await fetch(`${baseURL}/classes/${id}`, {
        method: 'POST',
        headers: HEADERS.authHeader,
        body: JSON.stringify(values),
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
      notifications.show({
        message: 'Sửa thông tin lớp thành công!',
      });
      refetch();
    } catch (e) {
      notifications.show({
        message: 'Đã có lỗi xảy ra',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal centered size="lg" title="Sửa thông tin lớp học" onClose={onClose} opened={opened}>
      <form onReset={form.onReset} id="form-add-class" onSubmit={form.onSubmit(handleSubmitUpdateClass)}>
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
          <Textarea label="Mô tả" placeholder="Nhập mô tả cho lớp học" {...form.getInputProps('description')} />

          <Group mt="sm" position="right">
            <Button
              variant="light"
              onClick={() => {
                onClose();
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit" loading={isLoading}>
              Sửa
            </Button>
          </Group>
        </Flex>
      </form>
    </Modal>
  );
};

export default ModalEditClass;
