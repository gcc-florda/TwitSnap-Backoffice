import { UserVerification } from "./userVerification";

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  location: string;
  isAdmin: boolean;
  isBlocked: boolean;
  followersCount: number;
  followingCount: number;
  isVerified: boolean;
  verification: UserVerification
}
