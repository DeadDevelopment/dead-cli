import { Command } from 'commander';
import { generateLb } from '../handlers/ListButton';

export function generateListButton(program: Command) {
    program
        .command('generateListButton')
        .alias('lb')
        .description('Generate a list button component.')
        .option('-n, --name <name>', 'Name your files.', 'dead-list-button')
        .option(
            '-l, --list <list>',
            'List config as JSON.',
            value => JSON.parse(value),
            JSON.stringify([
                { classes: "m-1rem pri-dark body", text: "list item 1"},
                { classes: "m-1rem pri-dark body", text: "list item 2"},
                { classes: "m-1rem pri-dark small-text", text: "list item 3"}
            ])
        )
        .option(
            '-b, --button <button>',
            'Button as JSON.',
            value => JSON.parse(value),
            JSON.stringify({
                classes: "m-1rem button-text", label: "click me", routerLink: "/path"
            })
        )
        .option(
            '--bt, --buttontype <buttontype>',
            'JSON object as string with keys label and classes.',
            'mat-flat-button'
        )
        .action(async (options) => {
            try {
                await generateLb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
