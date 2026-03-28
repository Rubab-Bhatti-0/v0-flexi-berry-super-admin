import { execSync } from 'child_process';
import process from 'process';

const projectRoot = '/vercel/share/v0-project';

try {
  console.log('[v0] Project root:', projectRoot);
  
  // Add all changes
  console.log('[v0] Adding all changes...');
  execSync('git add -A', { cwd: projectRoot, stdio: 'inherit' });

  // Check if there are changes to commit
  console.log('[v0] Checking for changes...');
  try {
    const status = execSync('git status --porcelain', { cwd: projectRoot, encoding: 'utf-8' });
    console.log('[v0] Changes:', status);
  } catch (e) {
    console.log('[v0] Could not get status');
  }

  // Commit changes
  console.log('[v0] Committing changes...');
  try {
    execSync('git commit -m "fix: resolve CSS and build errors - fix leading-tight class and complete component structure"', { cwd: projectRoot, stdio: 'inherit' });
  } catch (e) {
    console.log('[v0] Commit message:', e.message);
  }

  // Get current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectRoot, encoding: 'utf-8' }).trim();
  console.log('[v0] Current branch:', branch);

  // Push to GitHub
  console.log('[v0] Pushing to GitHub...');
  execSync(`git push origin ${branch}`, { cwd: projectRoot, stdio: 'inherit' });

  console.log('[v0] ✅ Code pushed to GitHub successfully!');
  process.exit(0);
} catch (error) {
  console.error('[v0] Error:', error.message);
  if (error.stdout) console.error('[v0] Stdout:', error.stdout.toString());
  if (error.stderr) console.error('[v0] Stderr:', error.stderr.toString());
  process.exit(1);
}
