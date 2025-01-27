import { ZodError } from 'zod';

export const isZodError = (error: Error) => {
  return error instanceof ZodError;
};

export const formatZodErrorMessage = (error: ZodError) => {
  if (!isZodError(error)) return '';

  return error.issues
    .map((issue) => {
      const { path, message } = issue;

      return `${path.join('.')} ${message}`;
    })
    .join(', ');
};
