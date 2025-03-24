import { Command } from 'commander';
import { generateIc } from '../handlers/ImageCarousel';

export function generateImageCarousel(program: Command) {
    program
        .command('generateImageCarousel')
        .alias('ic')
        .description('Generate a carousel with images and controls to go through them.')
        .option('-n, --name <name>', 'Name your files.', 'dead-image-carousel')
        .option('--cc, --cClasses <cClasses>', 'Add classes to the container.', 'm-1rem size-32rem')
        .option(
            '-w, --w <w>',
            'Image wrapper config',
            value => JSON.parse(value),
            JSON.stringify({s: "100", classes: "m-1rem"})
        )
        .option(
            '-i, --imgs <imgs>',
            'Set the images for your carousel.',
            value => JSON.parse(value),
            JSON.stringify([
                {
                    "alt": "image 1",
                    "src": "https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a",
                    "classes": "m-1rem skull-logo" 
                },
                {
                    "alt": "image 2",
                    "src": "https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a",
                    "classes": "m-1rem skull-logo"
                }
            ])
        )
        .option(
            '-c, --controls <controls>',
            'carousel controls container config',
            value => JSON.parse(value),
            JSON.stringify({"bclasses": "m-0-5rem", "btype": "mat-mini-fab", "classes": "m-1rem controls"})
        )
        .option(
            '-p, --pIcon <pIcon>',
            'Config the previous image icon',
            value => JSON.parse(value),
            JSON.stringify({"ariaLabel": "Previous image chevron.", "fontIcon": "chevron_left", "classes": "previous"})
        )
        .option(
            '-n, --nIcon <nIcon>',
            'Config the next image icon',
            value => JSON.parse(value),
            JSON.stringify({"ariaLabel": "Next image chevron.", "fontIcon": "chevron_right", "classes": "next"})
        )
        .action(async (options) => {
            try {
                await generateIc(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
