import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import MainLayout from '../components/layout/MainLayout';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // A lógica de persistência do Zustand reidrata o estado.
  // Se `isAuthenticated` for falso após a reidratação, o usuário não está logado.

  // Para evitar um flash da página de login enquanto o Zustand reidrata,
  // podemos adicionar um estado de carregamento, mas por agora isso é suficiente.

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};

export default ProtectedRoute;
