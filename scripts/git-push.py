import subprocess
import os

os.chdir('/vercel/share/v0-project')

try:
    print('[v0] Adding all changes...')
    subprocess.run(['git', 'add', '-A'], check=True)
    
    print('[v0] Checking git status...')
    result = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True)
    print('[v0] Changes:', result.stdout)
    
    print('[v0] Committing changes...')
    try:
        subprocess.run(['git', 'commit', '-m', 'fix: resolve CSS and build errors - fix leading-tight class'], check=True)
    except subprocess.CalledProcessError:
        print('[v0] Nothing to commit or commit skipped')
    
    print('[v0] Getting current branch...')
    result = subprocess.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], capture_output=True, text=True, check=True)
    branch = result.stdout.strip()
    print(f'[v0] Current branch: {branch}')
    
    print('[v0] Pushing to GitHub...')
    subprocess.run(['git', 'push', 'origin', branch], check=True)
    
    print('[v0] ✅ Code pushed to GitHub successfully!')

except subprocess.CalledProcessError as e:
    print(f'[v0] Error: {e}')
    exit(1)
except Exception as e:
    print(f'[v0] Error: {e}')
    exit(1)
