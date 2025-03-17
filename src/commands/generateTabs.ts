import { Command } from 'commander';
import { generateTs } from '../handlers/Tabs';

export function generateTabs(program: Command) {
    program
        .command('generateTabs')
        .alias('tabs')
        .description('Generate a tabs element and display child components.')
        .option('-n, --name <name>', 'Set the name of the files.', 'dead-tabs')
        .option('--gc, --groupClasses <groupClasses>', 'p-1rem')
        .option('-s, --stretchTabs <stretchTabs>', 'Set the tabs to stretchy.', 'mat-stretch-tabs="false"')
        .option('-a, --alignment <alignment>', 'Right, Left, or Center.', 'mat-align-tabs="center"')
        .option(
            '-t, --tabs <tabs>',
            'Tabs config as JSON',
            (value) => JSON.parse(value),
            JSON.stringify([
                {
                    tabLabel: "label1",
                    content: "Component1",
                    classes: "pri"
                },
                {
                    tabLabel: "label2",
                    content: "Component2",
                    classes: "pri"
                },
                {
                    tabLabel: "label3",
                    content: "Component3",
                    classes: "pri"
                },
            ])
        )
        .action(async (options) => {
            try {
                await generateTs(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });

}
