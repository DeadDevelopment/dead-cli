import { Command } from 'commander';
import { generateTslb } from '../handlers/TitleSubListButton';

export function generateTitleSubListButton(program: Command) {
    program
        .command('generateTitleSubListButton')
        .alias('tslb')
        .description('Generate a component with a title, substatement, list, and button')
        .option('-n, --name <name>', 'Name of the generated files.', 'dead-title-sub-list')
        .option(
            '-t, --title <title>',
            'JSON object as string with keys text and classes.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Title", classes: "m-1rem h2 pri"
            })
        )
        .option(
            '-s, --sub <sub>',
            'JSON object as string with keys text and classes.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Substatement", classes: "m-1rem button-text pri"
            })
        )
        .option(
            '-l, --list <list>',
            'List config as JSON',
            (value) => JSON.parse(value),
            JSON.stringify([
                { text: "listitem one", classes: "m-1rem body pri-dark" },
                { text: "listitem two", classes: "m-1rem body pri-dark" }
            ])
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
        .option(
            '--bt, --buttontype <buttontype>',
            'JSON object as string with keys label and classes.',
            'mat-flat-button'
        )
        .action(async (options) => {
            try {
                await generateTslb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
