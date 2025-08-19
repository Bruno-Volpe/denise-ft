import React, { useEffect, useState } from 'react';
import { useUserStore } from '../stores/userStore';
import { User, UserInput } from '../services/userService';
import UserModal from '../components/users/UserModal';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const UsersPage: React.FC = () => {
  const {
    users,
    isLoading,
    error,
    fetchAll,
    create,
    update,
    delete: deleteUser,
  } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleOpenModal = (user: User | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (userData: UserInput) => {
    try {
      if (editingUser) {
        await update(editingUser.id, userData);
      } else {
        await create(userData);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Novo Usuário
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="p-4 bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {users.map((u) => (
            <li key={u.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-lg font-semibold">{u.email}</p>
                <p className="px-2 py-1 text-xs font-medium text-white bg-gray-500 rounded-full">{u.role}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleOpenModal(u)}
                  className="p-2 text-blue-600 rounded-full hover:bg-blue-100"
                  title="Editar"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="p-2 text-red-600 rounded-full hover:bg-red-100"
                  title="Excluir"
                >
                  <FiTrash2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        user={editingUser}
      />
    </div>
  );
};

export default UsersPage;
