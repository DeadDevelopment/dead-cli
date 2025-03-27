import { Command } from 'commander';
import { generatedivider } from '../handlers/Divider';

export function generateDivider(program: Command) {
    program
    .command('generateDivider')
    .alias('d')
    .description('Generate a divider component.')
    .option('-n, --name <name>', 'Name of the files.', 'dead-divider')
    .option('-o, --orientation <orientation>', 'Vertical true/false', 'false')
    .option('-c, --classes <classes>', 'Set classes', 'm-1rem pri')
    .action(async (options) => {
        try {
            await generatedivider(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}

