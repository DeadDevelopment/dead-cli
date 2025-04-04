import { Command } from 'commander';
import { generateexp } from '../handlers/ExpansionPanel';

export function generateExpansionPanel(program: Command) {
    program
    .command('generateExpansionPanel')
    .alias('ep')
    .description('Generate an expansion panel list component.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-expansion-panel'
    )
    .option(
        '-a, --accordian <accordian>',
        'Configure the group.',
        value => JSON.parse(value),
        JSON.stringify({
            multi: "!multi", classes: "m-1rem"
        })
    )
    .option(
        '-p, --panels <panels>',
        'Config the panels array in JSON.',
        value => JSON.parse(value),
        JSON.stringify([
            {
                panelClasses: "p-1rem",
                headerClasses: "pri-lite button-text",
                title: "Expansion Panel Title",
                titleClasses: "m-1rem body pri",
                description: "Description for the panel",
                descriptionClasses: "m-1rem",
                component: "Component"
            },
            {
                panelClasses: "p-1rem",
                headerClasses: "pri-lite button-text",
                title: "Expansion Panel Title 2",
                titleClasses: "m-1rem body pri",
                description: "Description for the panel 2",
                descriptionClasses: "m-1rem",
                component: "Component2"
            }
        ])
    )
    .action(async (options) => {
        try {
            await generateexp(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
