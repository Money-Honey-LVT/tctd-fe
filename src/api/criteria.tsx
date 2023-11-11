import { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export interface ICriteria {
  name: string;
  description: string;
  isCountable: boolean;
  points: number;
  type: string;
  subType: string;
}

export const useFetchCriteria = () => {
  const [criteria, setCriteria] = useState<ICriteria[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCriteria = async () => {
    try {
      const response = await fetch(`${baseURL}/criteria`, {
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
      setCriteria(response?.data);
    } catch (e) {
      notifications.show({
        message: 'Đã có lỗi xảy ra',
        color: 'red',
        icon: <IconX />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCriteria();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchCriteria();
  };

  return { criteria, loading, refetch };
};
