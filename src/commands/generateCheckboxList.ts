import { Command } from 'commander';
import { generatecboxes } from '../handlers/CheckboxList';

export function generateCheckboxList(program: Command) {
    program
    .command('generateCheckboxList')
    .alias('cbl')
    .description('Generate a list of checkboxes in a component.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-checkbox-list'
    )
    .option(
        '-c, --checkboxes <checkboxes>',
        'Configure your checkboxes array.',
        value => JSON.parse(value),
        JSON.stringify([
            {
                classes: "m-1rem",
                ngModel: "checked",
                indeterminate: "!indeterminate",
                labelPos: "after",
                label: "Check the box to win a prize.",
                disabled: "!disabled"
            },
            {
                classes: "m-1rem",
                ngModel: "checked",
                indeterminate: "!indeterminate",
                labelPos: "after",
                label: "Check the box to win a prize.",
                disabled: "!disabled"
            }
        ])
    )
    .action(async (options) => {
        try {
            await generatecboxes(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
