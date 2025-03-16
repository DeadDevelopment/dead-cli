import { Command } from "commander";
import { generateTp } from "../handlers/TitleParagraph";

export function generateTitleParagraph(program: Command) {
    program
        .command('generateTitleParagraph')
        .alias('tp')
        .description('Generate an element containing a title and a paragraph with classes.')
        .option('-n, --name <name>', 'Name of your TitleParagraph component')
        .option(
            '-t, --title <title>',
            'Add a title option with a text and classes property each a string.',
            value => JSON.parse(value),
            JSON.stringify({
                text: "Title", classes: "m-1rem h2 pri"
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
                await generateTp(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
