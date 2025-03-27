import { Command } from 'commander';
import { generateLbar } from '../handlers/LoadingBar';

export function generateLoadingBar(program: Command) {
    program
        .command('generateLoadingBar')
        .alias('lbar')
        .description('Generate a loading bar component.')
        .option('-n, --name <name>', 'Name your files.', 'dead-loading-bar')
        .option('-m, --mode <mode>', 'Set the mode of the loading bar.', 'buffer')
        .option('-c, --classes <classes>', 'Set the classes for your loading bar.', 'top center')
        .action(async (options) => {
            try {
                await generateLbar(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
