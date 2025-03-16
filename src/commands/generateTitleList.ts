import { Command } from 'commander';
import { generateTl } from '../handlers/TitleList';

export function generateTitleList(program: Command) {
    program
        .command('generateTitleList')
        .alias('tl')
        .description('Generate a component with a title and list of p elements.')
        .option('-n, --name <name>', 'Name of the generated files.', 'dead-title-list')
        .option(
            '-t, --title <title>',
            'JSON object as string with keys text and classes.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Title", classes: "m-1rem h2 pri"
            })
        )
        .option(
            '-l, --list <list>',
            'List config as JSON',
            (value) => JSON.parse(value),
            JSON.stringify([
                { text: "listitem one", classes: "m-1rem body pri" },
                { text: "listitem two", classes: "m-1rem body pri-dark" }
            ])
        )
        .action(async (options) => {
            try {
                await generateTl(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
