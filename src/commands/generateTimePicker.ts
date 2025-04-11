import { Command } from 'commander';
import { generatetimep } from '../handlers/TimePicker';

export function generateTimePicker(program: Command) {
    program
    .command('generateTimePicker')
    .alias('timep')
    .description('Generate a time picker input command.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-time-picker'
    )
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
            {
                classes: "button-text", iconPlacement: "suffix", placeholder: "Our Hours: 8AM-4PM" 
            }
        )
    )
    .action(async (options) => {
        try {
            await generatetimep(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
