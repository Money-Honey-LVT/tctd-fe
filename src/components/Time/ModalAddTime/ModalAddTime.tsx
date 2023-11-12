import { Button, Checkbox, Flex, Group, Modal, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { HEADERS, baseURL } from '../../../config/constants/api';
import { DateInput } from '@mantine/dates';
import dayjs from 'dayjs';

interface IModalAddTimeProps {
  onClose: () => void;
  opened: boolean;
  refetch: () => void;
}

const ModalAddTime: React.FC<IModalAddTimeProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened, refetch } = props;

  const initialValues = {
    start: '',
    end: '',
    week: '',
    month: '',
    semester: '',
  };

  const form = useForm({
    initialValues,
    validate: {
      start: isNotEmpty('Không được để trống'),
      end: isNotEmpty('Không được để trống'),
      week: isNotEmpty('Không được để trống'),
      month: isNotEmpty('Không được để trống'),
      semester: isNotEmpty('Không được để trống'),
    },
  });

  const handleSubmitAddTime = async (values: typeof initialValues) => {
    const payload = {
      start: `${dayjs(values.start).format('YYYY-MM-DD')}`,
      end: `${dayjs(values.end).format('YYYY-MM-DD')}`,
      week: `WEEK_${values.week}`,
      month: `MONTH_${values.month}`,
      semester: `SEMESTER_${values.semester}`,
    };
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/times`, {
        method: 'POST',
        headers: HEADERS.authHeader,
        body: JSON.stringify(payload),
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
        message: 'Tạo khung thời gian mới thành công!',
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
    <Modal centered size="lg" title="Tạo thêm khung thời gian mới" onClose={onClose} opened={opened}>
      <form onReset={form.onReset} id="form-add-time" onSubmit={form.onSubmit(handleSubmitAddTime)}>
        <Flex direction="column" gap="sm">
          <TextInput
            withAsterisk
            label="Tuần"
            placeholder="Nhập tuần (Từ tuần 1 đến 35)"
            {...form.getInputProps('week')}
          />
          <TextInput
            withAsterisk
            label="Tháng"
            placeholder="Nhập tháng (Từ tháng 1 đến 12)"
            {...form.getInputProps('month')}
          />
          <TextInput
            withAsterisk
            label="Kỳ học"
            placeholder="Nhập kỳ học (Kỳ 1 hay 2) "
            {...form.getInputProps('semester')}
          />
          <Group grow>
            <DateInput
              style={{ zIndex: 100000 }}
              withAsterisk
              valueFormat="YYYY-MM-DD"
              label="Thời gian bắt đầu"
              placeholder="Nhập thời gian bắt đầu"
              {...form.getInputProps('start')}
            />
            <DateInput
              style={{ zIndex: 100000 }}
              withAsterisk
              valueFormat="YYYY-MM-DD"
              label="Thời gian kết thúc"
              placeholder="Nhập thời gian kết thúc"
              {...form.getInputProps('end')}
            />
          </Group>
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

export default ModalAddTime;
