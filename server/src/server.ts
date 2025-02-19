import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import JsendResponse from './managers/middlewares/jsendResponse';
import clientRoutes from './routes/client.routes';
import coachRoutes from './routes/coach.routes';
import dietPlanRoutes from './routes/dietPlan.routes';
import ingredientRoutes from './routes/ingredient.routes';
import mealRoutes from './routes/meal.routes';
import workoutRoutes from './routes/workout.routes';


export default class Server {
  private app: Application = express();
  private port: number = parseInt(process.env.PORT || '3000');

  public start = () => {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.listen();
  };

  private initializeRoutes = () => {
    this.app.get('/', (req, res) => {
      res.status(200).json({ status: 'Welcome to the API' });
    });

    this.app
    .use('/api/clients', clientRoutes)
    .use('/api/coaches', coachRoutes)
    .use('/api/diet-plans', dietPlanRoutes)
    .use('/api/ingredients', ingredientRoutes)
    .use('/api/meals', mealRoutes)
    .use('/api/workouts', workoutRoutes)
  };

  private initializeMiddlewares = () => {
    this.app
      .use(morgan('dev'))
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cors())
      .use(JsendResponse.middleware)
  };

  private listen = () => {
    this.app.listen(this.port, () => {console.log(`Server listening on port ${this.port}`)});
  };
}
