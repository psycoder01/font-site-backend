import httpStatus from 'http-status';

export const NOT_FOUND = (message: string, isPublic?: boolean) => ({
  status: httpStatus.NOT_FOUND,
  message: message,
  isPublic: isPublic,
});

export const ERROR = (message: string, isPublic?: boolean) => ({
  status: httpStatus.BAD_REQUEST,
  message,
  isPublic,
});
