import GitHubProvider from "next-auth/providers/github";
import GoogleProvder from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/github`,
		}),
		GoogleProvder({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
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
					return null;
				} else {
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.id = token.id;
			return session;
		},
	},
};
