import { Router } from 'express';
import { IEndpoint } from './../interfaces/misc.interface';
import endpoints from './endpoints';

const Routers = (router: Router) => {
  endpoints.forEach((endpoint: IEndpoint) => {
    endpoint.methods.forEach((method) => {
      router[method](`/${endpoint.route}`, ...endpoint.middlewares[method]);
    });

    router.all(`/${endpoint.route}`, (req, res, next) =>
      res.status(405).send({ code: 405, message: 'Method not allowed!' }),
    );
  });

  return router;
};

export default Routers;
