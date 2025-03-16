import { Command } from 'commander';
import { generateTsp } from '../handlers/TitleSubParagraph';

export function generateTitleSubParagraph(program: Command) {
    program
        .command('generateTitleSubParagraph')
        .alias('tsp')
        .description('Generate an element containing a title, substatement, and paragraph.')
        .option('-n, --name <name>', 'Name of the TitleSubParagraph element.', 'dead-title-sub-paragraph')
        .option(
            '-t, --title <title>',
            'Add a title option with a text and classes property each a string.',
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
            '-p, --paragraph <paragraph>',
            'Add a paragraph option with a text and classes property each a string.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Paragraph element.", classes: "m-1rem body pri-dark"
            })
        )
        .action(async (options) => {
            try {
                await generateTsp(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
