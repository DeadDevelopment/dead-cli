import { promises as fs } from 'fs';
import * as path from 'path';
import prettier from 'prettier';
import { formatContent } from './formatter';

export interface NormalizedFile {
  name: string;
  content: string;
  type?: 'typescript' | 'html' | 'scss'; // parser for prettier
}

export interface WriteFilesOptions {
  outputDir?: string;
  baseName: string;
  files: NormalizedFile[];
}

export async function writeGeneratedFiles(options: WriteFilesOptions): Promise<void> {
  const { outputDir = './generated', baseName, files } = options;
  const containerDir = path.join(outputDir, baseName);

  await fs.mkdir(containerDir, { recursive: true });

  for (const file of files) {
    const filePath = path.join(containerDir, file.name);

    let formattedContent = file.content;

    // Format based on type
    if (file.type === 'typescript') {
      formattedContent = await formatContent(formattedContent, 'typescript');
    } else if (file.type === 'html') {
      formattedContent = await formatContent(formattedContent, 'html');
    } else if (file.type === 'scss') {
      formattedContent = await formatContent(formattedContent, 'scss');
    }

    await fs.writeFile(filePath, formattedContent, 'utf8');
    console.log(`File written: ${filePath}`);
  }
}
