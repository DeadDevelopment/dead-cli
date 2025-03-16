import { Command } from 'commander';
import { generateGl } from '../handlers/GridList';

export function generateGridList(program: Command) {
    program
        .command('generateGridList')
        .alias('gl')
        .description('Generate a grid list element with options.')
        .option('-n, --name <name>', 'Name of the grid list', 'dead-grid-list')
        .option('-c, --cols <cols>', 'Number of columns', '2')
        .option('-r, --rowHeight <rowHeight>', 'Row height of the grid list', '32rem')
        .option(
            '-t, --tiles <tiles>',
            'Tiles configuration as JSON',
            (value) => JSON.parse(value),
            JSON.stringify([
                { colspan: 1, rowspan: 1, content: "A" },
                { colspan: 1, rowspan: 1, content: "B" }
            ])
        )
        .action(async (options) => {
            try {
                await generateGl(options);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        });
}
