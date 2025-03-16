import { Command } from 'commander';
import { generateLS } from '../handlers/LoadingSpinner';

export function generateLoadingSpinner(program: Command) {
    program
        .command('generateLoadingSpinner')
        .alias('ls')
        .description('Generate a loading spinner element with options.')
        .option('-n, --name <name>', 'Name of the loading spinner', 'dead-loading-spinner')
        .option(
            '-c, --classes <classes>',
            'string of classes.',
            'm-1rem size-32rem'
        )
        .action(async (options) => {
        try {
            await generateLS(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    })
}
