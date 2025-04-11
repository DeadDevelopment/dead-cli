import { Command } from "commander";
import { generatePD } from "../handlers/PhoneDirective";

export function generatePhoneDirective(program: Command) {
    program
    .command('generatePhoneDirective')
    .alias('pd')
    .description('Generate a directive that formats phone number inputs in real time.')
    .option('-n, --name <name>', 'Name your files.', 'dead-phone')
    .action(async (options) => {
        try {
            await generatePD(options);
        } catch (error: any) {
            console.error('Error generating code:', error.message);
        }
    });
}

