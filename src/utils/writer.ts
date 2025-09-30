import { promises as fs } from 'fs';
import * as path from 'path';
import prettier from 'prettier';
import { formatContent } from './formatter';

export interface GenerationResult {
  [key: string]: string;
}

export interface WriteFilesOptions {
  outputDir?: string;
  baseName: string;
  result: GenerationResult;
  filenameMap?: Record<string, string>;
}

export async function writeGeneratedFiles(options: WriteFilesOptions): Promise<void> {
    const { outputDir = './generated', baseName, result, filenameMap } = options;
    const containerDir = path.join(outputDir, baseName);
    await fs.mkdir(containerDir, { recursive: true });
    
    for (const key in result) {
      const fileName = filenameMap && filenameMap[key]
        ? filenameMap[key].replace('{name}', baseName)
        : `${baseName}.${key}`;
      
      const filePath = path.join(containerDir, fileName);
  
      let formattedContent = result[key];
      // Format the content based on file type
      if (key === 'ts') {
        formattedContent = await formatContent(formattedContent, 'typescript');
      } else if (key === 'html') {
        formattedContent = await formatContent(formattedContent, 'html');
      } else if (key === 'scss') {
        formattedContent = await formatContent(formattedContent, 'scss');
      }
      
      await fs.writeFile(filePath, formattedContent, 'utf8');
      console.log(`File written: ${filePath}`);
    }
  }
