import React, { useState, useEffect } from 'react';
import { Client, ClientInput } from '../../services/clientService';
import { useQualificationStore } from '../../stores/qualificationStore';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: ClientInput) => void;
  client: Client | null;
}

const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, onSubmit, client }) => {
  const [formData, setFormData] = useState<ClientInput>({
    razaoSocial: '',
    cnpj: '',
    inscricaoEstadual: '',
    endereco: '',
    cidade: '',
    estado: '',
    contato: '',
    emailContato: '',
    telefone: '',
    qualificationId: null,
  });

  const { qualifications, fetchAll: fetchQualifications } = useQualificationStore();

  useEffect(() => {
    // Fetch qualifications when modal opens for the first time
    if (isOpen) {
      fetchQualifications();
    }
  }, [isOpen, fetchQualifications]);

  useEffect(() => {
    if (client) {
      setFormData({
        razaoSocial: client.razaoSocial,
        cnpj: client.cnpj,
        inscricaoEstadual: client.inscricaoEstadual,
        endereco: client.endereco,
        cidade: client.cidade,
        estado: client.estado,
        contato: client.contato,
        emailContato: client.emailContato,
        telefone: client.telefone,
        qualificationId: client.qualificationId,
      });
    } else {
      setFormData({
        razaoSocial: '', cnpj: '', inscricaoEstadual: '', endereco: '',
        cidade: '', estado: '', contato: '', emailContato: '',
        telefone: '', qualificationId: null,
      });
    }
  }, [client, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value === '' ? null : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold">{client ? 'Editar Cliente' : 'Novo Cliente'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Fields */}
          <div className="md:col-span-2">
            <label htmlFor="razaoSocial" className="block text-sm font-medium text-gray-700">Razão Social</label>
            <input type="text" name="razaoSocial" value={formData.razaoSocial} onChange={handleChange} className="w-full input-style" required />
          </div>
          <div>
            <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">CNPJ</label>
            <input type="text" name="cnpj" value={formData.cnpj} onChange={handleChange} className="w-full input-style" required />
          </div>
          <div>
            <label htmlFor="inscricaoEstadual" className="block text-sm font-medium text-gray-700">Inscrição Estadual</label>
            <input type="text" name="inscricaoEstadual" value={formData.inscricaoEstadual} onChange={handleChange} className="w-full input-style" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
            <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <input type="text" name="estado" value={formData.estado} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="contato" className="block text-sm font-medium text-gray-700">Contato</label>
            <input type="text" name="contato" value={formData.contato} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="emailContato" className="block text-sm font-medium text-gray-700">Email do Contato</label>
            <input type="email" name="emailContato" value={formData.emailContato} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
            <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="qualificationId" className="block text-sm font-medium text.gray-700">Qualificação</label>
            <select name="qualificationId" value={formData.qualificationId || ''} onChange={handleChange} className="w-full input-style">
              <option value="">Nenhuma</option>
              {qualifications.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
            </select>
          </div>
          {/* Actions */}
          <div className="flex justify-end space-x-4 md:col-span-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Adicionando uma classe base para inputs para não repetir
const styles = `
  .input-style {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
`;

// Injetar estilos no head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default ClientModal;
