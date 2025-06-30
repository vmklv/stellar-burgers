import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

/**
 * TODO: replace stub authentication check with real data from store
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  /** TODO: взять переменную из стора */
  const isAuthChecked = true;
  const user = null;

  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as { from: string })?.from || '/';
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};
