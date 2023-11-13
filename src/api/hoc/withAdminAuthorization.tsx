import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDecodedToken } from '../../utils/token';

// @ts-ignore
const withAdminAuthorization = (WrappedComponent) => {
  // @ts-ignore
  return (props) => {
    const navigate = useNavigate();
    const isManager = getDecodedToken().role === 'ROLE_ADMIN';

    useEffect(() => {
      if (!isManager) {
        navigate('/unauthorized');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};
export default withAdminAuthorization;
