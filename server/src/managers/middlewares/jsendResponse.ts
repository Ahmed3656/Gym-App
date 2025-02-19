import { Request, Response, NextFunction } from 'express';

export default class JsendResponse {
  static middleware(req: Request, res: Response, next: NextFunction): void {
    res.jsend = {
      success: (data = null, status = 200) => {
        return res.status(status).json({
          status: 'success',
          data: data
        });
      },
      
      fail: (data = null, status = 400) => {
        return res.status(status).json({
          status: 'fail',
          data: data
        });
      },
      
      error: (message = 'Internal server error', code = 500, data = null) => {
        return res.status(code).json({
          status: 'error',
          message: message,
          code: code,
          data: data
        });
      }
    };
    
    next();
  }
}

declare global {
  namespace Express {
    interface Response {
      jsend: {
        success(data?: any, status?: number): Response;
        fail(data?: any, status?: number): Response;
        error(message?: string, code?: number, data?: any): Response;
      }
    }
  }
}
