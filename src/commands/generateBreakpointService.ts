import { Command } from 'commander';
import { generateBps } from '../handlers/BreakPointService';

export function generateBreakpointService(program: Command) {
    program
    .command('generateBreakpointService')
    .alias('bps')
    .description('Generate a break point service that is controlled via state.')
    .option('-n, --name <name>', 'Name your service files.', 'dead-breakpoint')
    .option('-m, --mPoint <mPoint>', 'Set in px the breakpoint for mobile.', '600')
    .option('-d, --dPoint <dPoint>', 'Set in px the breakpoint for desktop.', '1100')
    .action(async (options) => {
        try {
            await generateBps(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
