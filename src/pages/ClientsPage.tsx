import React, { useEffect, useState } from 'react';
import { useClientStore } from '../stores/clientStore';
import { Client, ClientInput } from '../services/clientService';
import ClientModal from '../components/clients/ClientModal';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const ClientsPage: React.FC = () => {
  const {
    clients,
    isLoading,
    error,
    fetchAll,
    create,
    update,
    delete: deleteClient,
  } = useClientStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleOpenModal = (client: Client | null = null) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingClient(null);
    setIsModalOpen(false);
  };

  const handleSubmit = async (clientData: ClientInput) => {
    try {
      if (editingClient) {
        await update(editingClient.id, clientData);
      } else {
        await create(clientData);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await deleteClient(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <FiPlus className="mr-2" />
          Novo Cliente
        </button>
      </div>

      {isLoading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="p-4 bg-white rounded-lg shadow">
        <ul className="divide-y divide-gray-200">
          {clients.map((c) => (
            <li key={c.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-lg font-semibold">{c.razaoSocial}</p>
                <p className="text-sm text-gray-600">{c.cnpj}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleOpenModal(c)}
                  className="p-2 text-blue-600 rounded-full hover:bg-blue-100"
                  title="Editar"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
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

      <ClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        client={editingClient}
      />
    </div>
  );
};

export default ClientsPage;
