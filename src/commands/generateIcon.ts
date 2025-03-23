import { Command } from 'commander';
import { generateI } from '../handlers/Icon';

export function generateIcon(program: Command) {
    program
        .command('generateIcon')
        .alias('i')
        .description('Generate an Icon element.')
        .option('-n, --name <name>', 'Name your files.', 'dead-icon')
        .option('-a, --arialabel <arialabel>', 'Set the aria label for the icon.', 'Skull icon.')
        .option('-i, --fontIcon <fontIcon>', 'Choose a Material Icon by name.', 'Skull')
        .option('-c, --classes <classes>', 'Set utilities or define your own classes.', 'm-1rem body')
        .action(async (options) => {
            try {
                await generateI(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}