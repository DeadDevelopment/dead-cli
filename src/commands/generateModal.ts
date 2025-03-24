import { Command } from 'commander';
import { generatemodal } from '../handlers/Modal'

export function generateModal(program: Command) {
    program
        .command('generateModal')
        .alias('modal')
        .description('Genreate the files for a popup modal.')
        .option('-n, --name <name>', 'Name your files.', 'dead-modal')
        .option(
            '-b, --button <button>',
            'JSON config for button',
            value => JSON.parse(value),
            JSON.stringify({"label": "buttonLabel", "routerLink": "/link", "classes": "m-1rem"})
        )
        .option(
            '-m, --modal <modal>',
            'JSON config for modal popup',
            value => JSON.parse(value),
            JSON.stringify({
                "actionsClasses": "m-auto mw-16rem",
                "buttonClasses": "m-1rem button-text",
                "buttonLabel": "Let's Go",
                "buttonType": "mat-flat-button",
                "cSpeed": "100",
                "oSpeed": "200",
                "content": "CompClassName",
                "contentClasses": "m-1rem",
                "fileName": "pop-up",
                "title": "Modal Title",
                "titleClasses": "substatement m-1rem pri-dark"
            })
        )
        .action(async (options) => {
            try {
                await generatemodal(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
