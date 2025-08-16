// For local development
//export const BASE_URL = "http://localhost:9931/api";

// For production (deployed)
//export const BASE_URL = "/api";
export const BASE_URL=location.hostname==="localhost"?"http://localhost:9931/api":"/api";




