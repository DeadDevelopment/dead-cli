import { Command } from 'commander';
import { generateTsl } from '../handlers/TitleSubList';

export function generateTitleSubList(program: Command) {
    program
        .command('generateTitleSubList')
        .alias('tsl')
        .description('Generate a component with a title, substatement, and list.')
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
        .action(async (options) => {
            try {
                await generateTsl(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
