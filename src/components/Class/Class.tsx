import { Affix, Button, Grid, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
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
        <Affix position={{ bottom: rem(20), right: rem(20) }}>
          <Button leftIcon={<IconPlus />} fullWidth={false} onClick={openNewClassModal}>
            Tạo lớp học mới
          </Button>
        </Affix>
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
