
export enum EStatusCode {
  success = 200,
  error = 400,
  notFound = 404,
  unauthorized = 401,
  internalError = 500,  
}

export type IHttpResult = {
  statusCode: number
  result?: unknown
  message: string
  errors?: unknown[]
}

export interface IResponseHandler {
  success(res: unknown, data: any, message: string, statusCode: number): IHttpResult
  error(res: unknown, message: string, statusCode: number, errors: any[]): IHttpResult
  notFound(res: any, message: string): IHttpResult
  unauthorized(res: any, message: string): IHttpResult
  internalError(res: any, message: string): IHttpResult
}

export class ResponseHandler {
  static success(res: any, data: any, message: string = 'Success'): IHttpResult {
    return res.status(EStatusCode.success).json({
      statusCode: EStatusCode.success,
      result: data,
      message
    });
  }

  static error(res: any, message: string, errors: any[] = []): IHttpResult {
    return res.status(EStatusCode.error).json({
      statusCode: EStatusCode.error,
      result: undefined,
      message,
      errors
    });
  }

  static notFound(res: any, message: string = 'Resource not found'): IHttpResult {
    return res.status(EStatusCode.notFound).json({
      statusCode: EStatusCode.notFound,
      result: undefined,
      message
    });
  }

  static unauthorized(res: any, message: string = 'Unauthorized'): IHttpResult {
    return res.status(EStatusCode.unauthorized).json({
      statusCode: EStatusCode.unauthorized,
      result: undefined,
      message
    });
  }

  static internalError(res: any, message: string = 'Internal Server Error'): IHttpResult{
    return res.status(EStatusCode.internalError).json({
      statusCode: EStatusCode.internalError,
      result: undefined,
      message
    });
  }
}
