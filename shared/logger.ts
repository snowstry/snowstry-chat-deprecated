const log = (() => {
	const print = (type, ...messages) => {
		switch (type) {
			case "info":
				console.log("\x1b[32m[INFO]\x1b[0m", ...messages);
				break;
			case "warn":
				console.log("\x1b[33m[WARN]\x1b[0m", ...messages);
				break;
			case "error":
				console.log("\x1b[31m[ERROR]\x1b[0m", ...messages);
				break;
			case "trace":
				console.log("\x1b[38;5;8m[TRACE]\x1b[0m", ...messages);
				break;
			case "debug":
			default:
				if (process.env.GLACIER_DEBUG == "true") {
					console.log("\x1b[32m[DEBUG]\x1b[0m", ...messages);
				}
		}
	};

	return {
		debug: print.bind(null, "debug"),
		info: print.bind(null, "info"),
		warn: print.bind(null, "warn"),
		error: print.bind(null, "error"),
		trace: print.bind(null, "trace"),
	};
})();

export default log;
