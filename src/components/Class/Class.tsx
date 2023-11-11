import { Button, Flex, Grid, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { IClass, useFetchClasses } from '../../api/class';
import ClasssesListTable from './ClasssesListTable';
import CurrentClass from './CurrentClass';
import ModalAddClass from './ModalAddClass';

const Class = () => {
  const { classes, loading, refetch } = useFetchClasses();
  const [currentClass, setCurrentClass] = useState<IClass>();
  const [newClassModalOpened, { close: closeNewClassModal, open: openNewClassModal }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Stack align="flex-start">
        <Button fullWidth={false} onClick={openNewClassModal}>
          Tạo lớp học mới
        </Button>
        <Grid w="100%" columns={24}>
          <Grid.Col lg={16} md={24}>
            <ClasssesListTable data={classes} setCurrentClass={setCurrentClass} />
          </Grid.Col>
          <Grid.Col lg={8} md={24}>
            <CurrentClass currentClass={currentClass || classes[0]} />
          </Grid.Col>
        </Grid>
      </Stack>
      <ModalAddClass refetch={refetch} onClose={closeNewClassModal} opened={newClassModalOpened} />
    </React.Fragment>
  );
};

export default Class;
