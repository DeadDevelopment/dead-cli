import { Command } from 'commander';
import { generateTspb } from '../handlers/TitleSubParagraphButton';

export function generateTitleSubParagraphButton(program: Command) {
    program
        .command('generateTitleSubParagraphButton')
        .alias('tspb')
        .description('Generate an element containg a title, substatement, paragraph, and button.')
        .option(
            '-n, --name <name>',
            'Name of the TitleSubParagraphButton component.',
            'dead-title-sub-paragarph-button'
        )
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
                await generateTspb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}

