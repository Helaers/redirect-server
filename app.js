const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server runnning.");
});

app.get("/strobbo-clock/:tenant", (req, res) => {
  // Example: authorization: Kiosk 1234
  const authorization = req.headers["authorization"]?.toLowerCase() ?? "";
  const tenant = req.params.tenant;

  if (!tenant) {
    console.error("No tenant found.");
  }

  if (!authorization) {
    console.warn("No authorization header found.");
  }

  const PIN = authorization.replace("kiosk ", "");

  const baseUrl = `https://onlinewerkrooster.github.io/strobbo-clock/${tenant}`;

  const url = PIN ? `${baseUrl}?pin=${PIN}` : baseUrl;

  console.log(`Redirecting to: ${url}`);
  res.redirect(url);
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
