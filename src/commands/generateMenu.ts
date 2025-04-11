import { Command } from 'commander';
import { generateM } from '../handlers/Menu';

export function generateMenu(program: Command) {
    program
        .command('generateMenu')
        .alias('m')
        .description('Generate a menu element.')
        .option('-n, --name <name>', 'Name of the files.', 'dead-menu')
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
            (value) => JSON.stringify(value),
            JSON.stringify([
                {label: "Link", routerLink: "/route"},
                {label: "Link2", routerLink: "/route2"}
            ])
        )
        .action(async (options) => {
            try {
                await generateM(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}

