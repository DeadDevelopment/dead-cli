import { Command } from 'commander';
import { generateT } from '../handlers/Toolbar';

export function generateToolbar(program: Command) {
    program
        .command('generateToolbar')
        .alias('t')
        .description('Generate a toolbar with a logo img and button(s).')
        .option('-n, --name <name>', 'Name of the toolbar ocmponent.', 'dead-toolbar')
        .option('-s, --logosrc <logosrc>', 'Link to the logo img.', 'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a')
        .option('-a, --logoalt <logoalt>', 'Alt attribute for img.', 'Dead Development Logo.')
        .option(
        '-b, --buttons <buttons>',
        'Button(s) config as JSON',
        (value) => JSON.stringify(value),
        JSON.stringify([
            { label: "Link", routerLink: "/"},
            { label: "Link", routerLink: "/page2"}
        ])
        )
        .action(async (options) => {
            try {
                await generateT(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}   