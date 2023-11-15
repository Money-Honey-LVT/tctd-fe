import { Button, Flex, Group, Modal, NumberInput, Select, SelectItem, TextInput, Textarea } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../../config/constants/api';
import { ICriteria, useFetchCriteria } from '../../api/criteria';
import { useFetchTimes } from '../../api/time';

interface IModalAddProcessProps {
  onClose: () => void;
  opened: boolean;
  refetch: () => void;
  id: string;
}

const ModalAddProcess: React.FC<IModalAddProcessProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onClose, opened, refetch, id } = props;
  const { criteria } = useFetchCriteria();
  const { times } = useFetchTimes();

  const optionsSelectCriteria: SelectItem[] = criteria.map((crit) => ({
    value: crit.id,
    label: `[${crit.points}] ${crit.name}`,
  }));

  const initialValues = {
    criteriaId: '',
    week: '',
    times: 1,
    description: '',
  };

  const form = useForm({
    initialValues,
    validate: {},
  });

  const handleSubmitAddProcess = async (values: typeof initialValues) => {
    const foundcrit = criteria.find((cri) => cri.id === form.values.criteriaId);
    const foundTime = times.find((time) => time.week === `WEEK_${form.values.week}`);
    const totalPoints = foundcrit ? foundcrit?.points * values.times : 0;
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/processes`, {
        method: 'POST',
        headers: HEADERS.authHeader,
        body: JSON.stringify({
          classId: id,
          timeId: foundTime?.id || '',
          criteriaList: [
            {
              criteriaId: values.criteriaId,
              description: values.description,
              points: totalPoints,
            },
          ],
        }),
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
        message: 'Tạo lớp mới thành công!',
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
    <Modal centered size="lg" title="Tạo thêm vi phạm/khen thưởng mới" onClose={onClose} opened={opened}>
      <form onReset={form.onReset} id="form-add-class" onSubmit={form.onSubmit(handleSubmitAddProcess)}>
        <Flex direction="column" gap="sm">
          <Select
            searchable
            style={{ zIndex: 999999999 }}
            label="Tiêu chí"
            placeholder="Chọn tiêu chí"
            data={optionsSelectCriteria}
            {...form.getInputProps('criteriaId')}
          />
          <NumberInput
            label="Tuần"
            max={35}
            min={1}
            placeholder="Nhập tuần (Từ tuần 1 đến 35)"
            {...form.getInputProps('week')}
          />
          <NumberInput
            label="Số lượng"
            placeholder="Nhập số lần vi phạm/khen thưởng"
            min={1}
            {...form.getInputProps('times')}
          />
          <NumberInput
            label="Tổng số điểm cộng/trừ theo tiêu chí"
            disabled
            value={(criteria.find((cri) => cri.id === form.values.criteriaId)?.points || 0) * form.values.times}
          />
          <TextInput
            withAsterisk
            label="Ghi chú"
            placeholder="Cụ thể học sinh, ngày vi phạm"
            {...form.getInputProps('description')}
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

export default ModalAddProcess;
