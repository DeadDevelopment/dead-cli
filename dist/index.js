#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const g_1 = require("./commands/g");
const login_1 = require("./commands/login");
const ui_1 = require("./utils/ui");
const program = new commander_1.Command();
program
    .name('dead')
    .description('DeadLibrary CLI by Dead Development LLC.')
    .version('1.0.0')
    .showSuggestionAfterError(true)
    .showHelpAfterError(ui_1.ui.label('\nTip: run `dead g -h` for generator usage.\n'));
program.configureOutput({
    writeOut: (s) => process.stdout.write(s),
    writeErr: (s) => process.stderr.write(chalk_1.default.red(s)),
    outputError: (s, write) => write(chalk_1.default.red(s)),
});
(0, g_1.g)(program);
(0, login_1.login)(program);
program.parse(process.argv);
//# sourceMappingURL=index.js.map