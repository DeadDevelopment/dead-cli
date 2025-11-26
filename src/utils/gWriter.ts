// src/utils/gWriter.ts
import { promises as fs } from 'fs'
import * as path from 'path'
import prettier from 'prettier';
import { formatContent } from './formatter'
import { ui } from './ui'
import { sanitizeCodeString } from './utils'

export interface NormalizedFile {
  name: string
  content: string
  type?: 'logic' | 'template' | 'styles' | 'test' // parser for prettier
}

export interface WriteFilesOptions {
  outputDir?: string
  baseName: string
  files: NormalizedFile[]
}

export async function writeGeneratedFiles(options: WriteFilesOptions): Promise<void> {
  // Test mode: do not write - capture instructions for assertions
  if (typeof global !== 'undefined' && (global as any).__disableFileWrites__) {
    if (typeof global !== 'undefined') {
      (global as any).__writeInstructions__ = options
    }
    console.log(ui.warn('[DeadCLI][TEST] File writes disabled by global.__disableFileWrites__'))
    return
  }

  const { outputDir = './generated', baseName, files } = options
  const containerDir = path.join(outputDir, baseName)

  await fs.mkdir(containerDir, { recursive: true })

  let totalBytes = 0
  let count = 0

  for (const file of files) {
    const filePath = path.join(containerDir, file.name)

    let fileType = file.type;
    if (!fileType) {
      if (file.name.endsWith('.ts')) fileType = 'logic';
      else if (file.name.endsWith('.spec.ts')) fileType = 'test'; // Check spec first!
      else if (file.name.endsWith('.html')) fileType = 'template';
      else if (file.name.endsWith('.scss') || file.name.endsWith('.css')) fileType = 'styles';
    }

    // 1. Sanitize raw output
    let cleanContent = sanitizeCodeString(file.content)

    // Map to parser type
    let parserType: prettier.BuiltInParserName | undefined;
    if (fileType === 'logic' || fileType === 'test') parserType = 'typescript'; // Both use typescript parser
    else if (fileType === 'template') parserType = 'angular';
    else if (fileType === 'styles') parserType = 'scss';

    // Format if we have a parser
    if (parserType) {
      cleanContent = await formatContent(cleanContent, parserType)
    }

    await fs.writeFile(filePath, cleanContent, 'utf8')
    const bytes = Buffer.byteLength(cleanContent, 'utf8')
    totalBytes += bytes
    count += 1

    console.log(`${ui.dim('write: ')} ${ui.label(filePath)} ${ui.dim(`(${bytes} B)`)}`)
  }
}