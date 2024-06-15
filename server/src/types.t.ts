import { UserDocument } from "@models/user.model";

declare global {
  namespace Express {
    interface Request {
      session?: UserDocument;
      fileName?: string;
    }
  }
}
