#!/usr/bin/env node
import { Command } from "commander";
import { generateGridList } from './commands/generateGridList';
import { generateCard } from './commands/generateCard';
import { generateLoadingSpinner } from "./commands/generateLoadingSpinner";
import { generateToolbar } from "./commands/generateToolbar";
import { generateTitleParagraph } from "./commands/generateTitleParagraph";
import { generateComponentList } from "./commands/generateComponentList";
import { generateImageDiv } from './commands/generateImageDiv';
import { generateTitleButton } from "./commands/generateTitleButton";
import { generateTitleList } from "./commands/generateTitleList";
import { generateTitleSubList } from "./commands/generateTitleSubList";
import { generateTitleSubListButton } from "./commands/generateTitleSubListButton";
import { generateTitleSubParagraph } from "./commands/generateTitleSubParagraph";
import { generateTitleSubParagraphButton } from "./commands/generateTitleSubParagraphButton";
import { generateTitleParagraphButton } from "./commands/generateTitleParagraphButton";
import { generateTheme } from "./commands/generateTheme";
import { generateButton } from "./commands/generateButton";
import { generateFormField } from "./commands/generateFormField";
import { generateMobileToolbar } from "./commands/generateMobileToolbar";
import { generateMenu } from "./commands/generateMenu";
import { generateFormGroup } from "./commands/generateFormGroup";
import { generateTabs } from "./commands/generateTabs";

const program = new Command();

program
    .name('dead')
    .description('Command line interface for DeadLibrary.')
    .version('1.21.0')

generateButton(program);
generateCard(program);
generateComponentList(program);
generateFormField(program);
generateFormGroup(program);
generateGridList(program);
generateImageDiv(program);
generateLoadingSpinner(program);
generateMobileToolbar(program);
generateMenu(program);
generateTabs(program);
generateToolbar(program);
generateTitleParagraph(program);
generateTitleSubParagraphButton(program);
generateTitleButton(program);
generateTitleList(program);
generateTitleSubList(program);
generateTitleSubListButton(program);
generateTitleSubParagraph(program);
generateTitleParagraphButton(program);
generateTheme(program);


program.parse(process.argv);
