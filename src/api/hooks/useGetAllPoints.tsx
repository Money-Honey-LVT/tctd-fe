import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { HEADERS, baseURL } from '../../config/constants/api';
import { IClass } from '../class';
import { ITime } from '../time';

export interface IPoint {
  id: string;
  studyPoint: number;
  disciplinePoint: number;
  competePoint: number;
  otherPoint: number;
  classPoint: IClass;
  time: ITime;
}

export const useGetAllPoints = () => {
  const [points, setPoints] = useState<IPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    try {
      const response = await fetch(`${baseURL}/points`, {
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
      setPoints(response?.data);
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
    fetchPoints();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchPoints();
  };

  return { points, loading, refetch };
};
