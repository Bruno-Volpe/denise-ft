import React, { useState, useEffect } from 'react';
import { User, UserInput } from '../../services/userService';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: UserInput) => void;
  user: User | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState<UserInput>({
    email: '',
    password: '',
    role: 'USER',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        role: user.role,
        password: '', // Password is not sent from server, so clear it for edits
      });
    } else {
      setFormData({
        email: '',
        password: '',
        role: 'USER',
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For new users, password is required
    if (!user && !formData.password) {
      alert('A senha é obrigatória para novos usuários.');
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-xl font-bold">{user ? 'Editar Usuário' : 'Novo Usuário'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full input-style" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full input-style"
              placeholder={user ? 'Deixe em branco para não alterar' : ''}
              required={!user}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text.gray-700">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="w-full input-style">
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
