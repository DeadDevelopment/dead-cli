import { Command } from 'commander';
import { generatebuttonbadge } from '../handlers/ButtonBadge';

export function generateButtonBadge(program: Command) {
    program
    .command('generateButtonBadge')
    .alias('bb')
    .description('Generate a button with a badge/alert.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-button-badge'
    )
    .option(
        '-b, --button <button>',
        'Button as JSON.',
        value => JSON.parse(value),
        JSON.stringify({
            classes: "m-1rem button-text", label: "click me", routerLink: "/path", type: "mat-flat-button"
        })
    )
    .option(
        '-v, --value <value>',
        'Set the value of value',
        "2"
    )
    .option(
        '-p, --position <position>',
        'Set the value of position',
        "before"
    )
    .option(
        '-o, --overlap <overlap>',
        'Set the value of overlap',
        "false"
    )
    .option(
        '-s, --size <size>',
        'Set the value of size',
        "large"
    )
    .action(async (options) => {
        try {
            await generatebuttonbadge(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}

