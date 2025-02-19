import { Client, UpdatedClient } from '@/types';
import ClientModel, { ClientDocument } from '@/database/models/client.model';
import mongoose from 'mongoose';
import HttpError from '@/managers/responses/http-error';

export default class ClientService {
  public static async getAllClients(): Promise<Client[]> {
    try {
      const clients = await ClientModel.find().lean();
      return clients.map(this.mapClientDocument);
    } catch (error) {
      throw new HttpError(500, 'Failed to fetch clients');
    }
  }

  public static async getClientById(id: string): Promise<Client> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid client ID');
    }
    const client = await ClientModel.findById(id).lean();
    if (!client) {
      throw new HttpError(404, 'Client not found');
    }
    return this.mapClientDocument(client);
  }

  public static async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    try {
      const newClient = new ClientModel(clientData);
      const savedClient = await newClient.save();
      return this.mapClientDocument(savedClient);
    } catch (error) {
      throw new HttpError(400, 'Failed to create client');
    }
  }

  public static async updateClient(id: string, updateData: UpdatedClient): Promise<Client> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid client ID');
    }
    const updatedClient = await ClientModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();
    if (!updatedClient) {
      throw new HttpError(404, 'Client not found');
    }
    return this.mapClientDocument(updatedClient);
  }

  public static async deleteClient(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpError(400, 'Invalid client ID');
    }
    const result = await ClientModel.findByIdAndDelete(id);
    if (!result) {
      throw new HttpError(404, 'Client not found');
    }
  }

  private static mapClientDocument(client: ClientDocument): Client {
    return {
      id: client.id.toString(),
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phoneNumber: client.phoneNumber,
      dateOfBirth: client.dateOfBirth,
      fitnessGoals: client.fitnessGoals,
      coachId: client.coachId?.toString(),
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    };
  }
}
