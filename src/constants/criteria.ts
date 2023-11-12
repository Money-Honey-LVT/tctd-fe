export const BASE_CRITERIAS = [
  {
    label: 'A. Nề nếp',
    value: 'NE_NEP',
    children: [
      {
        label: '1. Chuyên cần',
        value: 'CHUYEN_CAN',
      },
      {
        label: '2. Vệ sinh, nề nếp',
        value: 'VESINH_NENEP',
      },
      {
        label: '3. Đồng phục',
        value: 'DONG_PHUC',
      },
      {
        label: '4. Chào cờ',
        value: 'CHAO_CO',
      },
      {
        label: '5. Giờ chủ nhiệm - bình tuần',
        value: 'BINH_TUAN',
      },
      {
        label: '6. Các hoạt động tự quản và thể dục vui chơi',
        value: 'TU_QUAN',
      },
      {
        label: '7. Vi phạm',
        value: 'VI_PHAM',
      },
      {
        label: '8. Các hoạt động văn nghệ, thể dục thể thao nghi thức Đội',
        value: 'VAN_NGHE',
      },
      {
        label: '9. Các hoạt động của đội sao đỏ',
        value: 'SAO_DO',
      },
    ],
  },
  {
    label: 'B. Học tập',
    value: 'HOC_TAP',
    children: [
      {
        label: 'Các hoạt động thi đua trong tuần',
        value: 'THI_DUA',
      },
    ],
  },
  {
    label: 'C. Khen thưởng tập thể và cá nhân',
    value: 'KHEN_THUONG',
    children: [
      {
        label: 'Khen thưởng cá nhân',
        value: 'KHEN_THUONG_CA_NHAN',
      },
      {
        label: 'Khen thưởng tập thể',
        value: 'KHEN_THUONG_TAP_THE',
      },
    ],
  },
];

export const criteriaMapping = {
  NE_NEP: 'Nề nếp',
  CHUYEN_CAN: 'Chuyên cần',
  VESINH_NENEP: 'Vệ sinh, nề nếp',
  DONG_PHUC: 'Đồng phục',
  CHAO_CO: 'Chào cờ',
  BINH_TUAN: 'Giờ chủ nhiệm - bình tuần',
  TU_QUAN: 'Các hoạt động tự quản và thể dục vui chơi',
  VI_PHAM: 'Vi phạm',
  VAN_NGHE: 'Các hoạt động văn nghệ, thể dục thể thao nghi thức Đội',
  SAO_DO: 'Các hoạt động của đội sao đỏ',
  HOC_TAP: 'Học tập',
  THI_DUA: 'Các hoạt động thi đua trong tuần',
  KHEN_THUONG: 'Khen thưởng tập thể và cá nhân',
  KHEN_THUONG_CA_NHAN: 'Khen thưởng cá nhân',
  KHEN_THUONG_TAP_THE: 'Khen thưởng tập thể',
};
