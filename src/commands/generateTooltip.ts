import { Command } from 'commander';
import { generatetip } from '../handlers/Tooltip';

export function generateTooltip(program: Command) {
    program
    .command('generateTooltip')
    .alias('tip')
    .description('Generate a tooltip component.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-tooltip'
    )
    .option(
        '-b, --button <button>',
        'Configure your button.',
        value => JSON.parse(value),
        JSON.stringify(
            {label: "buttonLabel", routerLink: "/testRouterLink", classes: "m-1rem", type: "mat-flat-button"}
        )
    )
    .option(
        '-t, --tip <tip>',
        'Configure the tooltip.',
        value => JSON.parse(value),
        JSON.stringify(
            {value: "Do what thou wilt.", position: "after"}
        )
    )
    .action(async (options) => {
        try {
            await generatetip(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
