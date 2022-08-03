import "@frontend/styles/globals.css";
import { SessionProvider } from "next-auth/react";
//import Loading from "@frontend/components/LoadingScreen";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
