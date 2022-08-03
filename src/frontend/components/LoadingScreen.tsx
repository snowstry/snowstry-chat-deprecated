import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Loading() {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const handleStart = (url) => url !== router.asPath && setLoading(true);
		const handleComplete = (url) =>
			url === router.asPath && setLoading(false);

		router.events.on("routeChangeStart", handleStart);
		router.events.on("routeChangeComplete", handleComplete);
		router.events.on("routeChangeError", handleComplete);

		return () => {
			router.events.off("routeChangeStart", handleStart);
			router.events.off("routeChangeComplete", handleComplete);
			router.events.off("routeChangeError", handleComplete);
		};
	});

	return (
		loading && (
			<div className="grid place-items-center h-screen bg-nord_blue-300 text-nord_light-300 overflow-hidden">
				<div className="animate-pulse">Loading</div>
			</div>
		)
	);
}

export default Loading;
