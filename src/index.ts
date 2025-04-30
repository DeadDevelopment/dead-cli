#!/usr/bin/env node
import { Command } from "commander";
import { g } from "./commands/g";

const program = new Command();

program
    .name('dead')
    .description('Command line interface for DeadLibrary.')
    .version('2.0.0')

g(program);

program.parse(process.argv);
