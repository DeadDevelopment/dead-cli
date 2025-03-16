import { Command } from 'commander';
import { generateMt } from '../handlers/MobileToolbar';

export function generateMobileToolbar(program: Command) {
    program
        .command('generateMobileToolbar')
        .alias('mt')
        .description('Generate a toolbar component for mobile/tablet.')
        .option('-n, --name <name>', 'Name of the files.', 'dead-mobile-toolbar')
        .option('-s, --logoSrc <logoSrc>', 'Link to the logo.', 'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a')
        .option('-a, --logoAlt <logoAlt>', 'Alt description.', 'Dead Development Logo')
        .option(
            '--mt, menuTrigger <menuTrigger>',
            'Choose your options.',
            value => JSON.parse(value),
            JSON.stringify({
                buttonType: "mat-fab", classes: "size-4rem", icon: "menu"
            })
        )
        .option(
            '-m, menu <menu>',
            'Choose your options',
            (value) => JSON.parse(value),
            JSON.stringify([
                {"label": "Link", "routerLink": "/route"},
                {"label": "Link2", "routerLink": "/route2"}
            ])
        )
        .action(async (options) => {
            try {
                await generateMt(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
