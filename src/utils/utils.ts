export const ERRORS = {
    HANDLER_TRY: 'Response indicated failure or missing result.'
}

export const MSGS = {
    SUCCESS: 'Done.'
}

export function sanitizeCodeString(content: string): string {
  return content
    // Remove all leading whitespace from every line
    .split('\n')
    .map(line => line.trimStart())
    .join('\n')
    // Remove excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    // Trim and ensure single trailing newline
    .trim() + '\n';
}

