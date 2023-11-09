import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import ROUTER from '../../config/router';
import { decodeToken } from '../../utils/helpers';
import { isObject } from 'lodash';
interface Props {
  children: ReactNode;
}
const AuthRoutes = ({ children }: Props) => {
  // const decodedToken = decodeToken();
  const hasNoToken = !localStorage.getItem('token');
  return hasNoToken ? <Navigate to={ROUTER.AUTH.LOGIN} /> : <>{children}</>;
};

export default AuthRoutes;
