import { Button, Grid, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useFetchCriteria } from '../../api/criteria';
import ModalAddCriteria from './ModalAddCriteria/ModalAddCriteria';
import CriteriaListTable from './CriteriaListTable';

const Criterias = () => {
  const { criteria, loading, refetch } = useFetchCriteria();
  const [newCriteriaModalOpened, { close: closeNewCriteriaModal, open: openNewCriteriaModal }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Stack align="flex-start">
        <Button fullWidth={false} onClick={openNewCriteriaModal}>
          Tạo tiêu chí mới
        </Button>
        <CriteriaListTable data={criteria} />
      </Stack>
      <ModalAddCriteria refetch={refetch} onClose={closeNewCriteriaModal} opened={newCriteriaModalOpened} />
    </React.Fragment>
  );
};

export default Criterias;
