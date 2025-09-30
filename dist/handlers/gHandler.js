"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gHandler = gHandler;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const endpoints_1 = require("../utils/endpoints");
const gWriter_1 = require("../utils/gWriter");
const auth_1 = require("../utils/auth");
const ui_1 = require("../utils/ui");
const ora_1 = __importDefault(require("ora"));
async function gHandler(raw, options) {
    const start = Date.now();
    const spinner = (0, ora_1.default)('Contacting DeadLibrary API…').start();
    async function callDeadLibraryAPI(forceRefresh = false) {
        const idToken = await (0, auth_1.getIdToken)(forceRefresh);
        const payload = { raw };
        if (typeof options.ai === "string")
            payload.useAI = options.ai;
        return axios_1.default.post(endpoints_1.ENDPOINTS.g, payload, {
            headers: {
                Authorization: `Bearer ${idToken}`,
                'Content-Type': 'application/json',
            },
            validateStatus: () => true,
        });
    }
    // 1st attempt
    let resp = await callDeadLibraryAPI(false);
    // If 401, refresh token once and retry
    if (resp.status === 401) {
        console.log(ui_1.ui.warn('Status: 401, refreshing token…'));
        resp = await callDeadLibraryAPI(true);
    }
    // Log non-200 responses verbosely
    if (resp.status !== 200) {
        spinner.fail(ui_1.ui.err(`DeadLibrary API Status: ${resp.status}`));
        console.error(ui_1.ui.err(`Command syntax error.`));
        return;
    }
    // Success path
    const data = resp.data;
    spinner.succeed(ui_1.ui.ok(`DeadLibrary API Status: ${resp.status}`));
    if (data?.writeInstructions) {
        const secs = ((Date.now() - start) / 1000).toFixed(2);
        console.log(ui_1.ui.label(`Files prepared in ${secs}s`));
        await (0, gWriter_1.writeGeneratedFiles)(data.writeInstructions);
        return;
    }
    if (data?.help) {
        console.log(data.help);
        return;
    }
    spinner.fail(ui_1.ui.err(utils_1.ERRORS.HANDLER_TRY));
}
//# sourceMappingURL=gHandler.js.map