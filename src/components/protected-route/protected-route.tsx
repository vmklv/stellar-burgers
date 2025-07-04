import { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { selectIsAuth } from '../../services/selectors/user';
import { fetchUser } from '../../services/slices/user';

interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth && localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth]);

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
