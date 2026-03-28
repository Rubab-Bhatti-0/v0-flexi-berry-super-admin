import subprocess
import os
import sys

# The script is executed with full path, so we need to determine project root differently
# Look for common markers of project root: .git, package.json, app/ directory
def find_project_root():
    current = os.getcwd()
    while current != '/':
        if os.path.isdir(os.path.join(current, '.git')) or \
           os.path.isfile(os.path.join(current, 'package.json')) or \
           os.path.isdir(os.path.join(current, 'app')):
            return current
        current = os.path.dirname(current)
    return None

project_root = find_project_root()
print(f'[v0] Found project root: {project_root}')
print(f'[v0] Current working directory: {os.getcwd()}')

if not project_root:
    # Try hardcoded path
    if os.path.isdir('/vercel/share/v0-project'):
        project_root = '/vercel/share/v0-project'
    else:
        print('[v0] Error: Could not find project root')
        sys.exit(1)

os.chdir(project_root)
print(f'[v0] Changed to: {os.getcwd()}')

if not os.path.isdir('.git'):
    print('[v0] Error: Not a git repository')
    sys.exit(1)

try:
    print('[v0] Adding all changes...')
    subprocess.run(['git', 'add', '-A'], check=True, capture_output=True)
    
    print('[v0] Checking git status...')
    result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True, check=True)
    if result.stdout:
        print(f'[v0] Changes found')
    
    print('[v0] Committing changes...')
    try:
        subprocess.run(['git', 'commit', '-m', 'fix: resolve CSS and build errors'], check=True, capture_output=True)
        print('[v0] Changes committed')
    except subprocess.CalledProcessError:
        print('[v0] No changes to commit')
    
    print('[v0] Getting current branch...')
    result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], capture_output=True, text=True, check=True)
    branch = result.stdout.strip()
    print(f'[v0] Pushing on branch: {branch}')
    
    print('[v0] Pushing to GitHub...')
    result = subprocess.run(['git', 'push', 'origin', branch], capture_output=True, text=True)
    
    if result.returncode == 0:
        print('[v0] ✅ Code pushed to GitHub successfully!')
    else:
        print(f'[v0] Push completed with status: {result.returncode}')
        if result.stdout:
            print(f'[v0] Output: {result.stdout}')

except subprocess.CalledProcessError as e:
    print(f'[v0] Error: {e}')
    exit(1)
except Exception as e:
    print(f'[v0] Error: {str(e)}')
    exit(1)
