import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		},)
	],
});
