import { useEffect, useState } from 'react';
import { getDecodedToken } from '../../utils/token';
import { HEADERS, baseURL } from '../../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

type RoleInfo = {
  name: string;
  id: string;
};

export interface IProfileInfo {
  id: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt: string;
  lastModifiedBy: string;
  userName: string;
  role: string;
  fullName: string;
  email: string | null;
  phoneNumber: string | null;
  dob: string | null;
  deleted: boolean;
}

const roleMappings: { [key: string]: RoleInfo } = {
  ROLE_GUEST: { name: 'Khách', id: '1' },
  ROLE_ADMIN: { name: 'Quản lý hệ thống', id: '2' },
};

export function getRoleInfo(role?: string): RoleInfo | undefined {
  if (!role) return undefined;
  return roleMappings[role];
}

export const useGetProfileInfo = () => {
  const [profileInfo, setProfileInfo] = useState<IProfileInfo>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { id } = getDecodedToken();
        const response = await fetch(`${baseURL}/users/${id}`, {
          method: 'GET',
          headers: HEADERS.authHeader,
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
        setProfileInfo(response.data);
      } catch (e) {
        notifications.show({
          title: 'Đã có lỗi xảy ra',
          message: 'Không thể lấy tên người dùng hiện tại',
          color: 'red',
          icon: <IconX />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profileInfo, isLoading };
};
