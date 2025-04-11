import { Command } from "commander";
import { generateLS } from "../handlers/LoadingSpinner";

export function generateLoadingService(program: Command) {
    program
    .command('generateLoadingService')
    .alias('loads')
    .description('Generate a router/loading state service.')
    .option('-n, --name <name>', 'Name your files', 'dead-loading')
    .action(async (options) => {
        try {
            await generateLS(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
