declare namespace Express {
  interface User {
      email: string;
      password: string;
  }
  export interface Request {
    user?: User | undefined;
  }
}