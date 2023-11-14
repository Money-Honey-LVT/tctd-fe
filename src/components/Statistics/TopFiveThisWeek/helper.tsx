export const ths = (
  <tr>
    <th>STT</th>
    <th>Lớp</th>
    <th>Nề nếp</th>
    <th>Học tập</th>
    <th>Tổng điểm</th>
  </tr>
);

export const getStylesByIndex = (index: number) => {
  const defaultOverrideStyle = { fontWeight: 'bold' };
  switch (index) {
    case 0:
      return { color: 'blue', ...defaultOverrideStyle };
    case 1:
      return { color: 'red', ...defaultOverrideStyle };
    case 2:
      return { color: 'green', ...defaultOverrideStyle };
    default:
      return undefined;
  }
};
