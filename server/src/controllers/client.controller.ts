import { Request, Response, NextFunction } from 'express';
import ClientService from '@/services/client.service';
import { Client, UpdatedClient } from '@/types';

export const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clients = await ClientService.getAllClients();
    res.jsend.success(clients);
  } catch (error) {
    next(error);
  }
};

export const getClientById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const client = await ClientService.getClientById(id);
    res.jsend.success(client);
  } catch (error) {
    next(error);
  }
};

export const createClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> = req.body;
    const newClient = await ClientService.createClient(clientData);
    res.jsend.success(newClient, 201);
  } catch (error) {
    next(error);
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: UpdatedClient = req.body;
    const updatedClient = await ClientService.updateClient(id, updateData);
    res.jsend.success(updatedClient);
  } catch (error) {
    next(error);
  }
};

export const deleteClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await ClientService.deleteClient(id);
    res.jsend.success(null, 204);
  } catch (error) {
    next(error);
  }
};
