"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = loginHandler;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const prompts_1 = __importDefault(require("prompts"));
const ui_1 = require("../utils/ui");
const firebaseConfig = {
    apiKey: "AIzaSyAUcSW-cPMiM3_iwhTEnDyEQCVo-9MhEzM",
    authDomain: "deadlibrary-53c38.firebaseapp.com",
    projectId: "deadlibrary-53c38",
};
async function loginHandler(options) {
    const app = (0, app_1.initializeApp)(firebaseConfig);
    const auth = (0, auth_1.getAuth)(app);
    auth.tenantId = process.env.CLI_TENANT_ID || "DeadLibraryCLI-jbnyb";
    let email = options.email;
    let password = options.password;
    // Prompt for missing credentials
    if (!email || !password) {
        const questions = [];
        if (!email) {
            questions.push({
                type: 'text',
                name: 'email',
                message: 'Email address:'
            });
        }
        if (!password) {
            questions.push({
                type: 'password',
                name: 'password',
                message: 'Password:'
            });
        }
        const response = await (0, prompts_1.default)(questions);
        email = email || response.email;
        password = password || response.password;
    }
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const userCredential = await (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
        const refreshToken = userCredential.user.refreshToken;
        // Save auth config...
        const authConfig = {
            profiles: {
                default: {
                    projectId: "deadlibrary-53c38",
                    webApiKey: firebaseConfig.apiKey,
                    refreshToken: refreshToken
                }
            },
            current: "default"
        };
        const deadDir = path_1.default.join(os_1.default.homedir(), '.dead');
        await promises_1.default.mkdir(deadDir, { recursive: true });
        await promises_1.default.writeFile(path_1.default.join(deadDir, 'auth.json'), JSON.stringify(authConfig, null, 2));
        console.log(ui_1.ui.ok('Login successful! You can now use DeadLibrary CLI.'));
    }
    catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
}
//# sourceMappingURL=loginHandler.js.map