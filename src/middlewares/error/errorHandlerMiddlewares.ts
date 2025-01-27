import { NextFunction, Request, Response } from 'express';

import { formatZodErrorMessage, isZodError } from '../../libs/zod/index';

export class ErrorHandlerMiddleware {
  private parse = (error: Error) => {
    const statusMap: { [key: string]: number } = {
      BAD_REQUEST: 400,
      NOT_FOUND: 404,
      UNAUTHORIZED: 401,
    };
    const defaultStatus = 500;
    const status = statusMap[error.name] || defaultStatus;

    return {
      status,
      message: error.message,
    };
  };

  handle = (error: Error, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(error);

      return;
    }
    let statusCode: number;
    let message: string;

    const parsedError = this.parse(error);
    statusCode = parsedError.status;
    message = parsedError.message;

    if (isZodError(error)) {
      statusCode = 400;
      message = formatZodErrorMessage(error);
    }

    res.status(statusCode).json({ message });

    console.log(JSON.stringify(error));
  };
}
