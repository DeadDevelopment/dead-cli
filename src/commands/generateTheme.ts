import { Command } from 'commander';
import { generateTh } from '../handlers/Theme';

export function generateTheme(program: Command) {
    program
        .command('generateTheme')
        .alias('theme')
        .description('Generate a base theme system for your application with global utilities. Add more overrides as required.')
        .option('-n, --name <name>', 'Name of your theme file.', 'deadTheme')
        .option('--hf, --headingFont <headingFont>', 'Brand/heading font declaration.', 'Nunito Sans')
        .option('--htf, --headingTypeface <headingTypeface>', 'Brand/heading typeface.', 'sans-serif')
        .option('--rf, --regularFont <regularFont>', 'Regular font declaration.', 'Nunito Sans')
        .option('--rtf, --regularTypeface <regularTypeface>', 'Brand/heading typeface.', 'sans-serif')
        .option('--rw, --regularWeight <regularWeight>', 'Default font weight declaration.', '400')
        .option('--bw, --boldWeight <boldWeight>', 'Bold font weight declaration.', '700')
        .option(
            '-c, --colors <colors>',
            'Choose 6 colors for your theme.',
            value => JSON.parse(value),
            JSON.stringify({
                primary: "#a784c2",
                primaryLight: "#f5f5f5",
                primaryDark: "#666",
                secondary: "#cf929a",
                background: "#0a0908",
                error: "#f94144",
            })
        )
        .option('-d, --density <density>', 'Set the density value, default = 0.', '0')
        .action(async (options) => {
            try {
                await generateTh(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
