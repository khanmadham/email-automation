import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeOAuth } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Check for credentials in .env
if (!process.env.GMAIL_CLIENT_ID || !process.env.GMAIL_CLIENT_SECRET) {
  console.error(
    'Error: GMAIL_CLIENT_ID and GMAIL_CLIENT_SECRET must be set in .env file'
  );
  console.error('\nSetup Instructions:');
  console.error('1. Go to https://console.cloud.google.com/');
  console.error('2. Create a new project and enable Gmail API');
  console.error('3. Create OAuth 2.0 credentials (Web application)');
  console.error('4. Download the JSON file and add these to your .env file:');
  console.error('   GMAIL_CLIENT_ID=<your_client_id>');
  console.error('   GMAIL_CLIENT_SECRET=<your_client_secret>');
  console.error('   GMAIL_REDIRECT_URI=http://localhost:3000/oauth/callback');
  process.exit(1);
}

console.log('Starting Gmail OAuth 2.0 setup...');
console.log('Using credentials from .env file');

initializeOAuth().then(() => {
  console.log('\n✅ Gmail authentication successful!');
  console.log('Copy the GOOGLE_TOKEN_JSON line above into your .env file');
  process.exit(0);
});
