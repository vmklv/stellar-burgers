import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  /** TODO: заменить на получение данных из стора */
  const isAuth = false;

  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    const { from } = (location.state as { from?: Location }) || {};
    return <Navigate to={from || '/'} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
