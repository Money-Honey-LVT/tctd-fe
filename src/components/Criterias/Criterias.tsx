import { Affix, Button, Stack, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { useFetchCriteria } from '../../api/criteria';
import CriteriaListTable from './CriteriaListTable';
import ModalAddCriteria from './ModalAddCriteria/ModalAddCriteria';

const Criterias = () => {
  const { criteria, loading, refetch } = useFetchCriteria();
  const [newCriteriaModalOpened, { close: closeNewCriteriaModal, open: openNewCriteriaModal }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Stack align="flex-start">
        <Affix position={{ bottom: rem(20), right: rem(20) }}>
          <Button leftIcon={<IconPlus size={rem(18)} />} fullWidth={false} onClick={openNewCriteriaModal}>
            Tạo tiêu chí mới
          </Button>
        </Affix>

        <CriteriaListTable data={criteria} />
      </Stack>
      <ModalAddCriteria refetch={refetch} onClose={closeNewCriteriaModal} opened={newCriteriaModalOpened} />
    </React.Fragment>
  );
};

export default Criterias;
