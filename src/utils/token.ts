import jwtDecode from 'jwt-decode';

interface IDecodedToken {
  sub?: string;
  role?: string;
  id?: string;
  exp?: number;
  iat?: number;
}

export const getDecodedToken = (): IDecodedToken => {
  const token = localStorage.getItem('token');
  if (!token) return {};
  return jwtDecode(token);
};
