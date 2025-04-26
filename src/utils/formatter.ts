import prettier from 'prettier';

// export async function formatContent(content: string, parser: prettier.BuiltInParserName): Promise<string> {
//   try {
//     return prettier.format(content, {
//       parser,
//       // Optionally, add your own configuration here:
//       // tabWidth: 2,
//       // useTabs: false,
//     });
//   } catch (error) {
//     console.error('Prettier formatting failed:', error);
//     return content; // Fall back to the original content if formatting fails.
//   }
// }

export async function formatContent(content: string, parser: prettier.BuiltInParserName): Promise<string> {
  try {
    return prettier.format(content, {
      parser,
      // Trick Prettier into thinking it's a real file
      filepath: parser === 'typescript' ? 'file.ts' : undefined,
      // Optionally you can add these:
      tabWidth: 2, // or whatever your team prefers
      useTabs: false,
    });
  } catch (error) {
    console.error('Prettier formatting failed:', error);
    return content; // Fall back to original if formatting fails
  }
}

