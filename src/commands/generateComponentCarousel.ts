import { Command } from 'commander';
import { generateCCarousel } from '../handlers/ComponentCarousel';

export function generateComponentCarousel(program: Command) {
    program
    .command('generateComponentCarousel')
    .alias('cc')
    .description('Generate a componenet carousel component.')
    .option('-n, --name <name>', 'Name your files.', 'dead-component-carousel')
    .option(
        '-r, --carousel',
        'Config the carousel',
        value => JSON.parse(value),
        JSON.stringify({classes: "m-1rem", seconds: "0.3"})
    )
    .option(
        '-c, --components <components>',
        'Array of component class names',
        value => JSON.parse(value),
        JSON.stringify(
            [
                {fileName: "COne"},
                {fileName: "CTwo"},
                {fileName: "CThree"}
            ]
        )
    )
    .option(
        '-o, --controls <controls>',
        'Controls config json obj.',
        value => JSON.parse(value),
        JSON.stringify({
            bType: "mat-flat-button", classes: "button-text"
        })
    )
    .option(
        '-p, --pIcon <pIcon>',
        'Previous icon button config.',
        value => JSON.parse(value),
        JSON.stringify({
            ariaLabel: "Icon name.", fontIcon: "arrow_left", classes: "pri m-1rem"
        })
    )
    .option(
        '--ni, --nIcon <nIcon>',
        'Next icon button config.',
        value => JSON.parse(value),
        JSON.stringify({
            ariaLabel: "Icon name.", fontIcon: "arrow_right", classes: "pri m-1rem"
        })
    )
    .action(async (options) => {
        try {
            await generateCCarousel(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
