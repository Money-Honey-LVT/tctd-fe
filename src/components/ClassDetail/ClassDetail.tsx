import { Grid, Skeleton, rem } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import withAdminAuthorization from '../../api/hoc/withAdminAuthorization';

const PRIMARY_COL_HEIGHT = 'calc(100vh - 76px - 16px)';
const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - 0.5rem)`;

const ClassDetail = () => {
  const params = useParams();
  const { id } = params;
  if (!id) return null;

  return (
    <Grid>
      <Grid.Col span={6}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};

export default withAdminAuthorization(ClassDetail);
