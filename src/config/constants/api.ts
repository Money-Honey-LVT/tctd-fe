export const baseURL = 'http://localhost:8080/api/v1/';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  authHeader: () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${localStorage.getItem('token')}`,
  }),
};

export const API_URLS = {
  auth: {
    register: () => ({
      endPoint: `auth/register`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    login: () => ({
      endPoint: `auth/login`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
  },
  user: {
    detail: (id: number) => ({
      endPoint: `user/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    update: (id: number) => ({
      endPoint: `user/${id}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    delete: (id: number) => ({
      endPoint: `user/${id}/delete`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    change: (id: number) => ({
      endPoint: `user/${id}/change-pwd`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },
};
