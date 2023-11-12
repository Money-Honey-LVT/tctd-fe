import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconAB2, IconBook2, IconClock, IconReportAnalytics, IconSchool } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { getDecodedToken } from '../../utils/token';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
  managerOnly: boolean;
}

const MainLink = ({ icon, color, label, to, managerOnly }: MainLinkProps) => {
  const navigate = useNavigate();
  return (
    <UnstyledButton
      onClick={() => navigate(to, { replace: true })}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

const data = [
  {
    icon: <IconReportAnalytics size="1rem" />,
    color: 'red',
    label: 'Thống kê toàn trường',
    to: ROUTER.NAV.STATISTICS.INDEX,
    managerOnly: false,
  },
  {
    icon: <IconReportAnalytics size="1rem" />,
    color: 'yellow',
    label: 'Xếp hạng các lớp',
    to: ROUTER.NAV.RANKINGS.INDEX,
    managerOnly: false,
  },
  {
    icon: <IconSchool size="1rem" />,
    color: 'teal',
    label: 'Danh sách lớp',
    to: ROUTER.NAV.CLASS.INDEX,
    managerOnly: true,
  },

  {
    icon: <IconAB2 size="1rem" />,
    color: 'violet',
    label: ' Quản lý tiêu chí',
    to: ROUTER.NAV.CRITERIAS.INDEX,
    managerOnly: true,
  },
  {
    icon: <IconClock size="1rem" />,
    color: 'gray',
    label: 'Quản lý khung thời gian',
    to: ROUTER.NAV.TIME.INDEX,
    managerOnly: true,
  },
  // {
  //   icon: <IconBook2 size="1rem" />,
  //   color: 'blue',
  //   label: 'Tài liệu tiêu chí',
  //   to: ROUTER.NAV.REFERENCE.INDEX,
  //   managerOnly: false,
  // },
];

const MainLinks = () => {
  const isManager = getDecodedToken().role === 'ROLE_ADMIN';
  if (!isManager) {
    const filterData = data.filter((link) => !link.managerOnly);
    const links = filterData.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
  } else {
    const links = data.map((link) => <MainLink {...link} key={link.label} />);
    return <div>{links}</div>;
  }
};

export default MainLinks;
