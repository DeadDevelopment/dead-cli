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
const fs_1 = require("fs");
const path = __importStar(require("path"));
const formatter_1 = require("./formatter");
async function writeGeneratedFiles(options) {
    const { outputDir = './generated', baseName, result, filenameMap } = options;
    const containerDir = path.join(outputDir, baseName);
    await fs_1.promises.mkdir(containerDir, { recursive: true });
    for (const key in result) {
        const fileName = filenameMap && filenameMap[key]
            ? filenameMap[key].replace('{name}', baseName)
            : `${baseName}.${key}`;
        const filePath = path.join(containerDir, fileName);
        let formattedContent = result[key];
        // Format the content based on file type
        if (key === 'ts') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'typescript');
        }
        else if (key === 'html') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'html');
        }
        else if (key === 'scss') {
            formattedContent = await (0, formatter_1.formatContent)(formattedContent, 'scss');
        }
        await fs_1.promises.writeFile(filePath, formattedContent, 'utf8');
        console.log(`File written: ${filePath}`);
    }
}
//# sourceMappingURL=writer.js.map