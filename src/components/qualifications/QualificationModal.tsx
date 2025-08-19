import React, { useState, useEffect } from 'react';
import { Qualification, QualificationInput } from '../../services/qualificationService';

interface QualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (qualification: QualificationInput) => void;
  qualification: Qualification | null; // null for create, object for edit
}

const QualificationModal: React.FC<QualificationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  qualification,
}) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // Populate form when editing
    if (qualification) {
      setName(qualification.name);
    } else {
      // Clear form when creating
      setName('');
    }
  }, [qualification, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-xl font-bold">
          {qualification ? 'Editar Qualificação' : 'Nova Qualificação'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QualificationModal;
