import React, { useState, useEffect } from 'react';
import { Proposal, ProposalInput } from '../../services/proposalService';
import { useClientStore } from '../../stores/clientStore';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: ProposalInput) => void;
  proposal: Proposal | null;
}

const initialFormData: ProposalInput = {
  clientId: '',
  partNumber: '',
  descricao: '',
  ncm: '',
  quantidade: 0,
  valorVendaUnitario: 0,
  valorVendaTotalItem: 0,
  valorVendaTotalProposta: 0,
  dadosFaturamento: null,
  custos: 0,
  valorCustoUnitario: 0,
  valorCustoTotal: 0,
};

const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose, onSubmit, proposal }) => {
  const [formData, setFormData] = useState<ProposalInput>(initialFormData);
  const { clients, fetchAll: fetchClients } = useClientStore();

  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen, fetchClients]);

  useEffect(() => {
    if (proposal) {
      setFormData(proposal);
    } else {
      setFormData(initialFormData);
    }
  }, [proposal, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData((prev) => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-4 text-xl font-bold">{proposal ? 'Editar Proposta' : 'Nova Proposta'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Fields */}
          <div className="md:col-span-3">
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Cliente</label>
            <select name="clientId" value={formData.clientId} onChange={handleChange} className="w-full input-style" required>
              <option value="">Selecione um cliente</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.razaoSocial}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700">Part Number</label>
            <input type="text" name="partNumber" value={formData.partNumber} onChange={handleChange} className="w-full input-style" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <input type="text" name="descricao" value={formData.descricao} onChange={handleChange} className="w-full input-style" required />
          </div>
          <div>
            <label htmlFor="ncm" className="block text-sm font-medium text-gray-700">NCM</label>
            <input type="text" name="ncm" value={formData.ncm} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} className="w-full input-style" />
          </div>
          <div>
            <label htmlFor="valorVendaUnitario" className="block text-sm font-medium text-gray-700">Valor Unitário</label>
            <input type="number" step="0.01" name="valorVendaUnitario" value={formData.valorVendaUnitario} onChange={handleChange} className="w-full input-style" />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="dadosFaturamento" className="block text-sm font-medium text-gray-700">Dados de Faturamento</label>
            <textarea name="dadosFaturamento" value={formData.dadosFaturamento || ''} onChange={handleChange} className="w-full input-style" />
          </div>
          {/* Other fields can be added as needed, some might be calculated */}

          {/* Actions */}
          <div className="flex justify-end space-x-4 md:col-span-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProposalModal;
