// Local dev URL (uncomment to force local)
// export const BASE_URL = "http://localhost:9931";

// Auto pick base URL: if running on codeally.online use that; else fallback to server IP
export const BASE_URL = (typeof window !== 'undefined' && window.location && window.location.hostname.includes('codeally.online'))
	? `${window.location.protocol}//${window.location.host}/api`
	: "https://codeally.online/api";

