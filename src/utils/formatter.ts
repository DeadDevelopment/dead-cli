import prettier from 'prettier';

export async function formatContent(content: string, parser: prettier.BuiltInParserName): Promise<string> {
  try {
    return prettier.format(content, {
      parser,
      // Optionally, add your own configuration here:
      // tabWidth: 2,
      // useTabs: false,
    });
  } catch (error) {
    console.error('Prettier formatting failed:', error);
    return content; // Fall back to the original content if formatting fails.
  }
}
