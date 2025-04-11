import { Command } from 'commander';
import { generateTCM } from '../handlers/ThemeChangerMenu';

export function generateThemeChangerMenu(program: Command) {
    program
    .command('generateThemeChangerMenu')
    .alias('thcm')
    .description('Generate a component that contains a menu that injects the themechanger service to change themes.')
    .option('-n, --name <name>', 'Name your files.', 'dead-theme-changer-menu')
    .option(
        '--mt, menuTrigger <menuTrigger>',
        'Choose your options.',
        (value) => JSON.parse(value),
        JSON.stringify({
            buttonType: "mat-fab", classes: "size-4rem", icon: "menu"
        })
    )
    .option(
        '-m, menuItems <menuItems>',
        'Choose your options.',
        (value) => JSON.stringify(value),
        JSON.stringify([
            {label: "Dead Theme"},
            {label: "Light Theme"}
        ])
    )
    .option(
        '-t, --themes <themes>',
        'Choose your options.',
        (value) => JSON.parse(value),
        JSON.stringify([
            {
                themeName: "DarkMode",
                primary: "#1E88E5",
                primaryLight: "#6AB7FF",
                primaryDark: "#005CB2",
                secondary: "#FF7043",
                error: "#EF5350",
                background: "#121212"
            },
            {
                themeName: "LightMode",
                primary: "#1976D2",
                primaryLight: "#63A4FF",
                primaryDark: "#004BA0",
                secondary: "#FF8A65",
                error: "#D32F2F",
                background: "#FFFFFF"
            }
        ])
    )
    .option(
        '-s, --themeService <themeService>',
        'Choose your options',
        (value) => JSON.parse(value),
        JSON.stringify({
            name: "ThemeChanger",
            path: "../../services/ThemeChanger.service"
        })
    )
    .action(async (options) => {
        try {
            await generateTCM(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}