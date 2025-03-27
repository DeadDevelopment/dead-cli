import { Command } from 'commander';
import { generateC } from '../handlers/Card';

export function generateCard(program: Command) {
    program
        .command('generateCard')
        .alias('c')
        .description('Generate a card.')
        .option('-n, --name <name>', 'Name of the generated card component.', 'dead-card')
        .option('-c, --classes <classes>', 'Add utilities to the card.', 'm-1rem size-32rem')
        .option('-a, --content <content>', 'Add a child component declaration', 'child-component-name')
        .action(async (options) => {
            try {
                await generateC(options);
            } catch (error: any) {
              console.error('Error generating code:', error.message);
            }
        });
}
