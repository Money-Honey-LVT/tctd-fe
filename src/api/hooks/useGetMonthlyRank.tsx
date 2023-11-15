import { useEffect, useState } from 'react';
import { baseURL, HEADERS } from '../../config/constants/api';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export interface IMonthlyRank {
  month: string;
  className: string;
  points: number;
  rank: number;
}

export const useGetMonthlyRank = () => {
  const [ranks, setRanks] = useState<IMonthlyRank[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRanks = async () => {
    try {
      const response = await fetch(`${baseURL}/ranks`, {
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
      setRanks(response?.data);
    } catch (e) {
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanks();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchRanks();
  };

  return { ranks, loading, refetch };
};
