import { IUser } from "../models/user.model"; // adjust the import path

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
