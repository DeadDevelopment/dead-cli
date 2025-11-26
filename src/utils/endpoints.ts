import { config } from '../config/environment';

export const LOCAL_BASE_URL = "http://127.0.0.1:5001/deadlibrary-53c38/us-central1/"
export const API_ENDPOINT = "https://deadlibrary-gw-enb9rt4.uc.gateway.dev/g"

export const ENDPOINTS = {
    g: config.apiEndpoint,  // Uses environment config
    gLocal: `${LOCAL_BASE_URL}g`
}