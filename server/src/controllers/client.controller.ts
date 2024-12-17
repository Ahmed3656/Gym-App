import { Request, Response } from 'express';
import { Client, UpdatedClient } from '../types';
import ClientService from '../services/client.service';

export const getClientById = (req: Request, res: Response) => {
  const { id } = req.params;
  const client = ClientService.getClientById(id);

  if (!client) res.jsend.fail({ client: 'Client not found' }, 404);

  res.jsend.success(client);
};

export const createClient = (req: Request, res: Response) => {
  try {
    const clientData: Client = req.body;
    const newClient = ClientService.createClient(clientData);

    res.jsend.success(newClient, 201);
  } catch (error) {
    res.jsend.error(error instanceof Error ? error.message : 'Error creating client');
  }
};

export const updateClient = (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData: UpdatedClient = req.body;

  const updatedClient = ClientService.updateClient(id, updateData);

  if (!updatedClient) res.jsend.fail({ client: 'Client not found' }, 404);

  res.jsend.success(updatedClient);
};

export const getAllClients = (req: Request, res: Response) => {
  const clients = ClientService.getAllClients();
  res.jsend.success(clients);
};

export const deleteClient = (req: Request, res: Response) => {
  const { id } = req.params;
  const isDeleted = ClientService.deleteClient(id);

  if (!isDeleted)  res.jsend.fail({ client: 'Client not found' }, 404);

  res.jsend.success("Client deleted succesfully", 204);
};