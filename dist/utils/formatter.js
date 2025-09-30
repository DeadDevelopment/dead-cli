"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatContent = formatContent;
const prettier_1 = __importDefault(require("prettier"));
async function formatContent(content, parser) {
    try {
        return prettier_1.default.format(content, {
            parser,
            // Trick Prettier into thinking it's a real file
            filepath: parser === 'typescript' ? 'file.ts' : undefined,
            // Optionally you can add these:
            tabWidth: 2, // or whatever your team prefers
            useTabs: false,
        });
    }
    catch (error) {
        console.error('Prettier formatting failed:', error);
        return content; // Fall back to original if formatting fails
    }
}
//# sourceMappingURL=formatter.js.map