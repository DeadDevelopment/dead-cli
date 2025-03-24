import { Command } from 'commander';
import { generateLp } from '../handlers/LazyPage';

export function generateLazyPage(program: Command) {
    program
        .command('generateLazyPage')
        .alias('lp')
        .option('-n, --name <name>', 'Name of your files.', 'dead-lazy-page')
        .option(
            '-r, --routes <routes>',
            'Routes as JSON config',
            (value) => JSON.parse(value),
            JSON.stringify([
                {
                    "component": "./component-one.component.html",
                    "mName": "ComponentOne",
                    "outlet": "yo-outlet",
                    "path": "/routepath"
                },
                {
                    "component": "./component-two.component.html",
                    "mName": "ComponentTwo",
                    "outlet": "yo-outlet-again",
                    "path": "/routepathtwo"
                }
            ])
        )
        .option(
            '-o, --outlets <outlets>',
            'JSON config of outlets for routes.',
            value => JSON.parse(value),
            JSON.stringify([
                {
                    "divClasses": "m-1rem",
                    "divId": "outlet-id",
                    "name": "yo-outlet",
                    "oClasses": "m-1rem"
                },
                {
                    "divClasses": "m-1rem",
                    "divId": "outlet-id-1",
                    "name": "yo-outlet-again",
                    "oClasses": "m-1rem"
                }
            ])
        )
        .action(async (options) => {
            try {
                await generateLp(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
