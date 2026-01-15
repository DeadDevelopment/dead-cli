import prettier from 'prettier';

export async function formatContent(content: string, parser: prettier.BuiltInParserName): Promise<string> {
  try {
    const formatted = await prettier.format(content, {
      parser,
      filepath: parser === 'typescript' ? 'file.ts' : parser === 'html' ? 'file.html' : 'file.scss',
      tabWidth: 2,
      useTabs: false,
      semi: true,
      singleQuote: true,
      printWidth: 100,
      bracketSpacing: true,
      arrowParens: 'always',
      htmlWhitespaceSensitivity: 'ignore',
    });
    console.log('prettier is done.')
    return formatted;
  } catch (error) {
    console.error(`Prettier formatting failed for parser "${parser}":`, error);
    return content; // Return unformatted on error
  }
}