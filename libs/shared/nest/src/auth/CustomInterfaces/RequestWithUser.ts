import { Request } from "@nestjs/common";

export interface RequestWithUser extends Request {
  user: {
    profileId: number
  }
}