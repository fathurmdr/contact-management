declare namespace Express {
  interface User {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    bio: string | null;
  }

  export interface Request {
    user?: User | null;
    files?: import("formidable").Files<string>;
    error?: any;
    param: any;
  }
}
