import { Command } from "commander";
import { generateScrollS } from "../handlers/ScrollService";

export function generateScrollService(program: Command) {
    program
    .command('generateScrollService')
    .alias('scrolls')
    .description('Generate a scroll state service.')
    .option('-n, --name <name>', 'Name your files', 'dead-scroll')
    .action(async (options) => {
        try {
            await generateScrollS(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
