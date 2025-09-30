"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = g;
const gHandler_1 = require("../handlers/gHandler");
function g(program) {
    program
        .command('g')
        .description('Send a DeadLibrary CLI command to generate code with DeadLibrary API. ex: dead g "b -n MyButton -b [{\"label\":\"My Button\",\"type\":\"mat-flat-button\"}]"')
        .argument("<raw>", "Command string.")
        .option("--ai <string>", "Enable AI-assisted parsing by entering the shorthand name of the DeadLibrary CLI command you want to use.")
        .action(async (raw, options) => {
        try {
            await (0, gHandler_1.gHandler)(raw, options);
        }
        catch (error) {
            console.error('Error generating code:', error.message);
        }
    });
}
//# sourceMappingURL=g.js.map