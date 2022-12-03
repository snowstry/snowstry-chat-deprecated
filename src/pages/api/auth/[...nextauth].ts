import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord"

export default NextAuth({
	providers: [
		GitHubProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
		}),
	],

	secret: "secret"
});
