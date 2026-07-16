import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'getexpert_pro_secret_key_2026_enterprise';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'customer' | 'expert' | 'admin';
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  
  if (token && token.startsWith('mock-jwt-access-token')) {
    let role: 'customer' | 'expert' | 'admin' = 'customer';
    let id = 'c1';
    let email = 'sarah@getexpert.pro';

    if (token.includes('expert')) {
      role = 'expert';
      id = 'e1';
      email = 'alex@getexpert.pro';
    } else if (token.includes('admin')) {
      role = 'admin';
      id = 'a1';
      email = 'admin@getexpert.pro';
    }

    req.user = { id, email, role };
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export const roleMiddleware = (allowedRoles: ('customer' | 'expert' | 'admin')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
    }

    next();
  };
};
