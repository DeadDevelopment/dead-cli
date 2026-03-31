export const ERRORS = {
    HANDLER_TRY: 'Response indicated failure or missing result.'
}

const MSGS = {
    SUCCESS: 'Done.'
}

export function sanitizeCodeString(content: string): string {
  return content
    // Break after semicolons followed by a non-whitespace character on the same line
    .replace(/;([^\n])/g, ';\n$1')
    // Break after closing braces followed by a non-whitespace character on the same line
    .replace(/\}([^\n,;)\]])/g, '}\n$1')
    // Remove excessive newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim() + '\n';
}

