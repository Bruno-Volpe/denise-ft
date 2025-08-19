import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import QualificationsPage from '../pages/QualificationsPage';
import ClientsPage from '../pages/ClientsPage';
import ProposalsPage from '../pages/ProposalsPage';
import UsersPage from '../pages/UsersPage';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/qualifications" element={<QualificationsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/proposals" element={<ProposalsPage />} />

          {/* Rotas de Admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
