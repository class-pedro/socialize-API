import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { usersRoutes } from './routes/usersRoutes';
import { errorHandlerMiddleware } from '../middlewares/error/index';
import { postsRoutes } from './routes/postsRoutes';
import { commentsRoutes } from './routes/commentsRoutes';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.initMiddlewares();
    this.initRoutes();
    this.server.use(errorHandlerMiddleware.handle);
  }

  private initMiddlewares() {
    this.server.use(cors());
    this.server.use(bodyParser.json());
  }

  private initRoutes() {
    this.server.use(usersRoutes);
    this.server.use(postsRoutes);
    this.server.use(commentsRoutes);
  }
}

export const app = new App().server;
