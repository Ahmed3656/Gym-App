import { Client, UpdatedClient } from '../types';

export default class ClientService {
  // mock db
  private static clients: Client[] = [];

  public static getClientById(id: string): Client | undefined {
    return this.clients.find(client => client.id === id);
  }

  public static createClient(clientData: Client): Client {
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(), // for now until db is mounted
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.clients.push(newClient);
    return newClient;
  }

  public static updateClient(id: string, updateData: UpdatedClient): Client | null {
    const clientIndex = this.clients.findIndex(client => client.id === id);

    if (clientIndex === -1) {
      return null;
    }

    this.clients[clientIndex] = {
      ...this.clients[clientIndex],
      ...updateData,
      updatedAt: new Date()
    };

    return this.clients[clientIndex];
  }

  public static getAllClients(): Client[] {
    return this.clients;
  }

  public static deleteClient(id: string): boolean {
    const clientIndex = this.clients.findIndex(client => client.id === id);

    if (clientIndex === -1) {
      return false;
    }

    this.clients.splice(clientIndex, 1);
    return true;
  }
}