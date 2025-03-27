import { Command } from 'commander';
import { generateS } from '../handlers/Select';

export function generateSelect(program: Command) {
    program
        .command('generateSelect')
        .alias('s')
        .description('Generate a select component.')
        .option('-n, --name <name>', 'Name your files.', 'dead-select')
        .option(
            '-f, --field <field>',
            'JSON field config',
            value => JSON.parse(value),
            JSON.stringify({appearance: "outline", classes: "m-1rem", required: "required"})
        )
        .option(
            '-s, --select <select>',
            'JSON select config',
            value => JSON.parse(value),
            JSON.stringify({lClasses: "pri", label: "Select an option"})
        )
        .option (
            '-o, --options <options>',
            'JSON array of options',
            value => JSON.parse(value),
            JSON.stringify([
                {label: "Option 1", value: "option1"},
                {label: "Option 2", value: "option2"},
                {label: "Option 3", value: "option3"},
                {label: "Option 4", value: "option4"}
            ])
        )
        .action(async (options) => {
            try {
                await generateS(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
