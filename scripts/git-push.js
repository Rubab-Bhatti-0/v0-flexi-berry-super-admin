import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

try {
  console.log('[v0] Configuring git...');
  execSync('git config user.email "v0@vercel.com"', { cwd: projectRoot, stdio: 'pipe' });
  execSync('git config user.name "v0 Bot"', { cwd: projectRoot, stdio: 'pipe' });

  console.log('[v0] Adding changes...');
  execSync('git add .', { cwd: projectRoot });

  console.log('[v0] Committing changes...');
  try {
    execSync('git commit -m "fix: resolve CSS and build errors - fix leading-tight class and complete component structure"', { cwd: projectRoot });
  } catch (e) {
    console.log('[v0] Nothing to commit or commit failed - continuing');
  }

  console.log('[v0] Pushing to GitHub...');
  execSync('git push origin HEAD:v0/rubabbhatti310504-6504-40469324', { cwd: projectRoot, stdio: 'inherit' });

  console.log('[v0] ✅ Code pushed to GitHub successfully');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
