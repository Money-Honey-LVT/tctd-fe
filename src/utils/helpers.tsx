import { getDecodedToken } from './token';

export const isManagerOnly = getDecodedToken().role === 'ROLE_ADMIN';
