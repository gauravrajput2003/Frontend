// Dynamic base URL without env vars
// - Dev (when opening app on localhost): talk to local backend
// - Prod (served from your domain): same-origin + /api (Nginx proxies to Node)
const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
export const BASE_URL = isLocalHost
	? "http://localhost:9931"
	: `${window.location.origin}/api`;

