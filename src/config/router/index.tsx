const ROUTER = {
  HOME: {
    INDEX: '/',
  },
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/signup',
  },
  NAV: {
    STATISTICS: {
      INDEX: '/statistics',
    },
    CLASS: {
      INDEX: '/class',
      DETAIL: '/class/:id',
    },
    RANKINGS: {
      INDEX: '/rankings',
    },
    REFERENCE: {
      INDEX: '/reference',
    },
    CRITERIAS: {
      INDEX: '/criterias',
    },
    TIME: {
      INDEX: '/time',
    },
    MONTHLY_RANK: {
      INDEX: '/monthly-rank',
    },
  },
};

export default ROUTER;
