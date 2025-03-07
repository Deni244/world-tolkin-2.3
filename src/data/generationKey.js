const crypto = require("crypto");

const ACCESS_SECRET = crypto.randomBytes(32).toString("hex");
const REFRESH_SECRET = crypto.randomBytes(32).toString("hex");

console.log({ ACCESS_SECRET, REFRESH_SECRET });