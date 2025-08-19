import React, { useEffect, useState } from 'react';
import { useProposalStore } from '../stores/proposalStore';
import { Proposal, ProposalInput } from '../services/proposalService';
import ProposalModal from '../components/proposals/ProposalModal';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ProposalsPage: React.FC = () => {
  const {
    proposals,
    isLoading,
    error,
    fetchAll,
    create,
    update,
    delete: deleteProposal,
  } = useProposalStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProposal, setEditingProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleOpenModal = (proposal: Proposal | null = null) => {
    setEditingProposal(proposal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProposal(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (proposalData: ProposalInput) => {
    try {
      if (editingProposal) {
        await update(editingProposal.id, proposalData);
      } else {
        await create(proposalData);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta proposta?')) {
      try {
        await deleteProposal(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Propostas</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Nova Proposta
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="p-4 bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {proposals.map((p) => (
            <li key={p.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-lg font-semibold">{p.descricao}</p>
                <p className="text-sm text-gray-600">Part Number: {p.partNumber}</p>
                <p className="text-sm text-gray-500">Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.valorVendaTotalProposta)}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleOpenModal(p)}
                  className="p-2 text-blue-600 rounded-full hover:bg-blue-100"
                  title="Editar"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
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

      <ProposalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        proposal={editingProposal}
      />
    </div>
  );
};

export default ProposalsPage;
