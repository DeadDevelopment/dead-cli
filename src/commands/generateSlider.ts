import { Command } from 'commander';
import { generateslider } from '../handlers/Slider';

export function generateSlider(program: Command) {
    program
    .command('generateSlider')
    .alias('slidr')
    .description('Generate a slider.')
    .option('-n, --name <name>', 'Name your files.', 'dead-slider')
    .option(
        '-s, --slider <slider>',
        'JSON config for slider',
        value => JSON.parse(value),
        JSON.stringify({
            classes: "m-1rem",
            min: "0",
            max: "100",
            step: "step",
            disabled: "!disabled",
            discrete: "discrete",
            showTicks: "false"
        })
    )
    .option(
        '-i, --inputs <inputs>',
        'JSON array config for inputs',
        value => JSON.parse(value),
        JSON.stringify([
            {
                ngModel: "inputs.value",
                classes: "pri-dark pri-lite-bg",
                thumbLabel: "matSliderThumb",
                value: "20"
            }
        ])
    )
    .action(async (options) => {
        try {
            await generateslider(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
