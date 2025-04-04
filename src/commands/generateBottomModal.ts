import { Command } from 'commander';
import { generatebottommodal } from '../handlers/BottomModal';

export function generateBottomModal(program: Command) {
    program
    .command('generateBottomModal')
    .alias('bm')
    .description('Generate a bottom sheet/modal component with a button trigger.')
    .option(
        '-n, --name <name>',
        'Name your files',
        'dead-bottom-modal'
    )
    .option(
        '-t, --trigger <trigger>',
        'Configure the button that triggers the modal.',
        value => JSON.parse(value),
        JSON.stringify({
            label: "Trigger Label", bType: "mat-flat-button", classes: "button-text m-1rem"
        })
    )
    .option(
        '-m, --modal <modal>',
        'Configure the modal.',
        value => JSON.parse(value),
        JSON.stringify({
            component: "CName",
            bType: "mat-raised-button",
            bClasses: "button-text",
            bLabel: "Close",
            fileName: "payment"
        })
    )
    .action(async (options) => {
        try {
            await generatebottommodal(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
