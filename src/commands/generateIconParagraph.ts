import { Command } from 'commander';
import { generateIp } from '../handlers/IconParagraph';

export function generateIconParagraph(program: Command) {
    program
        .command('generateIconParagraph')
        .alias('ip')
        .description('Generate an IconParagraph component.')
        .option('-n, --name <name>', 'Name your files.', 'dead-icon-paragraph')
        .option(
            '-i, --icon <icon>',
            'Icon config',
            value => JSON.parse(value),
            JSON.stringify({
                ariaLabel: "Skull Icon.",
                fontIcon: "Skull",
                classes: "m-1rem body"
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
                await generateIp(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
