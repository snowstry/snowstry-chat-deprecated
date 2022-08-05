import "@frontend/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import { useRouter } from "next/router";
import { useEffect } from "react";

import NProgress from "nprogress";
import "@frontend/styles/nprogress.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	const router = useRouter();
	NProgress.configure({ showSpinner: false });

	useEffect(() => {
		router.events.on("routeChangeStart", () => NProgress.start());
		router.events.on("routeChangeComplete", () => NProgress.done());
		router.events.on("routeChangeError", () => NProgress.done());
	}, [router.events]);

	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
