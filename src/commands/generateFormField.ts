import { Command } from 'commander';
import { generateFf } from '../handlers/FormField';

export function generateFormField(program: Command) {
    program
        .command('generateFormField')
        .alias('ff')
        .description('Generate form field component with options.')
        .option('-n, --name <name>', 'Name of the files.', 'dead-form-field')
        .option('--pc, --pclasses <pclasses>', 'Add classes to the containg paragraph element.', 'm-1rem')
        .option(
            '-r, --required <required>',
            'Leave blank to set require false, populate a required attribute with true otherwise.',
            'required'
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
                {placeholder: "Placeholder text.", type: "text", classes: "small-text pri-dark"}
            )
        )
        .action(async (options) => {
            try {
                await generateFf(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
