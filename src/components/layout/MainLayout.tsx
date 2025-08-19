import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { FiHome, FiBriefcase, FiUsers, FiFileText, FiLogOut, FiAward } from 'react-icons/fi';

const MainLayout: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: <FiHome />, label: 'Dashboard' },
    { to: '/qualifications', icon: <FiAward />, label: 'Qualificações' },
    { to: '/clients', icon: <FiBriefcase />, label: 'Clientes' },
    { to: '/proposals', icon: <FiFileText />, label: 'Propostas' },
    { to: '/admin/users', icon: <FiUsers />, label: 'Usuários' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center text-2xl font-bold">
          <span>Denise</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-end h-16 px-6 bg-white shadow-md">
          <div className="flex items-center">
            <span className="mr-4 text-gray-600">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center p-2 text-red-500 rounded-full hover:bg-red-100"
              title="Sair"
            >
              <FiLogOut size={20} />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
