import { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export interface ITime {
  id: string;
  start: string;
  end: string;
  week: string;
  month: string;
  semester: string;
}

export const useFetchTimes = () => {
  const [times, setTimes] = useState<ITime[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTimes = async () => {
    try {
      const response = await fetch(`${baseURL}/times`, {
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
      setTimes(response?.data);
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
    fetchTimes();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchTimes();
  };

  return { times, loading, refetch };
};
