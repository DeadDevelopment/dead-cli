import { Command } from 'commander';
import { generateTb } from '../handlers/TitleButton';

export function generateTitleButton(program: Command) {
    program
        .command('generateTitleButton')
        .alias('tb')
        .description('Generate an element containing title and button each with options.')
        .option('-n, --name <name>', 'Name of the TitleButton component.', 'dead-title-button')
        .option(
            '-t, --title <title>',
            'JSON object as string with keys text and classes.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Title", classes: "m-1rem h2 pri"
            })
        )
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
        .option('--bt, --buttontype <buttontype>', 'Ex. mat-flat-button', 'mat-flat-button')
        .action(async (options) => {
            try {
                await generateTb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
