import { Command } from 'commander';
import { generateB } from '../handlers/Button';

export function generateButton(program: Command) {
    program
        .command('generateButton')
        .alias('b')
        .description('Generate a button element contained in a component.')
        .option('-n, --name <name>', 'Name your files.', 'dead-button')
        .option(
            '-b, --button <button>',
            'JSON object as string with keys text and classes.',
            value => JSON.parse(value),
            JSON.stringify({
                label: "label",
                routerLink: "/link",
                classes: "m-1rem button-text"
            })
        )
        .option(
            '--bt, --buttontype <buttontype>',
            'JSON object as string with keys label and classes.',
            'mat-flat-button'
        )
        .action(async (options) => {
            try {
                await generateB(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
