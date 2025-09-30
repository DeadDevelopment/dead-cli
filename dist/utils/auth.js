"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdToken = getIdToken;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const axios_1 = __importDefault(require("axios"));
let cachedToken = null;
async function loadAuthConfig() {
    const p = path_1.default.join(os_1.default.homedir(), ".dead", "auth.json");
    const raw = await promises_1.default.readFile(p, "utf8");
    const cfg = JSON.parse(raw);
    const prof = cfg.profiles?.[cfg.current];
    if (!prof?.webApiKey || !prof?.refreshToken) {
        throw new Error("Missing webApiKey or refreshToken in ~/.dead/auth.json");
    }
    return prof;
}
async function exchangeRefreshForIdToken(webApiKey, refreshToken) {
    const url = `https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(webApiKey)}`;
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });
    try {
        const resp = await axios_1.default.post(url, body.toString(), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            validateStatus: () => true, // ← don't throw, let us inspect
        });
        if (resp.status !== 200) {
            // Firebase typically returns: { error: { message: "INVALID_REFRESH_TOKEN" | ... } }
            throw new Error(`SecureToken ${resp.status}: ${JSON.stringify(resp.data)}`);
        }
        const idToken = resp.data.id_token;
        const expiresInSec = parseInt(resp.data.expires_in, 10) || 3600;
        const exp = Math.floor(Date.now() / 1000) + expiresInSec;
        return { idToken, exp };
    }
    catch (e) {
        const msg = e?.message || e?.toString?.() || 'secure token exchange failed';
        throw new Error(`[auth] refresh→idToken failed: ${msg}`);
    }
}
async function getIdToken(forceRefresh = false) {
    if (!forceRefresh && cachedToken && cachedToken.exp - 60 > Math.floor(Date.now() / 1000)) {
        return cachedToken.idToken;
    }
    const { webApiKey, refreshToken } = await loadAuthConfig();
    const { idToken, exp } = await exchangeRefreshForIdToken(webApiKey, refreshToken);
    cachedToken = { idToken, exp };
    return idToken;
}
//# sourceMappingURL=auth.js.map