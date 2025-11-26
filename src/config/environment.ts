// Detect if running from linked local dev version
// When you run `npm link`, __filename will contain your local path
const isLinkedDev = __filename.includes('dead-cli/dist/');

export const isDev = isLinkedDev;

export const config = {
  apiEndpoint: isDev
    ? 'http://127.0.0.1:5001/deadlibrary-53c38/us-central1/g'
    : 'https://deadlibrary-gw-enb9rt4.uc.gateway.dev/g'
};

// Log on startup so you know which mode you're in
if (isDev) {
  console.log('🔧 CLI DEV mode - using localhost:5001');
}