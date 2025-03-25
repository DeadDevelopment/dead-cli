import { Command } from 'commander';
import { generatedatep } from '../handlers/DatePicker';

export function generateDatePicker(program: Command) {
    program
    .command('generateDatePicker')
    .alias('dp')
    .description('Generate a date picker form field element.')
    .option('-n, --name <name>', 'Name your files.', 'dead-date-picker')
    .option(
        '-f, --field <field>',
        'Set the classes and appearance of the mat-form-field element.',
        value => JSON.parse(value),
        JSON.stringify(
            {appearance: "fill", classes: "button-text"}
        )
    )
    .option(
        '-l, --fieldLabel <fieldLabel>',
        'Set the label of form-field',
        value => JSON.parse(value),
        JSON.stringify(
            {text: "Label text.", classes: "pri-dark small-text"}
        )
    )
    .option(
        '-i, --input <input>',
        'Set the input element options.',
        value => JSON.parse(value),
        JSON.stringify(
            {required: "false", type: "text", classes: "small-text pri-dark"}
        )
    )
    .action(async (options) => {
        try {
            await generatedatep(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}