const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Server runnning.");
});

app.get("/strobbo-clock", (req, res) => {
	console.log("Headers: ", req.headers);
	const authorization = req.headers["Authorization"]?.toLowerCase() ?? ""; // eg "kiosk 1234"
	const PIN = authorization.replace("kiosk ", "");

	const baseUrl =
		"https://onlinewerkrooster.github.io/strobbo-clock/dev_otomat";

	const url = PIN ? `${baseUrl}?pin=${PIN}` : baseUrl;

	console.log(`Redirecting to: ${url}`);
	res.redirect(url);
});

app.listen(PORT, () => {
	console.log(`Server listening at port ${PORT}`);
});
