import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head />
			<body className="bg-nord_dark-300 font-jetbrains selection:bg-nord_dark-100">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
