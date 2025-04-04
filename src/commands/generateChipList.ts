import { Command } from 'commander';
import { generateChips } from '../handlers/ChipList';

export function generateChipList(program: Command) {
    program
    .command('generateChipList')
    .alias('chips')
    .description('Generate a chip list component.')
    .option('-n, --name <name>', 'Name of the files.', 'dead-chip-list')
    .option(
        '-s, --set <set>',
        'Config chipset.',
        value => JSON.parse(value),
        JSON.stringify({
            classes: "pri-lite",
            ariaLabel: "aria-label"
        })
    )
    .option(
        '-c, --chips <chips>',
        'Config chips as JSON array.',
        value => JSON.parse(value),
        JSON.stringify([
            {label: "Dead", disabled: "!disabled", classes: "m-1rem pri-dark-bg"},
            {label: "Does", disabled: "!disabled", classes: "m-1rem pri-dark-bg"},
            {label: "Work", disabled: "!disabled", classes: "m-1rem pri-dark-bg"}
        ])
    )
    .action(async (options) => {
        try {
            await generateChips(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
