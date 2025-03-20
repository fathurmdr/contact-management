declare type User = {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	bio: string | null;
};

declare type Auth = {
	sessionId: session.id;
	expiresAt: session.expires_at;
	user: User;
};
