import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { HEADERS, baseURL } from '../../config/constants/api';
import { ICriteria } from '../criteria';
import { ITime } from '../time';
import { IClass } from '../class';

export interface IProcess {
  id: string;
  criteria: ICriteria;
  time: ITime;
  classProcess: IClass;
  points: number;
  description: string;
}

export const useGetAllProcessByClass = (id: string) => {
  const [processes, setProcesses] = useState<IProcess[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProcesses = async () => {
    try {
      const response = await fetch(`${baseURL}/processes/${id}`, {
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
      setProcesses(response?.data);
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

  return { processes, loading, refetch };
};
