import api from './api';
import {
  Contract,
  ContractDetail,
  ContractMilestone,
  ContractDocument,
  ContractLocation,
  CreateContractData,
  UpdateContractData,
  CreateMilestoneData,
  ContractFilters
} from './types';

// Contracts service
export const contractsService = {
  // Get all contracts (for current user)
  async getContracts(filters?: ContractFilters): Promise<{
    results: Contract[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/contracts/', { params: filters });
    return response.data;
  },

  // Get contract details
  async getContract(contractId: number): Promise<ContractDetail> {
    const response = await api.get(`/contracts/${contractId}/`);
    return response.data;
  },

  // Create a new contract
  async createContract(data: CreateContractData): Promise<Contract> {
    const response = await api.post('/contracts/create/', data);
    return response.data;
  },

  // Update contract
  async updateContract(contractId: number, data: UpdateContractData): Promise<Contract> {
    const response = await api.put(`/contracts/${contractId}/update/`, data);
    return response.data;
  },

  // Sign contract
  async signContract(contractId: number): Promise<{ message: string }> {
    const response = await api.post(`/contracts/${contractId}/sign/`);
    return response.data;
  },

  // Terminate contract
  async terminateContract(contractId: number, reason?: string): Promise<{ message: string }> {
    const response = await api.post(`/contracts/${contractId}/terminate/`, { reason });
    return response.data;
  },

  // Get client contracts
  async getClientContracts(filters?: ContractFilters): Promise<{
    results: Contract[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/contracts/client/', { params: filters });
    return response.data;
  },

  // Get professional contracts
  async getProfessionalContracts(filters?: ContractFilters): Promise<{
    results: Contract[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    const response = await api.get('/contracts/professional/', { params: filters });
    return response.data;
  },

  // Contract Milestones
  async getContractMilestones(contractId: number): Promise<ContractMilestone[]> {
    const response = await api.get(`/contracts/${contractId}/milestones/`);
    return response.data.results || response.data;
  },

  async createMilestone(contractId: number, data: CreateMilestoneData): Promise<ContractMilestone> {
    const response = await api.post(`/contracts/${contractId}/milestones/`, data);
    return response.data;
  },

  async updateMilestone(milestoneId: number, data: Partial<CreateMilestoneData>): Promise<ContractMilestone> {
    const response = await api.put(`/contracts/milestones/${milestoneId}/`, data);
    return response.data;
  },

  async deleteMilestone(milestoneId: number): Promise<{ message: string }> {
    const response = await api.delete(`/contracts/milestones/${milestoneId}/`);
    return response.data;
  },

  // Contract Documents
  async getContractDocuments(contractId: number): Promise<ContractDocument[]> {
    const response = await api.get(`/contracts/${contractId}/documents/`);
    return response.data.results || response.data;
  },

  async uploadDocument(contractId: number, file: File, documentType: string, name: string): Promise<ContractDocument> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);
    formData.append('name', name);
    
    const response = await api.post(`/contracts/${contractId}/documents/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async deleteDocument(documentId: number): Promise<{ message: string }> {
    const response = await api.delete(`/contracts/documents/${documentId}/`);
    return response.data;
  },

  // Contract Locations
  async getContractLocations(contractId: number): Promise<ContractLocation[]> {
    const response = await api.get(`/contracts/${contractId}/locations/`);
    return response.data.results || response.data;
  },

  async createLocation(contractId: number, data: Omit<ContractLocation, 'id' | 'contract' | 'created_at' | 'updated_at'>): Promise<ContractLocation> {
    const response = await api.post(`/contracts/${contractId}/locations/`, data);
    return response.data;
  },

  async updateLocation(locationId: number, data: Partial<Omit<ContractLocation, 'id' | 'contract' | 'created_at' | 'updated_at'>>): Promise<ContractLocation> {
    const response = await api.put(`/contracts/locations/${locationId}/update/`, data);
    return response.data;
  },

  async deleteLocation(locationId: number): Promise<{ message: string }> {
    const response = await api.delete(`/contracts/locations/${locationId}/delete/`);
    return response.data;
  },

  async setPrimaryLocation(locationId: number): Promise<{ message: string }> {
    const response = await api.post(`/contracts/locations/${locationId}/set_primary/`);
    return response.data;
  },

  // Contract Statistics
  async getContractStats(): Promise<{
    total_contracts: number;
    active_contracts: number;
    completed_contracts: number;
    total_value: number;
    paid_amount: number;
    pending_amount: number;
    completion_rate: number;
  }> {
    const response = await api.get('/contracts/stats/');
    return response.data;
  },
};