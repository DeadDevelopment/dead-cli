import { Command } from 'commander';
import { generateCl } from '../handlers/ComponentList';

export function generateComponentList(program: Command) {
    program
        .command('generateComponentList')
        .alias('cl')
        .description('Generate a component list element and pass in component class names.')
        .option('-n, --name <name>', 'Name of the component list.', 'dead-component-list')
        .option(
            '-c, --components <components>',
            'Component classes. Provide either a JSON array or a comma-separated list. ' +
            'For example: \'["Classname1", "Classname2"]\' or "Classname1, Classname2"',
            (value) => {
                // If the value starts with [ assume it's JSON
                if (value.trim().startsWith('[')) {
                    return JSON.parse(value);
                }
                // Otherwise, split by comma and trim each part
                return value.split(',').map((v) => v.trim());
            }
        )
        .action(async (options) => {
            try {
                await generateCl(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
