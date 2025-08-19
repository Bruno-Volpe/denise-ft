import React, { useEffect, useState } from 'react';
import { useQualificationStore } from '../stores/qualificationStore';
import { Qualification, QualificationInput } from '../services/qualificationService';
import QualificationModal from '../components/qualifications/QualificationModal';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const QualificationsPage: React.FC = () => {
  const {
    qualifications,
    isLoading,
    error,
    fetchAll,
    create,
    update,
    delete: deleteQualification,
  } = useQualificationStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQualification, setEditingQualification] = useState<Qualification | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleOpenModal = (qualification: Qualification | null = null) => {
    setEditingQualification(qualification);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingQualification(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (qualificationData: QualificationInput) => {
    try {
      if (editingQualification) {
        await update(editingQualification.id, qualificationData);
      } else {
        await create(qualificationData);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      // Aqui poderíamos mostrar um toast/notificação de erro
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta qualificação?')) {
      try {
        await deleteQualification(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Qualificações</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Nova Qualificação
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="p-4 bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {qualifications.map((q) => (
            <li key={q.id} className="flex items-center justify-between p-4">
              <span className="text-lg">{q.name}</span>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleOpenModal(q)}
                  className="p-2 text-blue-600 rounded-full hover:bg-blue-100"
                  title="Editar"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
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

      <QualificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        qualification={editingQualification}
      />
    </div>
  );
};

export default QualificationsPage;
