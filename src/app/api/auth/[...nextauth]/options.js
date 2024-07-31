import GitHubProvider from "next-auth/providers/github";
import GoogleProvder from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvder({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "user@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "********",
				},
			},
			async authorize(credentials, req) {
				// This is where you would add your own authentication logic
				// to verify credentials and return a user object if they are valid.
				// Docs: https://next-auth.js.org/configuration/providers/credentials
				const user = {
					id: 1,
					password: "password",
					email: "peterfaretra@yahoo.co.uk",
				};

				if (
					credentials?.email === user.email &&
					credentials?.password === user.password
				) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
};
