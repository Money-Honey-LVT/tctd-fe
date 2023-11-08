import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import consts from '../config/constants';

interface DecodedToken {
  Role?: string;
  aud?: string;
  exp?: number;
  fullname?: string;
  id?: string;
  image?: string;
  iss?: string;
  username?: string;
}

export const decodeToken = (): DecodedToken => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwt_decode(token.replace('Bearer ', ''));
  } else
    return {
      Role: '',
    };
};

export const isManager = () => {
  const decodedToken: DecodedToken | undefined = decodeToken();
  const role = decodedToken?.Role;
  return role === consts.ROLE_ADMIN ? true : false;
};
