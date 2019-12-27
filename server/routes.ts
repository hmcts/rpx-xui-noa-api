import { Application } from 'express';
import noaRouter from './api/controllers/noa/router';

export default function routes(app: Application): void {
  app.use('/api/v1/noa', noaRouter);
};
