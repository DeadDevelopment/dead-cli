// src/utils/gWriter.ts
import { promises as fs } from 'fs'
import * as path from 'path'
import { formatContent } from './formatter'
import { ui } from './ui'

export interface NormalizedFile {
  name: string
  content: string
  type?: 'typescript' | 'html' | 'scss' // parser for prettier
}

export interface WriteFilesOptions {
  outputDir?: string
  baseName: string
  files: NormalizedFile[]
}

export async function writeGeneratedFiles(options: WriteFilesOptions): Promise<void> {
  // Test mode: do not write — capture instructions for assertions
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

    let formattedContent = file.content
    // Format based on type
    if (file.type === 'typescript') {
      formattedContent = await formatContent(formattedContent, 'typescript')
    } else if (file.type === 'html') {
      formattedContent = await formatContent(formattedContent, 'html')
    } else if (file.type === 'scss') {
      formattedContent = await formatContent(formattedContent, 'scss')
    }

    await fs.writeFile(filePath, formattedContent, 'utf8')
    const bytes = Buffer.byteLength(formattedContent, 'utf8')
    totalBytes += bytes
    count += 1

    // Quiet, consistent line per file (brand colors)
    console.log(`${ui.dim('write: ')} ${ui.label(filePath)} ${ui.dim(`(${bytes} B)`)}`)
  }
}