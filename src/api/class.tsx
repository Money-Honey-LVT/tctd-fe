import { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export interface IClass {
  id: number;
  name: string;
  description?: string;
  total: number;
}

export const useFetchClasses = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${baseURL}/classes`, {
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
        setClasses(response?.data);
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

    fetchClasses();
  }, []);

  return { classes, loading };
};
