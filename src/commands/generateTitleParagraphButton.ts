import { Command } from 'commander';
import { generateTpb } from '../handlers/TitleParagraphButton';

export function generateTitleParagraphButton(program: Command) {
    program
        .command('generateTitleParagraphButton')
        .alias('tpb')
        .description('Generate an element containing a title, paragraph, and button.')
        .option(
            '-n, --name <name>',
            'Name of the TitleParagraphButton component.',
            'dead-title-paragarph-button'
        )
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
                await generateTpb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}

