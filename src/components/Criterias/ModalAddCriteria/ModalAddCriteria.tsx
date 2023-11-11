import { Button, Checkbox, Flex, Group, Modal, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { HEADERS, baseURL } from '../../../config/constants/api';
import { BASE_CRITERIAS } from '../../../constants/criteria';

interface IModalAddCriteriaProps {
  onClose: () => void;
  opened: boolean;
  refetch: () => void;
}

const ModalAddCriteria: React.FC<IModalAddCriteriaProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened, refetch } = props;

  const initialValues = {
    name: '',
    description: '',
    isCountable: false,
    points: 0,
    type: '',
    subType: '',
  };

  const form = useForm({
    initialValues,
    validate: {
      name: isNotEmpty('Không được để trống'),
      points: isNotEmpty('Không được để trống'),
    },
  });

  const handleSubmitAddCriteria = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/criteria`, {
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
        message: 'Tạo tiêu chí mới thành công!',
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
      form.reset();
    }
  };

  return (
    <Modal centered size="lg" title="Tạo thêm tiêu chí mới" onClose={onClose} opened={opened}>
      <form onReset={form.onReset} id="form-add-criteria" onSubmit={form.onSubmit(handleSubmitAddCriteria)}>
        <Flex direction="column" gap="sm">
          <TextInput
            withAsterisk
            label="Tên tiêu chí"
            placeholder="Nhập tên tiêu chí"
            {...form.getInputProps('name')}
          />
          <Textarea label="Mô tả" placeholder="Nhập mô tả cho tiêu chí " {...form.getInputProps('description')} />
          <Checkbox label="Tiêu chí có tính điểm" {...form.getInputProps('isCountable')} />
          <NumberInput
            disabled={!form.values.isCountable}
            label="Số điểm cộng/trừ"
            placeholder="Nhập số điểm (nhập số âm với điểm trừ)"
            {...form.getInputProps('points')}
          />
          <Select
            label="Danh mục"
            placeholder="Chọn danh mục"
            data={BASE_CRITERIAS.map(({ label, value }) => ({ value, label }))}
            {...form.getInputProps('type')}
          />
          <Select
            disabled={!form.isDirty('type')}
            label="Danh mục con"
            placeholder="Chọn danh mục con"
            data={BASE_CRITERIAS.find((item) => item.value === form.values.type)?.children || []}
            {...form.getInputProps('subType')}
          />

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

export default ModalAddCriteria;
