import { Button, Flex, Group, Modal, NumberInput, TextInput, Textarea, Text } from '@mantine/core';
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

const ModalDeleteClass: React.FC<IModalUpdateClassProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened, refetch } = props;
  const { id, name } = props.class;

  const handleDeleteClass = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/classes/${id}/delete`, {
        method: 'POST',
        headers: HEADERS.authHeader,
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
        message: 'Xoá lớp học thành công!',
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
    <Modal centered size="lg" title={<Text>Xác nhận xoá lớp học {name}</Text>} onClose={onClose} opened={opened}>
      <Flex direction="column" gap="sm">
        <Group mt="sm" position="right">
          <Button variant="light" onClick={onClose}>
            Huỷ bỏ
          </Button>
          <Button loading={isLoading} color={'red'} onClick={handleDeleteClass}>
            Sửa
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
};

export default ModalDeleteClass;
