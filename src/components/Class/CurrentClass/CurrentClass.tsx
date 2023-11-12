import { Button, Card, Group, Image, Text, rem } from '@mantine/core';
import React from 'react';
import { IClass } from '../../../api/class';
import { useDisclosure } from '@mantine/hooks';
import ModalEditClass from '../ModalEditClass';
import ModalDeleteClass from '../ModalDeleteClass';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

interface ICurrentClassProps {
  currentClass?: IClass;
  refetch: () => void;
}

const CurrentClass: React.FC<ICurrentClassProps> = (props) => {
  const { currentClass, refetch } = props;
  const [updateClassModalOpened, { close: closeUpdateClassModal, open: openUpdateClassModal }] = useDisclosure(false);
  const [deleteClassModalOpened, { close: closeDeleteClassModal, open: openDeleteClassModal }] = useDisclosure(false);
  if (!currentClass) return null;

  const { description, name, total } = currentClass;

  return (
    <React.Fragment>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section component="a" href="https://mantine.dev/">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{name}</Text>
        </Group>

        <Text size="sm" color="dimmed">
          {description || '<Không có mô tả>'}
        </Text>

        <Group mt={'sm'} position="right">
          <Button leftIcon={<IconPlus size={rem(18)} />}> Thêm quá trình</Button>
          <Button variant="outline" leftIcon={<IconPencil size={rem(18)} />} onClick={openUpdateClassModal}>
            Sửa thông tin
          </Button>
          <Button leftIcon={<IconTrash size={rem(18)} />} color="red" onClick={openDeleteClassModal}>
            Xoá
          </Button>
        </Group>
      </Card>

      <ModalEditClass
        onClose={closeUpdateClassModal}
        opened={updateClassModalOpened}
        refetch={refetch}
        class={currentClass}
      />

      <ModalDeleteClass
        class={currentClass}
        onClose={closeDeleteClassModal}
        opened={deleteClassModalOpened}
        refetch={refetch}
      />
    </React.Fragment>
  );
};

export default CurrentClass;
