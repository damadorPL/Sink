// Ensure wrangler.jsonc contains the required KV namespace id.
// Enforces that "id" equals the required value, and if "preview_id" is present it must match too.

const fs = require('fs');
const path = 'wrangler.jsonc';
const requiredId = '552ee2a57c7b45d2b0a279ff8a33fae9';

try {
  const text = fs.readFileSync(path, 'utf8');

  const idPattern = new RegExp(`["']id["']\\s*:\\s*["']${requiredId}["']`);
  const previewPattern = new RegExp(`["']preview_id["']\\s*:\\s*["']${requiredId}["']`);
  const previewPresent = /["']preview_id["']\s*:/.test(text);

  const hasId = idPattern.test(text);
  const hasPreviewId = previewPattern.test(text);

  if (!hasId) {
    console.error(`ERROR: wrangler.jsonc does not contain the required KV namespace id "${requiredId}" for the \"id\" field.`);
    console.error('Please set the id under kv_namespaces in wrangler.jsonc to that exact value.');
    process.exit(1);
  }

  if (previewPresent && !hasPreviewId) {
    console.error(`ERROR: wrangler.jsonc contains a \"preview_id\" field but it does not match "${requiredId}".`);
    console.error('Please set preview_id under kv_namespaces to the same required value, or remove the preview_id field.');
    process.exit(1);
  }

  console.log(`OK: wrangler.jsonc contains required KV namespace id ${requiredId}`);
  process.exit(0);
} catch (err) {
  console.error(`ERROR: Unable to read ${path}: ${err.message}`);
  process.exit(2);
}