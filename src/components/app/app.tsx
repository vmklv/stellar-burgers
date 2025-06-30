import '../../index.css';
import styles from './app.module.css';

import { AppHeader, ProtectedRoute } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Routes, Route } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route
        path='/login'
        element={<ProtectedRoute onlyUnAuth component={<Login />} />}
      />
      <Route
        path='/register'
        element={<ProtectedRoute onlyUnAuth component={<Register />} />}
      />
      <Route
        path='/forgot-password'
        element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
      />
      <Route
        path='/reset-password'
        element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
      />
      <Route path='/profile' element={<ProtectedRoute component={<Profile />} />} />
      <Route
        path='/profile/orders'
        element={<ProtectedRoute component={<ProfileOrders />} />}
      />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
