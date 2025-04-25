import { Command } from 'commander';
import { generateAppC } from '../handlers/AppConfig';

export function generateAppConfig(program: Command) {
    program
    .command('generateAppConfig')
    .alias('ac')
    .description('Generate an app.component file set with main.ts.')
    .option(
        '-a, --app <app>',
        'Configure root level values of your website.',
        (value) => JSON.parse(value),
        JSON.stringify({
            title: "DeadApp",
            isLoadingName: "Loading",
            isLoadingPath: `./services/Loading.service`,
            breakPName: "BreakPoint",
            breakPPath: `./services/BreakPoint.service`,
        })
    )
    .option(
        '-d, --desktop <desktop>',
        'Declare the nav/footer components for desktop viewports.',
        (value) => JSON.parse(value),
        JSON.stringify({
            nav: "DNav",
            footer: "DFooter"
        })
    )
    .option(
        '--md, --medium <medium>',
        'Declare the nav/footer components for medium viewports.',
        (value) => JSON.parse(value),
        JSON.stringify({
            nav: "MDNav",
            footer: "MDFooter"
        })
    )
    .option(
        '-m, --mobile <mobile>',
        'Declare the nav/footer components for mobile viewports.',
        (value) => JSON.parse(value),
        JSON.stringify({
            nav: "MNav",
            footer: "MFooter"
        })
    )
    .option(
        '-r, --routes <routes>',
        'Configure an array of route objects.',
        (value) => JSON.parse(value),
        JSON.stringify([
            {
                "component": "Home",
                "path": ` `,
                "child": "HomeRoutes",
                "childImport": `./components/home/home.routes`,
            },
            {
                "component": "Services",
                "path": `services`,
                "child": "ServicesRoutes",
                "childImport": `./components/services/services.routes`,
            }
        ])
    )
    .action(async (options) => {
        try {
            await generateAppC(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}
