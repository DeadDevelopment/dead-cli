"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
const loginHandler_1 = require("../handlers/loginHandler");
function login(program) {
    program
        .command('login')
        .description('Authenticate with DeadLibrary to access the CLI')
        .option('-e, --email <email>', 'Your email address')
        .option('-p, --password <password>', 'Your password')
        .action(async (options) => {
        try {
            await (0, loginHandler_1.loginHandler)(options);
        }
        catch (error) {
            console.error('Login failed:', error.message);
        }
    });
}
//# sourceMappingURL=login.js.map