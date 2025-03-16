import { Command } from 'commander';
import { generateId } from '../handlers/ImageDiv';

export function generateImageDiv(program: Command) {
    program
        .command('generateImageDiv')
        .alias('id')
        .description('Generate an element containing a div with a background image assignment.')
        .option('-n, --name <name>', 'Name of the ImageDiv component.', 'dead-image-div')
        .option(
            '-s, --imagesrc <imagesrc>',
            'Url or file path of the background image.',
            'https://firebasestorage.googleapis.com/v0/b/deaddevelopment-95591.appspot.com/o/dead_skull.PNG?alt=media&token=1634c2ba-f3e8-49db-bfd6-0b49576cba4a'
        )
        .option(
            '-a, --imgalt <imgalt>',
            'Alt attribute for the bg img of the div.',
            'Dead Development Logo'
        )
        .option(
            '-c, --classes <classes>',
            'Classes added to the div element.',
            'm-1rem pri-lite-bg size-16rem'
        )
        .action(async (options) => {
            try {
                await generateId(options);
            } catch (error: any) {
                console.error('Error generateing code:', error.message);
            }
        });
}
