import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import { compare } from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	pages: {
		signIn: "/login",
	},
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password,
				);

				if (!isPasswordValid) {
					return null;
				}

				return {
					id: `${user.id}`,
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
			// If the user signed in from the homepage, redirect to `/dashboard`
			if (url === `${baseUrl}/`) {
				return `${baseUrl}/dashboard`;
			}

			// Default redirect to base URL if none of the above conditions match
			return baseUrl;
		},
		session: ({ session, token }) => {
			console.log("Session Callback", { session, token });
			return {
				...session,
				user: {
					...session.user,
					id: token.sub,
				},
			};
		},
		jwt: ({ token, user }) => {
			console.log("JWT Callback", { token, user });
			if (user) {
				const u = user as unknown as User;
				return {
					...token,
					id: u.id,
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
