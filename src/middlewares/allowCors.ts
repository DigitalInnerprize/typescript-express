import { Response, Request, NextFunction } from 'express';

const allowCors = (req: Request, res: Response, next: NextFunction) => {
  res.set(`Access-Control-Allow-Origin`, `*`);
  res.set(`Access-Control-Allow-Methods`, `GET, POST, PATCH, PUT, DELETE, OPTIONS`);
  res.set(`Access-Control-Expose-Headers`, `X-Auth-Token, X-Refresh-Token, X-profile`);
  res.set(
    `Access-Control-Allow-Headers`,
    `Origin, Cache-Control, X-Auth-Token, X-Refresh-Token, X-profile, X-Requested-With, X-Tenancy-Client-Id, X-Tenancy-Project-Id, Content-Type, Accept, Authorization`,
  );

  next();
};

export default allowCors;
