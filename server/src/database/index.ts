import mongoose from 'mongoose';

export default class Database {
  private readonly mongoUri: string;

  constructor() {
    if (!process.env.MONGODB_URI) {
      console.error("Missing MongoDB connection URI. Please set the MONGODB_URI environment variable.");
      process.exit(1);
    }
    this.mongoUri = process.env.MONGODB_URI;
  }

  public start = async (): Promise<boolean> => {
    try {
      await this.createConnection();
      console.log('Database mounted successfully');
      return true;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
      return false;
    }
  };

  private createConnection = async (): Promise<void> => {
    await mongoose.connect(this.mongoUri);
  };

  public close = async (): Promise<void> => {
    await mongoose.connection.close();
  };
}
