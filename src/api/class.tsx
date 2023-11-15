import { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export interface IClass {
  id: string;
  name: string;
  description?: string;
  total: number;
}

export const useFetchClasses = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchClasses();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchClasses();
  };

  return { classes, loading, refetch };
};

export const useGetClassById = (id: string) => {
  const [fetchedClass, setFetchedClass] = useState<IClass>();
  const [loading, setLoading] = useState(true);

  const fetchProcesses = async () => {
    try {
      const response = await fetch(`${baseURL}/classes/${id}`, {
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
      setFetchedClass(response?.data);
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
    fetchProcesses();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchProcesses();
  };

  return { fetchedClass, loading, refetch };
};
