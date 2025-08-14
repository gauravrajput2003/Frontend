// For local development
//export const BASE_URL = "http://localhost:9931";

// For production (deployed)
export const BASE_URL = import.meta.env.PROD 
  ? "https://codeally.online/api" 
  : "http://localhost:9931/api";


