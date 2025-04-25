import { Command } from 'commander';
import { generateautocomplete } from '../handlers/Autocomplete';

export function generateAutocomplete(program: Command) {
    program
    .command('generateAutocomplete')
    .alias('auto')
    .description('Generate an input with an array of autocomplete options.')
    .option(
        '-n, --name <name>',
        'Name your files.',
        'dead-autocomplete'
    )
    .option(
        '-f, --field <field>',
        'Set the classes and appearance of the mat-form-field element.',
        (value) => JSON.parse(value),
        JSON.stringify(
            {appearance: "fill", classes: "button-text"}
        )
    )
    .option(
        '-l, --fieldLabel <fieldLabel>',
        'Set the label of form-field',
        (value) => JSON.parse(value),
        JSON.stringify(
            {text: "Label text.", classes: "pri-dark small-text"}
        )
    )
    .option(
        '-i, --input <input>',
        'Set the input element options.',
        (value) => JSON.parse(value),
        JSON.stringify(
            {
                placeholder: "Placeholder text.", 
                type: "text", 
                classes: "small-text pri-dark",
                required: "!required"
            }
        )
    )
    .option(
        '-a, --autocompletes <autocompletes>',
        'Configure the autocomplete options array.',
        (value) => JSON.parse(value),
        JSON.stringify([
            {value: "1", label: "Option 1", classes: "pri small-text"},
            {value: "2", label: "Option 2", classes: "pri small-text"}
        ])
    )
    .action(async (options) => {
        try {
            await generateautocomplete(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
