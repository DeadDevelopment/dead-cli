import { Command } from 'commander';
import { generatesiden } from '../handlers/SideNav';

export function generateSideNav(program: Command) {
    program
    .command('generateSideNav')
    .alias('sn')
    .description('Generate a side nav component.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-side-nav'
    )
    .option(
        '--dc, --drawerContainer <drawerContainer>',
        'config the container.',
        value => JSON.parse(value),
        JSON.stringify({
            autoSize: "!auto", classes: "p-1rem"
        })
    )
    .option(
        '-d, --drawer <drawer>',
        'config the drawer.',
        value => JSON.parse(value),
        JSON.stringify({
            classes: "p-1rem", mode: "side"
        })
    )
    .option(
        '-t, --trigger <trigger>',
        'config the trigger button.',
        value => JSON.parse(value),
        JSON.stringify({
            label: "Menu", classes: "m-1rem button-text pri-dark-bg pri", bType: "mat-flat-button"
        })
    )
    .option(
        '-c, --component <component>',
        'config the component.',
        value => JSON.parse(value),
        JSON.stringify({
            className: "Nav", classes: "p-1rem"
        })
    )
    .action(async (options) => {
        try {
            await generatesiden(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
