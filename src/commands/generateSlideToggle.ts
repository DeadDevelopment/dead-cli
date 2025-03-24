import { Command } from 'commander';
import { generateSt } from '../handlers/SlideToggle';

export function generateSlideToggle(program: Command) {
    program
        .command('generateSlideToggle')
        .alias('st')
        .description('Generate a slide toggle component')
        .option('-n, --name <name>', 'Name your files.', 'dead-slide-toggle')
        .option('-c, --classes <classes>', 'Set classes.', "m-1rem")
        .option('-v, --value <value>', 'Set the value to be toggled.', "isDead")
        .option('-l, --label <label>', 'Set the label for the toggle', "Are you Dead?")
        .action(async (options) => {
            try {
                await generateSt(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
