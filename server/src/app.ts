import Database from './database';
import Server from './server';

export default class App {
  public static start = async (logging: boolean = true) => {
    await this.mountDatabse();
    new Server().start();
  };

  private static mountDatabse = async (): Promise<boolean> => {
    console.log("Mounting database...");
    return new Database().start();
  };
}
