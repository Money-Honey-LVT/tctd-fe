import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isManagerOnly } from '../../utils/helpers';

// @ts-ignore
const withAdminAuthorization = (WrappedComponent) => {
  // @ts-ignore
  return (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isManagerOnly) {
        navigate('/unauthorized');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};
export default withAdminAuthorization;
