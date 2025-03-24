import { Command } from 'commander';
import { generateRb } from '../handlers/RadioButton';

export async function generateRadioButton(program: Command) {
    program
        .command('generateRadioButton')
        .alias('rb')
        .description('Generate a radio button(s) component')
        .option('-n, --name <name>', 'name your files', 'dead-radio-button')
        .option(
            '-g, --radioGroup <radioGroup>',
            'JSON config for radio button group.',
            value => JSON.parse(value),
            JSON.stringify({"alabel": "aria label", "classes": "m-1rem pri-dark", "ngModel": "result"})
        )
        .option(
            '-b, --buttons <buttons>',
            'JSON config for buttons',
            value => JSON.parse(value),
            JSON.stringify([
                {"classes": "pri-lite-bg small-text", "label": "radio 1", "value": "readio1"},
                {"classes": "pri-lite-bg small-text", "label": "radio 2", "value": "readio2"}
            ])
        )
        .action(async (options) => {
            try {
                await generateRb(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
