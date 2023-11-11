import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import React from 'react';
import { IClass } from '../../../api/class';
import { useNavigate } from 'react-router-dom';

interface ICurrentClassProps {
  currentClass?: IClass;
}

const CurrentClass: React.FC<ICurrentClassProps> = (props) => {
  const { currentClass } = props;
  const navigate = useNavigate();

  if (!currentClass) return null;

  const { description, name, total } = currentClass;
  return (
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

      <Button
        onClick={() => navigate(`/class/${currentClass.id}`)}
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        Xem thông tin chi tiết
      </Button>
    </Card>
  );
};

export default CurrentClass;
