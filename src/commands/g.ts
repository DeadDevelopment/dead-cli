import { Command } from 'commander'
import { gHandler } from '../handlers/gHandler'

export function g(program: Command) {
    program
        .command('g')
        .description('Send a DeadCLI command to access DeadLibrary.')
        .argument("<raw>", "Command string.")
        .action(async (raw) => {
            try {
                await gHandler(raw);
            } catch (error: any) {
                console.error('Error generating code:', error.message);
            }
        })
}
