declare type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  bio: string | null;
};

declare type Auth = {
  sessionId: string;
  expiresAt: number;
  user: User;
};
