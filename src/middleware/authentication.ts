import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

/** Authorize a request if the Json Web Token is valid. Otherwise throw unauthrorized error 401 */
export const authentication = (req: Request, res: Response, next: NextFunction) => {
  // Get the jwt token from the head
  const token = req.headers.authorization;
  let jwtPayload;

  // Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, process.env.TOKEN_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  // The token is valid for 24 hours
  // We want to send a new token on every request
  const { userId } = jwtPayload;
  const newToken = jwt.sign({ userId }, process.env.TOKEN_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: '24h'
    });

  res.setHeader('token', newToken);

  // Call the next middleware or controller
  next();
};

export default authentication;
