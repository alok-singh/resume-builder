import { Navigate } from 'react-router';
import { checkIsLogin } from '../utils/helper.util';
import Header from './header';
import Footer from './footer';
import { Toaster } from './toast';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkIsLogin();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="protected-routes">
      <Header authed={isAuthenticated} />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
};

export default ProtectedRoute;
