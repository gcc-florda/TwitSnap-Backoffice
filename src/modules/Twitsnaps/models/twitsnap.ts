export interface TwitsnapDetails {
  id: number;
  user: {
    name: string;
  };
  value: string;
  isBlocked: boolean;
  likesCount: number;  
  sharesCount: number; 
}
