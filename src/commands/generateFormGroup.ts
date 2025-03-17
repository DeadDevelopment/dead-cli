import { Command } from 'commander';
import { generateFg } from '../handlers/FormGroup';

export function generateFormGroup(program: Command) {
    program
        .command('generateFormGroup')
        .alias('fg')
        .description('Generat a form group of multiple fields.')
        .option('-n, --name <name>', 'Name of your files.', 'dead-form-group')
        .option('-g, --groupName <groupName>', 'Name of your form group.', 'form')
        .option(
            '-f, --formGroup <formGroup>',
            'JSON config of form group.',
            value => JSON.parse(value),
            JSON.stringify([
                {
                    fieldAppearance: "outline",
                    fieldClasses: "m-1rem",
                    fieldLabel: "fieldLabel",
                    fieldLabelClasses: "small-text",
                    inputPlaceholder: "Placeholder",
                    inputClasses: "p-1rem",
                    inputType: "text",
                    controlName: "controlName",
                    required: ""
                }
            ])
        )
        .action(async (options) => {
            try {
                await generateFg(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}   
