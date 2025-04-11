import { Command } from "commander";
import { generateThC } from "../handlers/ThemeChangerService";

export function generateThemeChangerService(program: Command) {
    program
    .command('generateThemeChangerService')
    .alias('thcs')
    .description('Generate a theme changer service.')
    .option('-n, --name <name>', 'Name your files', 'dead-theme-changer')
    .option('-d, --defaultThemeName <defaultThemeName>', 'Set the default theme.', 'dead-theme')
    .action(async (options) => {
        try {
            await generateThC(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
