import Server from './server';

export default class App {
  public static start = async (logging: boolean = true) => {
    new Server().start();
  };

  // mount db
}