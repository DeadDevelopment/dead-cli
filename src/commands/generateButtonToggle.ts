import { Command } from 'commander';
import { generatebtog } from '../handlers/ButtonToggle';

export function generateButtonToggle(program: Command) {
    program
    .command('generateButtonToggle')
    .alias('btog')
    .description('Generate a button toggle list component.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-button-toggle'
    )
    .option(
        '-g, --group <group>',
        'Configure your group.',
        value => JSON.parse(value),
        JSON.stringify({
            ariaLabel: "List of toggles to configure.", classes: "m-1rem body", name: "toggles"
        })
    )
    .option(
        '-t, --toggles <toggles>',
        'Configure your toggles array',
        value => JSON.parse(value),
        JSON.stringify([
            {value: "1", classes: "pri pri-dark-bg", label: "Select Option 1."},
            {value: "2", classes: "pri-lite pri-dark-bg", label: "Select Option 2."}
        ])
    )
    .action(async (options) => {
        try {
            await generatebtog(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
