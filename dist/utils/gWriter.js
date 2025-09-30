"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeGeneratedFiles = writeGeneratedFiles;
// src/utils/gWriter.ts
const fs_1 = require("fs");
const path = __importStar(require("path"));
const formatter_1 = require("./formatter");
const ui_1 = require("./ui");
async function writeGeneratedFiles(options) {
    // Test mode: do not write — capture instructions for assertions
    if (typeof global !== 'undefined' && global.__disableFileWrites__) {
        if (typeof global !== 'undefined') {
            global.__writeInstructions__ = options;
        }
        console.log(ui_1.ui.warn('[DeadCLI][TEST] File writes disabled by global.__disableFileWrites__'));
        return;
    }
    const { outputDir = './generated', baseName, files } = options;
    const containerDir = path.join(outputDir, baseName);
    await fs_1.promises.mkdir(containerDir, { recursive: true });
    let totalBytes = 0;
    let count = 0;
    for (const file of files) {
        const filePath = path.join(containerDir, file.name);
        let formattedContent = file.content;
        // Format based on type
        if (file.type === 'typescript') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'typescript');
        }
        else if (file.type === 'html') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'html');
        }
        else if (file.type === 'scss') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'scss');
        }
        await fs_1.promises.writeFile(filePath, formattedContent, 'utf8');
        const bytes = Buffer.byteLength(formattedContent, 'utf8');
        totalBytes += bytes;
        count += 1;
        // Quiet, consistent line per file (brand colors)
        console.log(`${ui_1.ui.dim('write: ')} ${ui_1.ui.label(filePath)} ${ui_1.ui.dim(`(${bytes} B)`)}`);
    }
}
//# sourceMappingURL=gWriter.js.map